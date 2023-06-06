//COMPONENTE USUARIO: elementos del usuario (imagen), librería MUI
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
//Contenedor flexible
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//HOOKS para acceder a estado, obtener token y navegar por la app
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  //Estilos MUI
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  //Solicitud GET  para obtener datos del usuario y almacenarlos en su estado en la data
  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  // para llamar a GetUser cuando se monta el componente
  //Si el estado es null, no se renderiza hasta obtener los datos del usuario
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }
  //Si se obtienen los datos del usuario, renderizamos su perfil con todos sus elementos
  const {
    firstName,
    lastName,
    location,
    preferences,
    viewedProfile,
    impressions,
    friends,
  } = user;
  //Devolvemos la info del usuario (ubicación, preferencias, perfil visto, impresiones y redes sociales)
  return (
    <WidgetWrapper>
      {/* Datos usuario */}
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight='500'
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Voluntarios</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* Ubicación*/}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{preferences}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Perfil visto, impresiones*/}
      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={medium}>Han visto tu perfil</Typography>
          <Typography color={main} fontWeight='500'>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impresiones de posts</Typography>
          <Typography color={main} fontWeight='500'>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Redes sociales*/}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
          Redes Sociales
        </Typography>

        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={medium}>Redes sociales</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Linkedin
              </Typography>
              <Typography color={medium}>Relaciones</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;

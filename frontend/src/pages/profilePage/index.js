//COMPONENTE PERFIL USUARIO
import { Box, useMediaQuery } from "@mui/material";
//HOOKS
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//Componentes de otras páginas
import Navbar from "pages/navbar";
import FriendListWidget from "pages/widgets/FriendListWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";
//Componente profile
//HOOKS: para manejar cambios de estado de variable User (useState), obtener parámetros URL (useParams), realizar consulta de datos (useSelector) y diseño responsive(useMediaQuery)
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //Solicitud GET para obtener datos del usuario con un ID
  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data); //guardamos los datos del usuario en data
  };
  //Hook para llamar a la función getUser cuando el componente se monta (array vacío)
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //para evitar renderizar la página antes de que se carguen los datos
  if (!user) return null;
  //devuelve un contenedor flexible con ajuste de tamaño a las diferentes pantallas (librería MUI)
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

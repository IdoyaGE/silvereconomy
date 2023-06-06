import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form";
//Componente página inicio sesión
//Utiliza el componente BOX de la librería MUI para estructurar y posicional los elementos de la página
//HOOK useMediaQuery: para móvil
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //muestra el formulario de inicio sesión
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography fontWeight='bold' fontSize='32px' color='primary'>
          Konecta
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: "1.5rem" }}>
          Bienvenid@ a Konecta, queda con gente de tu ciudad
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;

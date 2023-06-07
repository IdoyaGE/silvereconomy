//Componente: anuncio de ofertas personalizadas

import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//Librería MUI para los estilos
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  //DEvuelve la estructura de un anuncio con imagen
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Recompensas
        </Typography>
        <Typography color={medium}>Este es tu premio:</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advert'
        src='http://localhost:3000/assets/info4.jpeg'
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Ortopedia Bilbao</Typography>
        <Typography color={medium}>https://www.ortopediabilbao.com/</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Un descuento del 25% para un artículo que te haga la vida más fácil.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;

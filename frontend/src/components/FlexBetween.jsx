import { Box } from "@mui/material";
import { styled } from "@mui/system";
//Componente FlewBetween de la librería MUI
//contenedor flexible con elementos espaciados y centrados
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;

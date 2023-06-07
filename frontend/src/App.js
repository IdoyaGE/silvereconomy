//Importamos los enrutamientos
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
//Importamos los componentes
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
//Importamos las funciones
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
//Componente principal
function App() {
  //HOOKS para obtener valor mode para la apariencia, para crear objeto theme, para obtener el valor token
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  //Devolvemos las páginas principales de la web
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route
              path='/home'
              element={isAuth ? <HomePage /> : <Navigate to='/' />}
            />
            <Route
              path='/profile/:userId'
              element={isAuth ? <ProfilePage /> : <Navigate to='/' />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

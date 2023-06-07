import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/RegisterPage/register";
import Login from "../pages/loginPage/login";
import App from "../App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default Router;

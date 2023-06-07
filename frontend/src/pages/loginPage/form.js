//Formulario de React que permite a los usuarios registrarse o iniciar sesión en una aplicación.
//Utiliza la librería MUI para el estilo del formulario
//La librería yuk, para definir y validar los esquemas de los formularios, se utiliza junto a la librería formik
//La librería React-dropzone, para subir los archivos de fotos del usuario
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

//Definimos dos esquemas de validación utilizando la biblioteca yup:
//Uno para el registro (registerSchema) y otro para el inicio de sesión (loginSchema)
const registerSchema = yup.object().shape({
  firstName: yup.string().required("*Obligatorio"),
  lastName: yup.string().required("*Obligatorio"),
  email: yup.string().email("*Email incorrecto").required("*Obligatorio"),
  password: yup.string().required("*Obligatorio"),
  location: yup.string().required("*Obligatorio"),
  age: yup
    .number()
    .typeError("*Debe ser un número")
    .required("*Obligatorio")
    .max(999),
  sex: yup.string().required("*Obligatorio"),
  phoneNumber: yup
    .string()
    .required("*Obligatorio")
    .matches(/^\d{9}$/, "*Debe tener 9 dígitos"),
  picture: yup.string(),
});
/*const registerSchema = yup.object().shape({
  firstName: yup.string().required("*Obligatorio"),
  lastName: yup.string().required("*Obligatorio"),
  email: yup.string().email("*Email incorrecto").required("*Obligatorio"),
  password: yup.string().required("*Obligatorio"),
  location: yup.string().required("*Obligatorio"),
  age: yup.number().required("*Obligatorio"),
  sex: yup.number().required("*Obligatorio"),
  phoneNumber: yup.number().required("*Obligatorio"),
  picture: yup.string(),
});
 */
const loginSchema = yup.object().shape({
  email: yup.string().email("*Email incorrecto").required("*Obligatorio"),
  password: yup.string().required("*Obligatorio"),
});
//Definimos los valores iniciales del formulario para el registro
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  age: "",
  sex: "",
  phoneNumber: "",
  role: "",
  picture: "",
};

/* const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  age: "",
  sex: "",
  phoneNumber: "",
  role: "",
  picture: "",
}; */
//Definimos los valores iniciales del formulario para el login una vez registrado

const initialValuesLogin = {
  email: "",
  password: "",
};
//Componente formulario (Formik): para cambios de estado y acciones del formulario
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // para enviar el formulario con una imagen
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    //Se guarda en formato JSON
    const savedUserResponse = await fetch(
      "http://localhost:3000/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    //Si el registro se ha hecho correctamente, te lleva a la página de login
    if (savedUser) {
      setPageType("login");
    }
  };
  //Petición POST con los props introducidos y convierte en un string con formato JSON
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    //Reseteamos el formulario y actualizamos el estado de la app con los datos del usuario registrado para llevarlo a la HOME
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  //Envío del form si es login o register
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  //Renderizado del form (Librería Formik)
  //Box flexible, textfiel para valores, dropzone para subir imagen y button submit
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label='Nombre'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label='Apellido'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label='Localidad'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label='Edad'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.preferences}
                  name='age'
                  error={
                    Boolean(touched.preferences) && Boolean(errors.preferences)
                  }
                  helperText={touched.preferences && errors.preferences}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label='Sexo'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.preferences}
                  name='sex'
                  error={
                    Boolean(touched.preferences) && Boolean(errors.preferences)
                  }
                  helperText={touched.preferences && errors.preferences}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label='Teléfono'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.preferences}
                  name='phoneNumber'
                  error={
                    Boolean(touched.preferences) && Boolean(errors.preferences)
                  }
                  helperText={touched.preferences && errors.preferences}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn='span 4'
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius='5px'
                  p='1rem'
                >
                  <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>
                            Si quieres puedes añadir una foto o una imagen, pero
                            no es obligatorio:
                          </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label='Password'
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "No tienes cuenta?  Regístrate"
                : "Ya tienes cuenta?  Entrar"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;

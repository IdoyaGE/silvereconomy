import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [requestError, setRequestError] = useState("");
  const navigate = useNavigate();

  const getData = async (email, password) => {
    try {
      const response = await Axios.post("http://localhost:3002", {
        email,
        password,
      });
      setRequestError("");
      goTo("/login");
    } catch (error) {
      if (error.response) {
        setRequestError(error.response.data);
      }
    }
  };

  useEffect(() => {
    /* getData(); */
  }, []);

  const submit = (e) => {
    let error = false;
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!confirmPassword(password)) {
      error = true;
      setErrorPassword(
        "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
      );
    }
    if (!confirmEmail(email)) {
      error = true;
      setErrorEmail("Por favor, introduce un correo electrónico válido");
    }
    if (error) return;
    getData(email, password);
  };

  const confirmPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const confirmEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="login-container">
        <h1>Registrate</h1>
        <form action="" onSubmit={submit} className="form">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="surname">Apellido</label>
          <input type="text" name="surname" id="surname" />
          <label htmlFor="email">Email {errorEmail}</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password {errorPassword}</label>
          <input type="password" name="password" id="password" />
          <label htmlFor="Location">Localidad</label>
          <input type="text" name="location" id="location" />
          <label htmlFor="phone">Telefono</label>
          <input type="tel" name="phone" id="phone" />
          <label htmlFor="Sex">Sexo</label>
          <select name="sexo">
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
          <label htmlFor="edad">Edad</label>
          <input type="number" name="edad" id="edad" />
          <button type="submit">Registrarse</button>
        </form>
        <p>{requestError}</p>
        <a href="http://localhost:3011/api/auth/google">
          Registrarse con Google
        </a>
      </div>
    </div>
  );
};

export default Register;

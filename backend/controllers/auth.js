import bcrypt from "bcrypt"; //hashing y encriptación de contraseñas
import jwt from "jsonwebtoken"; //para generar y verificar tokens de autenticación
import User from "../models/User.js";

//Registro de usuarios: estructura de registro de usuarios

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      pisturePath,
      friends,
      location,
      preferences,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Crea un nuevo usuario con sus datos de registro
    const newUser = newUser({
      firstName,
      lastName,
      email,
      password: passwordHash,
      pisturePath,
      friends,
      location,
      preferences,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    //Guarda los datos del nuevo usuario
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Función asíncrona de inicio de sesión (login)
//Busca en base de datos con el mail proporcionado, si no encuentra ninguno manda mensaje de que no existe y si la contraseña es incorrecta da error de contraseña
//Si la contraseña es correcta, genera un token de autentificación
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "El usuario no existe" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña no válida" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500), json({ error: err.message });
  }
};

export default { register, login };

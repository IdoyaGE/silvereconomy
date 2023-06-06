import jwt from "jsonwebtoken";

//Función asíncrona de verificación de token
//Si es undefined o null devuelve una respuesta 403 de acceso denegado
//Si es correcta la verificación, se guarda los datos del usuario y se pasa al siguinete middleware
//Slice elimina los 7 primeros caracteres y trim los espacios en blanco
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Acceso denegado");
    }
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyToken;

const { pool } = require("../db");

exports.login = async (req, res) => {
  // Recoger params body
  const { nombre, contraseña } = req.body;

  if (!nombre || !contraseña) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar"
    });
  }

  // Buscar en la BD si existe el usuario
  const [row] = await pool.query(
    "SELECT * FROM Usuario WHERE nombre = ?",
    [nombre]
  );

  if (row.length <= 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Comprobar contraseña (sin encriptación)
  if (contraseña !== row[0].contraseña) {
    return res.status(400).send({
      status: "error",
      message: "Las credenciales no coinciden"
    });
  }

  // Devuelve los datos del usuario (sin token)
  return res.status(200).send({
    status: "success",
    message: "Login exitoso",
    user: {
      name: row[0].nombre,
      id_usuario: row[0].id_usuario
    }
  });
};

import usuarioModel from "../models/usuarioModel.js";

const registroUsuario = async (req,res)=>{
    try{
       const {user_name,user_email,user_password} = req.body

       if(!user_name || !user_email || !user_password){    //Valida que se llenaron todos los campos.
          return res.status(400).json({
        code: 400,
        message: "Se requiere todos los campos obligatorios.",
        status: false
      });
    }

    //Validar que no exista otro usuario con el mismo ID o email. 
    const existingUser = await usuarioModel.findOne({
      $or: [
       
        {user_email:user_email}
      ]
    });
    if (existingUser) {
      return res.status(409).json({
        code: 409,
        message: "El usuario ya existe con ese ID o correo",
        status: false,
      });
    }
    
        // Crear nuevo usuario
    const nuevoUser = new usuarioModel({
      user_name,
      user_email,
      user_password, 
    });
   // Guardar en BD
    const savedUser = await nuevoUser.save();

    return res.status(201).json({
      code: 201,
      message: "Usuario registrado exitosamente",
      user: savedUser,
      status: true,
    });

   } catch(error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({
      code: 500,
      message: "Error interno del servidor",
      status: false,
    });
  }
};
// login usuario
const loginUsuario = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password) {
      return res.status(400).json({
        code: 400,
        message: "Se requiere email y contraseña",
        status: false,
      });
    }

    // Buscar usuario en la base de datos
    const usuario = await usuarioModel.findOne({ user_email });

    // Si no existe o la contraseña no coincide
    if (!usuario || usuario.user_password !== user_password) {
      return res.status(401).json({
        code: 401,
        message: "Email o contraseña incorrectos",
        status: false,
      });
    }

    // Login exitoso
    return res.status(200).json({
      code: 200,
      message: "Inicio de sesión exitoso",
      user: usuario,
      status: true,
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({
      code: 500,
      message: "Error interno del servidor",
      status: false,
    });
  }
};



export default {registroUsuario,loginUsuario}
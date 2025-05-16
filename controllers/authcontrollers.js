import usuarioModel from "../models/usuarioModel";

const registroUsuario = async (req,res)=>{
    try{
       const {user_id,user_name,user_email,user_password} = req.body

       if(!user_id || !user_name || !user_email || !user_password){    //Valida que se llenaron todos los campos.
          return res.status(400).json({
        code: 400,
        message: "Se requiere todos los campos user_id",
        status: false
      });
    }

    //Validar que no exista otro usuario con el mismo ID o email. 
    const existingUser = await usuarioModel.findOne({
      $or: [
        {user_id:user_id},
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
      user_id,
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

export default {registroUsuario}
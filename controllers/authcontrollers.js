import usuarioModel from "../models/usuarioModel";

const postUsuario = async (req,res)=>{
    try{
       const user_id = req.body.user_id

       if(!req.body.user_id){
          return res.status(400).json({
        code: 400,
        message: "Se requiere todos los campos user_id",
        status: false
      });
    }
    const nuevoUser = new usuarioModel({
        user_name,
        user_email,
        user_password
        
    })
    }catch{

    }
}
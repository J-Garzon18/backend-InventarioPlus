import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import registroUsuario from "./routes/routesUsuario.js";

dotenv.config();

const app= express();
app.use(express.json()); // Sirve para leer el requ.body
app.use(cors()); //permite peticiones desde cualquier origen


const PORT=process.env.PORT || 3000

//Rutas: 127.0.0.1:3000/api/usuarios/registro
app.use("/api/usuarios",registroUsuario)




//conexion a mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(" Conectado a MongoDB Atlas"))
.catch((error) => console.error(" Error al conectar a MongoDB:", error));


// inicio del servidor
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});

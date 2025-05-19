import express  from "express"
import authcontrollers from "../controllers/authcontrollers.js"

const router = express.Router();
router.post("/registro",authcontrollers.registroUsuario);
router.post("/login",authcontrollers.loginUsuario);

export default router;
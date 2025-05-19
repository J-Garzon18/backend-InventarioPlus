import express  from "express"
import authcontrollers from "../controllers/authcontrollers.js"

const router = express.Router();
router.post("/",authcontrollers.registroUsuario);
router.post("/",authcontrollers.loginUsuario);

export default router;
import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";
const router = Router()
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";
router.post('/register',validateRegisterInput,register)
router.post('/login', validateLoginInput,login)
router.get('/logout', logout)

export default router
import { Router } from "express";
import { register, login, logout } from "../controllers/userController.js";

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
export default router;

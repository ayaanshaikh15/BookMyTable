import express from "express";
import { login, signup ,getUser} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me",getUser);
export default router;
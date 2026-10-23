import express from "express";
import { login, signup ,getUser,logout} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me",authMiddleware,getUser);
router.delete("/logout",authMiddleware,logout);
export default router;
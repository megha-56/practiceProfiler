import { Router } from "express";
import { editProfile, loginUser, registerUser } from "../controllers/user.controllers.js";

const router=Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/edit-profile",editProfile)



export default router;

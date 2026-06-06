import { Router } from "express";
import { editProfile, getUserProfile, loginUser, registerUser } from "../controllers/user.controllers.js";

const router=Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/edit-profile",editProfile)
router.post("/getProfile",getUserProfile)
router.post("/changePassword",changePassword)



export default router;

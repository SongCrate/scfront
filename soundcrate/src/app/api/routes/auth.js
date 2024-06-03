import express from "express";
import { login } from "@/app/api/login/route";
import { register } from "@/app/api/register/route";
import { currentUser } from "@/app/api/currentUser/route";
import { requireSignIn } from "@/app/api/middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/current-user", currentUser, requireSignIn);

module.exports = router;
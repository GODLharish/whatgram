import express from "express";

const router = express.Router();

router.get("/api/auth/signup", (req, res) => {
    res.send("Signup Endpoint");
});

router.get("/api/auth/login", (req, res) => {
    res.send("Login Endpoint");
});

router.get("/api/auth/logout", (req, res) => {
    res.send("Logout Endpoint");
});


export default router;
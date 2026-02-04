// create admin runs once and creates the admin user
// loginAdmin allows admin to login and get jwt token
// resetPassword allows admin to reset password via email link
const supabase = require("./db");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// create admin with info@okgconsult.com
const {createAdmin, loginAdmin, resetPassword} = require("./controller/user");
router.post("/create-admin", createAdmin);
// check if admin exists and login details
router.post("/login-admin", loginAdmin);
router.post("/reset-password", resetPassword);
module.exports = router;
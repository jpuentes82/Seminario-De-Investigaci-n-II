const { Router } = require("express");
const { login } = require("../controllers/logincontrollers");

const router = Router();
//login

router.post("/login", login);

module.exports = router
const express = require('express');
const registerUser = require('../Controller/RegisterUser/Register');
const CheckAuth = require('../Controller/CheckAuth/CheckAuth');

const router = express.Router()

router.post("/register",registerUser)
//login
router.post("/login",CheckAuth);

module.exports = router
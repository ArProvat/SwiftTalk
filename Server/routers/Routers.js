const express = require('express');
const registerUser = require('../Controller/RegisterUser/Register');
const CheckAuth = require('../Controller/CheckAuth/CheckAuth');
const UserDetails = require('../Controller/UserDetails/UserDetails');

const router = express.Router()

router.post("/register",registerUser)
//login
router.post("/login",CheckAuth);
//get user
router.get("/user", UserDetails);

module.exports = router
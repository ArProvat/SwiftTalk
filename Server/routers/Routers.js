const express = require('express');
const registerUser = require('../Controller/RegisterUser/Register');
const CheckAuth = require('../Controller/CheckAuth/CheckAuth');
const UserDetails = require('../Controller/UserDetails/UserDetails');
const logout = require('../Controller/Logout/Logout');
const UpdateUse = require('../Controller/UpdateUser/UpdateUser');
const router = express.Router()

router.post("/register",registerUser)
//login
router.post("/login",CheckAuth);
//get user
router.get("/user", UserDetails);
// logout
router.post("/logout",logout);
// Update user
router.put("/update",UpdateUse);

module.exports = router
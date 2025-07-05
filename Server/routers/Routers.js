import { Router } from 'express';
import registerUser from '../Controller/RegisterUser/Register.js';
import CheckAuth from '../Controller/CheckAuth/CheckAuth.js';
import UserDetails from '../Controller/UserDetails/UserDetails.js';
import logout from '../Controller/Logout/Logout.js';
import UpdateUse from '../Controller/UpdateUser/UpdateUser.js';
import SearchUser from '../Controller/SearchUser/SearchUser.js';
const router = Router()

router.post("/register",registerUser)
//login
router.post("/login",CheckAuth);
//get user
router.get("/user", UserDetails);
// logout
router.post("/logout",logout);
// Update user
router.put("/update",UpdateUse);
//search user
router.post("/search",SearchUser);

export default router
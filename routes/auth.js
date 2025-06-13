import express from "express"
import auth from "../controllers/auth.js"
import multer from "multer";
import {storage, fileFilter} from "../cloudinary/index.js";
import catchAsync from "../utils/catchAsync.js"
import passport from "passport";

const router = express.Router();

const upload = multer({storage, fileFilter})

router.route('/register')
    .get(auth.renderRegister)
    .post(upload.single('image'), catchAsync(auth.registerUser))

router.route('/login')
    .get(auth.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), auth.loginUser)

router.get('/logout', auth.logoutUser)
    
export default router
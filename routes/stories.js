import express from "express"
import stories from "../controllers/stories.js"
import catchAsync from "../utils/catchAsync.js";
import multer from "multer";
import {storage, fileFilter} from "../cloudinary/index.js";
import { isLoggedIn } from "../middleware.js";

const upload = multer({storage, fileFilter}) 

const router = express.Router();

router.route("/")
    .get(isLoggedIn, catchAsync(stories.allStories))
    .post(isLoggedIn, upload.single('image'), catchAsync(stories.saveStory))

router.route("/new")
    .get(isLoggedIn, catchAsync(stories.newStory))    

router.route("/:id")
    .get(catchAsync(stories.viewStory))
    

export default router
import express from "express"
import userProfile from "../controllers/users.js"


const router = express.Router()

router.route("/:id")
    .get(userProfile)


export default router;
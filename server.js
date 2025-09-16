import dotenv from "dotenv"
if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local"
import User from "./models/user.js"
import flash from "connect-flash"
import engine from "ejs-mate"
import {fileURLToPath} from 'url'
import { dirname, join } from "path";
import auth from "./routes/auth.js"
import { setCurrentUser, dateConverter } from "./middleware.js";
import stories from "./routes/stories.js";
import users from "./routes/users.js";
import path from "path";
import favicon from "serve-favicon"
import MongoStore from "connect-mongo";

const dbUrl = process.env.MONGODB_URI;

const app = express();

//"mongodb://localhost:27017/blog"

mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!")
})

app.set('view engine', 'ejs')
app.engine('ejs', engine)

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
    mongoUrl: dbUrl, // Your MongoDB connection string
    collectionName: 'sessions',
  }),
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(passport.session()) //allows persistent login sessions (Without this, users would need to log in again after every request.)
passport.use(new LocalStrategy(User.authenticate())) //checks credentials

passport.serializeUser(User.serializeUser()); //Converts the user into a session-storable ID.
passport.deserializeUser(User.deserializeUser()); //Converts the stored ID back into a user object.

app.use(flash())

app.use((req, res, next) => {
    res.locals.currentUser = req.user; // makes logged-in user available in views
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

app.use(setCurrentUser)
app.use(dateConverter)

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'views')))
app.use(express.static(join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(express.urlencoded({extended: true})) //Parse form data
app.use(express.json()) //parse json data

app.get("/", (req, res) => {
    res.render("home")
})

app.use('/', auth)
app.use('/stories', stories)
app.use('/users', users)

app.listen(1001, () => {
    console.log("Listening on port 1001...")
})
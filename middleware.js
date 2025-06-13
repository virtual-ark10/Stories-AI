import { storyJoiSchema } from "./JoiSchema.js";
import ExpressError from "./utils/ExpressError.js"

export const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
    }

    next();
}

export const setCurrentUser = (req, res, next) => {
    res.locals.currentUser = req.user || null;
    next()
}

export const validatePosts = (req, res, next) => {
    const {error} = storyJoiSchema.validate(req.body)

    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

export const dateConverter = (req, res, next) => {
    res.locals.formatDate = (isoDate) => {
        const date = new Date(isoDate)
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString('en-US', options)
    }
    
    next();
}



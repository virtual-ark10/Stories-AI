import User from "../models/user.js";


const roleMap = {
    "1": "admin",
    "2": "author",  
    "3": "reader"
};

export const renderRegister = (req, res) => {
    res.render('auth/register')
}

export const registerUser = async (req, res) => {
    try {
        
        const {username, email, password, role} = req.body;
        const userRole = roleMap[role] || "reader"
        const avatar = req.file ? { url: req.file.path, filename: req.file.filename } : null;
        const user = new User({username, email, role: userRole, avatar})
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to Stories, ${user.username}`)
            res.redirect('/stories')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')

    }

}

export const renderLogin = (req, res) => {
    res.render('auth/login')
}

export const loginUser = (req, res) => {
    const currentUser = req.user;
    req.flash('success', `Welcome Back, ${currentUser.username}`)
    const redirectUrl = req.session.returnTo || '/stories';
    res.redirect(redirectUrl)
}

export const logoutUser = (req, res) => {
    req.logout(function(err) {
        if(err) {
            return next(err)
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/login')
    })
}

export default {renderRegister, registerUser, renderLogin, loginUser, logoutUser};
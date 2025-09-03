import User from "../models/user.js"
import Story from "../models/story.js"


export const userProfile = async(req, res) => {
    const user = await User.findById(req.params.id);

    const isProfileOwner = req.user && req.user._id.equals(user._id);

    let stories;

    if(isProfileOwner) {
        //Show all stories: public + private
        stories = await Story.find({ user: user._id}).populate('user')

    } else {
        //Show only public stories
        stories = await Story.find({user: user._id, visibility: 'public'}).populate('user')
    }

    res.render('user/profile', {user, stories, isProfileOwner})
}

export default userProfile;
import Story from "../models/story.js";
import User from "../models/user.js"
import aiResponse from "../ai/response.js";
import formatCompletion from "../public/formatCompletion.js";
import formatTitle from "../public/formatTitle.js";

const toneMap = {
    "1": "Romantic",
    "2": "Hopeful", 
    "3": "Nostalgic",
    "4": "Reflective"
}

export const newStory = async (req, res) => {
    res.render("stories/new")
}


export const saveStory = async(req, res) => {
    const story = new Story(req.body.stories)
    console.log(story.visibility);

    
    story.tone = toneMap[story.tone] || "Nostalgic"
    story.image = req.file ? { url: req.file.path, filename: req.file.filename } : null;
    story.user = req.user._id;

    const userData = {
        imageUrl: story.image,
        description: story.description,
        tone: story.tone,
    };

    const generatedResponse = await aiResponse(userData)
    console.log(generatedResponse);
    story.title = formatTitle(generatedResponse)
    console.log(story.title)
    let aiCompletion = formatCompletion(generatedResponse)
    story.userStory = aiCompletion.inputText
    console.log(aiCompletion)
    await story.save();
    req.flash('success', 'Generating Story..')
    res.redirect(`stories/${story._id}`)
    
}

export const allStories = async(req, res) => {
    const stories = await Story.find({visibility: 'public'}).populate('user')
    res.render('stories/stories', {stories})
}

export const viewStory = async (req, res) => {
    const story = await Story.findById(req.params.id).populate({
        path: 'user'
    })

    if(story.visibility === 'private' && (!req.user || !story.user.equals(req.user._id))) {
        req.flash('error', 'You do not have permission to view this private story.');
        return res.redirect('/stories')
    }

    res.render('stories/story', {story})

}

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

export default {newStory, saveStory, viewStory, allStories}
import Joi from "joi"

const storyJoiSchema = Joi.object({
    title: Joi.string().required().min(20).max(260),
    content: Joi.string().required(),
    //image: Joi.string().uri().required(),

})

export {storyJoiSchema}
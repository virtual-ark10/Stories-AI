
import dotenv from "dotenv"

dotenv.config();

import OpenAI from "openai";


const config = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1", 
    apiKey: process.env.OPENROUTER_API_KEY
})


const openai = new OpenAI(config)


const aiResponse = async (userData) => {

    try {
        const messages = [{type: "text", text:  `Write a 300-word ${userData.tone} short story about: ${userData.description} based on what's in the image. Give the story a related title beginning with "Title:" IMPORTANT: RETURN THE STORY ONLY AND ENCAPSULATE THE TITLE IN THIS FORMAT **TITLE: ** `},
            {type: "image_url", image_url: {url: userData.imageUrl.url}}
        ];
    
        console.log(userData.imageUrl.url)

        const completion = await openai.chat.completions.create({
        model: "google/gemma-3-4b-it:free",
        messages: [
          {
            role: "user",
            content: messages
          }
        ],
        
      });
    
      return JSON.stringify(completion.choices[0].message.content);

    } catch(error) {
        console.error("AI Response Error: ", error);
        throw new Error ("Failed to generate AI response")
    }
    
};

export default aiResponse

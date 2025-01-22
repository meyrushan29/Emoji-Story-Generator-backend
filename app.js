const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./config/db');
require('dotenv').config();


const app  = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();
const port = process.env.PORT || 5000; 


const storySchema = new mongoose.Schema({
    title:String,
    story:String,
    translation:String,
    likes:{type:Number , default:0}
});

const Story = mongoose.model("Story",storySchema);


const emojiDictionary = {
    "":"Happy",

}

function translateEmojiStory(emojiStory)
{
    return emojiStory
    .split("")
    .map((emoji)=>emojiDictionary[emoji]||"[unknown]")
    .join("")

}


app.get("/stories", async(req,res)=>{
    const stories = await Story.find().sort({likes:-1});
    res.send(stories)
})


app.patch("/storie/:id/likes",async(req,res)=>{
    const{id} = req.params;
    const story = await Story.findById(id)
    if(!story) return res.status(404).send({})
})


app.post("/stories",async(req,res)=>{
    const{story,title} = req.body;

    if(!story || !title) return res.status(400).send({error:"Invalid input"});

    const translation  = translateEmojiStory(story);
    const newStory = new Story ({title,Story,translation});
    await newStory.save();

    res.status(201).send(newStory);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
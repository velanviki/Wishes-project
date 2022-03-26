import PostMessage from "../modols/message.js";
import mongoose from 'mongoose';


export const getposts=async (req,res) => {
    try {
        const postmsg = await PostMessage.find();
        res.status(200).json(postmsg);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
    };


    export const createPost =async (req,res) => {
        const post = req.body;

        const newPostMessage = new PostMessage({ ...post,creator:req.userId,createdAt: new Date().toISOString()})
    
        try {
            await newPostMessage.save();
    
            res.status(201).json(newPostMessage );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }



    export const updatePost = async (req, res) => {
        const { id:_id } = req.params;
        // const { title, message, creator, selectedFile, tags } = req.body;
        const post = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with id");
    
        // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    
        const updatedPost =await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    
        res.json(updatedPost);
    } 



    export const deletePost = async (req, res) => {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    
        await PostMessage.findByIdAndRemove(id);
    
        res.json({ message: "Post deleted successfully." });
    }

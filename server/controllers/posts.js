import express from 'express';
import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose';
import Users from '../models/Users.js';

export const createuser = async (req, res) => {
        
    
    const users = new Users({ 
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
       })
    
    try {
       
        // localStorage.setItem("name",users._id.toString());
      
        await users.save();
        
        res.status(201).json(users);
       
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
    export const createPost = async (req, res) => {
        
    
        const newPostMessage = new PostMessage({ 
            name : req.body.name,
            email : req.body.email,
            message: req.body.message,
            description : req.body.description })
    
        try {
            await newPostMessage.save();
    
            res.status(201).json(newPostMessage );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }
    export const getPosts = async (req, res) => { 
        try {
            const postMessages = await PostMessage.find();
                    
            res.status(200).json(postMessages);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    export const getuserbyid = async (req, res) => { 
        try {
            const { id } = req.params;
            const userdata = await Users.findById(id);
         
            res.status(200).json(userdata);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    
    export const updatePost = async (req, res) => {
        const { id } = req.params;
        const { name,description,email,message } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
        const updatedPost = { name,description,email,message, _id: id };
    
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
        res.json(updatedPost);
    }
    export const deletePost = (req, res)=>{
        const id = req.params.id;
    
        PostMessage.findByIdAndDelete(id)
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
                }else{
                    res.send({
                        message : "User was deleted successfully!"
                    })
                }
            })
            .catch(err =>{
                res.status(500).send({
                    message: "Could not delete User with id=" + id
                });
            });
    }
    export const likePost = async (req, res) => {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
     
        const post = await PostMessage.findById(id);
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { like: post.like + 1 }, { new: true });
        
        res.json(updatedPost);
    }
    
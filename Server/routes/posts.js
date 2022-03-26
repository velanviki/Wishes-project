import express from 'express';

import {getposts,createPost,updatePost,deletePost} from '../controls/posts.js'

import auth from '../middleware/auth.js'
const router = express.Router();

router.get("/", getposts);
router.post("/", auth,createPost);
router.patch("/:id",auth,updatePost);
router.delete("/:id",auth,deletePost);

export default router;
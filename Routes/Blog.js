import express from 'express';
const Router = express.Router();
// import Blog from './models/Blog.js'
import {
    GetBlogs,
    GetBlogId,
    AddBlog,
    PostBlogPostAdd,
    PutEditBlogId,
    DeleteDelBlogId,
    EditBlogId
} from '../controllers/Blog.js'



Router.get('/Blog',GetBlogs)
Router.get('/Blog/:id',GetBlogId)
Router.get('/AddBlog',AddBlog)
Router.get('/EditBlog/:id',EditBlogId)
Router.post('/BlogPostAdd',PostBlogPostAdd)
Router.put('/EditBlog/:id',PutEditBlogId)
Router.delete('/DelBlog/:id',DeleteDelBlogId)



export default Router
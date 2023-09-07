import mongoose from "mongoose";

const BlogSchame = new mongoose.Schema({

    title:{
        type: String,
    },
    description:{
        type: String,
    },
},{timestamps:true})

const Blog = mongoose.models.Blog || mongoose.model("Blogs", BlogSchame);

export default Blog
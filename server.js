import express from "express";
import path from "path";
import mongoose from "mongoose";
import Blog from './models/Blog.js'

const app = express();

app.use(express.json());


// set view engine
app.set('view engine' , 'ejs');
app.use(express.static(path.resolve('./public')))


// connect mongoose
const connect = async () =>{
    try {
        await mongoose.connect('mongodb://localhost/blog')
        console.log(' db is connect ')
    } catch (error) {
        console.log (error)
    }

}



// router
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/Blog',async(req,res)=>{
    try {
    const getBlogs = await Blog.find();
    res.status(200).json(getBlogs) 
    } catch (error) {
    res.status(404).json(error)
    }

})

app.post('/BlogPostAdd', async (req,res)=>{
    const {title, description }= req.body;

    console.log('title : ',title , " description : ", description)

    const newBlog = new Blog ({

        title : title,
        description : description
    })
    
    console.log(newBlog)

    try {
        const saveBlog = await newBlog.save()

       res.status(200).json(saveBlog)  
    } catch (error) {
        res.status(404).json(error)
    }


   
})


app.listen(3000,()=>{
    connect();
    console.log('3000')
})


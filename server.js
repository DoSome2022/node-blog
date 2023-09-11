import express from "express";
import path from "path";
import mongoose from "mongoose";
import Blog from './models/Blog.js'
import methodOverride from 'method-override';
import User from "./models/User.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// set view engine
app.set('view engine' , 'ejs');
app.use(express.static(path.resolve('./public')));
app.use(methodOverride('_method'));


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

app.post('/register', async(req,res)=>{
    const { email , password } = req.body;

    console.log(req.body)

try {
    const newUser = new  User(req.body)

    const saveUser = await newUser.save()

    res.status(200).json(saveUser);

} catch (error) {
    res.status(404).json(error)
}

})


app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login',async(req,res)=>{
    const {email , password} = req.body;
    console.log(req.body)
try {
    const user = await User.findOne({email :req.body.email})
    !user && res.status(404).json("email not found!!");

    const ipw = await User.findOne({password : req.body.password})
    !ipw && res.status(404).json("wrong password")

    res.status(200).json(user.email)

    
} catch (error) {
    res.status(404).json(error)
}



})


app.get('/Blog',async(req,res)=>{
    // try {
    // const getBlogs = await Blog.find();
    // res.status(200).json(getBlogs) 
    // } catch (error) {
    // res.status(404).json(error)
    // }
    const getposts = await Blog.find();

    res.render('blog' , {Posts: getposts})

})


app.get('/Blog/:id', async (req,res)=>{
    const getonepost = await Blog.findById(req.params.id)
    res.render('Ablog',{Ablog:getonepost})
})


app.get('/AddBlog',(req,res)=>{
    res.render('addblog')
})

app.get('/EditBlog/:id',async(req,res)=>{
const getonepost = await Blog.findById(req.params.id)
    res.render('editblog',{Ablog:getonepost})
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

   // res.status(200).json(saveBlog)  
    res.redirect('/Blog')
    } catch (error) {
        res.status(404).json(error)
    }
   
})

app.put('/EditBlog/:id', async (req,res)=>{
    try {
    const getonepost = await Blog.findById(req.params.id);
    const updatedblog = await Blog.findByIdAndUpdate(req.params.id,{
        $set:req.body,
    },{new:true})

    //res.status(200).json(updatedblog)
    res.redirect(`/Blog/${getonepost._id}`)


    } catch (error) {
        res.status(404).json(error)
    }

})

app.delete('/DelBlog/:id',async(req,res)=>{
    try {
        await Blog.findByIdAndDelete(req.params.id)
       // res.status(200).json('del !!')
       res.redirect('/Blog')
    } catch (error) {
        res.status(404).json(error)
    }
})


app.listen(3000,()=>{
    connect();
    console.log('3000')
})


import express from "express";
import path from "path";
import mongoose from "mongoose";


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

app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.post('/BlogPostAdd',(req,res)=>{
    const {title, description }= req.body;
    

    console.log('title : ',title , " description : ", description)

    res.status(200).json({title ,  description})
})


app.listen(3000,()=>{
    connect();
    console.log('3000')
})


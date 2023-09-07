import express from "express";
import path from "path";
const app = express();

// set view engine
app.set('view engine' , 'ejs');
app.use(express.static(path.resolve('./public')))



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


app.listen(3000,()=>{
    console.log('3000')
})


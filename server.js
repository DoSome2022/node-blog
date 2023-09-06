import express from "express";
const app = express();

// set view engine
app.set('view engine' , 'ejs');


// router
app.get('/',(req,res)=>{
    res.send('home')
})

app.get('/about',(req,res)=>{
    res.send('about')
})

app.get('/register',(req,res)=>{
    res.send('register')
})

app.get('/login', (req,res)=>{
    res.send('login')
})

app.get('/blog',(req,res)=>{
    res.send('blog')
})


app.listen(3000,()=>{
    console.log('3000')
})


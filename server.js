import express from "express";
import path from "path";
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import connect from './config/db.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

// set view engine
app.set('view engine' , 'ejs');
app.use(express.static(path.resolve('./public')));
app.use(methodOverride('_method'));


 app.get('*', async (req,res,next)=>{
    res.locals.user = req.cookies.access_token

    next()
 })

 app.get('*',(req,res)=>{
    res.render('404')
 })

// router
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

import BlogRoutes from './Routes/Blog.js'; 
import UserRoutes from './Routes/User.js';

app.use('/blog',BlogRoutes);
app.use('/user',UserRoutes)

app.listen(3000,()=>{
    connect();
    console.log('3000')
})


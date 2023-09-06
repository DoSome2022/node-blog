import express from "express";
const app = express();


app.get('/',(req,res)=>{
    res.send('is work')
})


app.listen(3000,()=>{
    console.log('3000')
})


import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const  GetRegister = (req,res)=>{
    res.render('register')
}

export const GetLogin = (req,res)=>{
    res.render('login')
}

export const GetLogout = (req,res) =>{
    res.clearCookie('Bearer')
    res.clearCookie('csrftoken')
    res.clearCookie('access_token')
    res.redirect('/')
}

export const PostRegister = async (req,res) =>{
    const { email , password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)
    console.log(req.body)

try {
    const newUser = new  User({
        email : email,

        password : hash

    })

    const saveUser = await newUser.save()

    // res.status(200).json(saveUser);

    res.redirect('/user/login')

} catch (error) {
    res.status(404).json(error)
}
}

export const PostLogin = async (req,res) =>{
    const {email , password} = req.body;
    // console.log(req.body)
try {
    const user = await User.findOne({email :req.body.email})
    !user && res.status(404).json("email not found!!");

    // const ipw = await User.findOne({password : req.body.password})
    const ipw = bcrypt.compareSync(req.body.password , user.password)
    !ipw && res.status(404).json("wrong password")

    // res.status(200).json(user.email)

    const token = jwt.sign({
        id: user._id , 
        email: user.email
    },"1234")
    const {password , ...others} = user._doc;
    console.log(others)

    res.cookie("access_token ",token,{httpOnly: true})

   // console.log(`cookies:${req.cookies.access_token}`)
    res.redirect('/')
    
} catch (error) {
    res.status(404).json(error)
}

}

export const GetCurrent = (req,res) =>{
    User.find({}, (err, result) => {
        res.status(200).json({ data: result });
      });
}
import express from 'express';
const Router = express.Router();
import {
    GetLogin,
    GetLogout,
    GetRegister,
    PostLogin,
    PostRegister

} from "../controllers/User.js"

Router.get('/register',GetRegister)

Router.post('/register', PostRegister)

Router.get('/login',GetLogin)

Router.post('/login',PostLogin)

Router.get('/logout',(GetLogout))



export default Router
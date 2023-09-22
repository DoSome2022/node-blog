import express from 'express';
const Router = express.Router();
import {
    GetLogin,
    GetLogout,
    GetRegister,
    PostLogin,
    PostRegister,
    GetCurrent

} from "../controllers/User.js";


import  Jwt  from 'jsonwebtoken';

import { verifyToken } from '../verifyToken.js';


Router.get('/register',GetRegister)

Router.post('/register', PostRegister)

Router.get('/login',GetLogin)

Router.post('/login',PostLogin)

Router.get('/logout',GetLogout)

Router.get('/current',verifyToken,GetCurrent)



export default Router
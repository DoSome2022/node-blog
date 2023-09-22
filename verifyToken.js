import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) return res.json('not authenticated!')

    jwt.verify(token, "1234", (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
      });

}
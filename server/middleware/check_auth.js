const jwt = require("jsonwebtoken");

function CheckAuth(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);return
        const decodedToken = jwt.verify(token,'secret');
        req.userData = decodedToken;
        next();
    }
    catch(e){
        return res.status(401).json({
            'messege':"Invalide Token",
            "error" : e
        })
    }
}

module.exports={
    CheckAuth: CheckAuth
}
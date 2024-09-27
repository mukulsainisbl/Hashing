var jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    //Verify token
    //check expiry
    //if all okay then say next
    //or else return as unauthorized
    let token = req.headers.authorization.split(" ")[1]
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded)
    if(decoded){
        req.body.userId = decoded.userId
        next()
    }else{
        res.json({msg: "Please login again"})
    }


}

module.exports = authMiddleware 
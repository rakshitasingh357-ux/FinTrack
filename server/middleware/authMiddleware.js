const jwt = require("jsonwebtoken");


function protect(req, res, next) {

  try {

    const authorization = req.headers.authorization;


    if (!authorization) {

      return res.status(401).json({
        message: "Access denied. No token provided."
      });

    }


    const token = authorization.split(" ")[1];


    if (!token) {

      return res.status(401).json({
        message: "Invalid token."
      });

    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    req.userId = decoded.id;


    next();


  } catch (error) {

    return res.status(401).json({
      message: "Authentication failed."
    });

  }

}


module.exports = protect;
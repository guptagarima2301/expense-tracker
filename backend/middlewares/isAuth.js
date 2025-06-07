// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res, next) => {

//   const headerObj = req.headers;
//   const token = headerObj?.authorization?.split(" ")[1];
  
//   const verifyToken = jwt.verify(token, "masynctechKey", (err, decoded) => {
//     if (err) {
//       return false;
//     } else {
//       return decoded;
//     }
//   });
//   if (verifyToken) {
  
//     req.user = verifyToken.id;
//     next();
//   } else {
//     const err = new Error("Token expired, login again");
//     next(err);
//   }
// };

// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  if (!token) {
    const err = new Error("No token provided, login again");
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, "masynctechKey");
    req.user = decoded.id;
    next();
  } catch (error) {
    const err = new Error("Token expired, login again");
    return next(err);
  }
};

 module.exports = isAuthenticated;

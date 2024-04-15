const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request headers has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  //Extract the jwt token form request headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unaunthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ Error: "Invalid tokens" });
  }
};

//Function to generate JWT tokens

const generateToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: "300s" });
};

module.exports = { jwtAuthMiddleware, generateToken };

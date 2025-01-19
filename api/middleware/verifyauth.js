import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(token, "verify function : token");

    if (!token) { 
      return res.status(403).json({
        message: "Token is required",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
    console.log(decoded.id, "verify function decoded ");
    req.userId = decoded.id
    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token");
  }
};

export default verifyToken;

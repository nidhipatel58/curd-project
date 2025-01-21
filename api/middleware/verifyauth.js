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

    console.log("verify function : starting of verify");
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
    req.userId = decoded.userId;
    next();
    console.log("verify function : completed of verify");
  } catch (err) {
    res.status(401).send("Invalid or expired token");
  }
};

export default verifyToken;

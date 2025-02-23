import jwt from "jsonwebtoken";

const createToken = (data) => {
  console.log("jwt", data);
  const token = jwt.sign(data, process.env.JWT_SECRET || "Master", {
    expiresIn: "1d",
  });
  return token;
};

export default createToken;

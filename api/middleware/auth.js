import jwt from "jsonwebtoken";

const createToken = (data) => {
  console.log("jwt", data);
  const token = jwt.sign(data, process.env.JWT_SECERT || "Master@8110##", {
    expiresIn: "1h",
  });
  return token;
};

export default createToken;

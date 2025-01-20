import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../server.js";
import sequelize from "../../config/db.js";
import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";
import usersQueries from "../../queries/users.querie.js";
import jwt from "jsonwebtoken";
import verifyToken from "../../middleware/verifyauth.js";
import createToken from "../../middleware/auth.js";
import http from "http";

const { expect } = chai;
chai.use(chaiHttp);

// GetUser BY Id:-
// describe("Get User By ID", () => {
//   it("Get User By Id :)", async () => {
//     try {
//       const tokenUserData = {
//         id: 7,
//         username: "laxmi",
//         email: "laxmi@gmail.com",
//         password: "Laxmi@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//       });

//       const getUserData = {
//         id: 7,
//       };

//       const path = `/api/user/getuser/${getUserData.id}`;
//       console.log("path:", path);

//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "GET",
//         headers: {
//           authorization: createdToken, 
//         },
//       };

//           const req = http.request(options, (res) => {
//             let data = "";

//             res.on("data", (chunk) => {
//               data += chunk;
//             });

//             res.on("end", () => {
//               console.log("Response Status:", res.statusCode);

//               const parsedData = JSON.parse(data);
//               console.log("Response Body:", parsedData);

//               expect(res.statusCode).to.equal(200);
//             });
//           });

//           req.on("error", (error) => {
//             console.error("Request error:", error.message);
//             throw error;
//           });
//           req.end();
//     } catch (tokenError) {
//       console.error(
//         "Token verification failed immediately after generation:",
//         tokenError.message
//       );
//       throw tokenError;
//     }
//   });
// });

// describe("GetAll Users", () => {
//   it("GetAll Users :)", async () => {
//     const options = {
//       hostname: "localhost",
//       port: 3001,
//       path: "/api/user/usersall",
//       method: "GET",
//     };

//     const req = http.request(options, (res) => {
//       let data = "";

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         console.log("Response Status:", res.statusCode);

//         const parsedData = JSON.parse(data);
//         console.log("Response Body:", parsedData);

//         expect(res.statusCode).to.equal(200);
//       });
//     });

//     req.on("error", (error) => {
//       console.error("Request error:", error.message);
//       throw error;
//     });
//     req.end();
//   });
// });

// //Update Users:-
// describe("Update Users", () => {
//   it("Update Users :)", async () => {
//     try {
//       // USER DATA ====> NP
//       const tokenUserData = {
//         id: 11,
//         username: "uno",
//         email: "uno@gmail.com",
//         password: "Puno@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//       });

//       const req = {
//         headers: { authorization: createdToken },
//       };

//       // VERIFY TOKEN ====> NP
//       const res = {
//         status: (code) => {
//           res.statusCode = code;
//           return res;
//         },
//         json: (message) => {
//           res.message = message;
//         },
//         send: (message) => {
//           res.message = message;
//         },
//       };

//       let nextCalled = false;
//       const next = () => {
//         nextCalled = true;
//       };

//       await verifyToken(req, res, next);

//       const updateUserData = {
//         id: 11,
//         username: "Puno",
//         email: "Puno@gmail.com",
//         password: "Puno@123",
//       };

//       const [users] = await sequelize.query(
//         `UPDATE users SET username = :username, email = :email, password = :password WHERE id = :id`,
//         {
//           replacements: {
//             id: updateUserData.id,
//             username: updateUserData.username,
//             email: updateUserData.email,
//             password: hashedPassword,
//           },
//           type: sequelize.QueryTypes.UPDATE,
//         }
//       );
//       console.log(`${users}, Update Users successfully`);
//     } catch (tokenError) {
//       console.error(
//         "Token verification failed immediately after generation:",
//         tokenError.message
//       );
//       throw tokenError;
//     }
//   });
// });

// // Delete Users:-
// describe("Delete Users", () => {
//   it("Delete Users :)", async () => {
//     try {
//       //  User Data:-
//       const tokenUserData = {
//         id: 11,
//         username: "Puno",
//         email: "Puno@gmail.com",
//         password: "Puno@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);
//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//       });

//       const req = {
//         headers: { authorization: createdToken },
//       };

//       const res = {
//         status: (code) => {
//           res.statusCode = code;
//           return res;
//         },
//         json: (message) => {
//           res.message = message;
//         },
//         send: (message) => {
//           res.message = message;
//         },
//       };

//       let nextCalled = false;
//       const next = () => {
//         nextCalled = true;
//       };

//       await verifyToken(req, res, next);

//       const deleteData = {
//         id: 11,
//       };

//       let user = await sequelize.query(`DELETE FROM users WHERE  id = :id`, {
//         replacements: {
//           id: deleteData.id,
//         },
//         type: sequelize.QueryTypes.DELETE,
//       });
//       console.log("Deleted user successfully", user);
//     } catch (err) {
//       console.log("Unauthorized user", err.message);
//       throw err;
//     }
//   });
// });

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
//       // USER DATA =====>
//       const tokenUserData = {
//         id: 1,
//         username: "umi",
//         email: "umi@gmail",
//         password: "Pumi@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//         password: hashedPassword,
//       });

//       const reqs = {
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

//       await verifyToken(reqs, res, next);

//       const updateUserData = {
//         id: 1,
//         username: "umii",
//         email: "umi@gmail.com",
//         password: "Pumi@123",
//       };

//       const path = `/api/user/updateuser/${updateUserData.id}`;
//       console.log("path:", path);

//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: createdToken,
//         },
//       };

//       const reqst = http.request(options, (res) => {
//         let data = "";

//         res.on("data", (chunks) => {
//           data += chunks;
//         });

//         res.on("end", () => {
//           console.log("Response Status:", res.statusCode);
//           const parsedData = JSON.parse(data);
//           console.log("Response Body:", parsedData);
//           expect(res.statusCode).to.equal(200);
//         });
//       });

//       reqst.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       reqst.write(JSON.stringify(updateUserData));
//       reqst.end();

//       console.log(`Update Users successfully`);
//     } catch (tokenError) {
//       console.error(
//         "Token verification failed immediately after generation!!",
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
//         id: 5,
//         username: "krisha..",
//         email: "krisha@gmail.com",
//         password: "Krisha@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);
//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//         password: hashedPassword,
//       });

//       const reqs = {
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

//       await verifyToken(reqs, res, next);

//       const deleteData = {
//         id: 5,
//       };

//       const path = `/api/user/deleteuser/${deleteData.id}`;
//       console.log("path:", path);

//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "DELETE",
//         headers: {
//           authorization: createdToken,
//         },
//       };

//       const req = http.request(options, (res) => {
//         let data = "";

//         res.on("data", (chunk) => {
//           data += chunk;
//         });

//         res.on("end", () => {
//           console.log("Response Status:", res.statusCode);

//           const parsedData = JSON.parse(data);
//           console.log("Response Body:", parsedData);

//           expect(res.statusCode).to.equal(200);
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       req.end();

//       //   let user = await sequelize.query(`DELETE FROM users WHERE  id = :id`, {
//       //     replacements: {
//       //       id: deleteData.id,
//       //     },
//       //     type: sequelize.QueryTypes.DELETE,
//       //   });

//       console.log("Deleted user successfully", user);
//     } catch (err) {
//       console.log("Unauthorized user", err.message);
//       throw err;
//     }
//   });
// });

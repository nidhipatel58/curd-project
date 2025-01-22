import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../server.js";
import sequelize from "../../config/db.js";
import bcrypt from "bcryptjs";
import usersQueries from "../../queries/users.querie.js";
import createToken from "../../middleware/auth.js";
import http from "http";

const { expect } = chai;
chai.use(chaiHttp);

// // Login User:-
// describe("Login API Test", () => {
//   it("Should login with valid info", async () => {
//     const UserData = {
//       id: "28",
//       username: "rani",
//       email: "rani@gmail.com",
//       password: "Prani@123",
//     };

//     let createdToken = createToken({
//       id: UserData.id,
//       email: UserData.email,
//       username: UserData.username,
//     });

//     try {
//       const path = "/api/user/login";
//       console.log("path:", path);
//       let data = JSON.stringify(UserData);
//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "POST",
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
//       req.write(data);
//       req.end();

//       console.log("User Login Successfully :)");
//     } catch (err) {
//       console.log("Login Auth Failed=========", err.message);
//     }
//   });
// });

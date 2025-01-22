// import chaiHttp from "chai-http";
// import app from "../../../server.js";
// import sequelize from "../../config/db.js";
// import bcrypt from "bcryptjs";
// import usersQueries from "../../queries/users.querie.js";
// import createToken from "../../middleware/auth.js";
// import http from "http";

// const { expect } = chai;
// chai.use(chaiHttp);


// let userData = {
//   username: "praful",
//   email: "praful@gmail.com",
//   password: "Praful@123",
// };

// // Signup:-
// describe("Signup API: ", () => {
//   it("Should signup correctly", async () => { 

//     try {
//       const hashedPassword = await bcrypt.hash(userData.password, 10);
//       userData.password = hashedPassword;

//       let path = `/api/user/signup`;
//       console.log(path, "path");

//       let data = JSON.stringify(userData);
//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
//         },
//       };

//       let req = http.request(options, (res) => {
//         let data = "";
//         res.on("data", (chunks) => {
//           data += chunks;
//         });
//         res.on("end", () => {
//           console.log("Response Status:", res.statusCode);
//           const parsedData = JSON.parse(data);
//           console.log("Response Body:", parsedData);
//           expect(res.statusCode).to.equal(201);
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       req.write(data);
//       req.end();

//       console.log("Signup successfully");
//     } catch (err) {
//       console.log("Signup Failed============!!", err.message);
//     }
//   });
// });



// // Login User:-
// describe("Login API Test", () => {
//   it("Should login with valid info", async () => {
//     let createdToken = createToken({
//       id: userData.id,
//       email: userData.email,
//       username: userData.username,
//     });

//     try {
//       const path = "/api/user/login";
//       console.log("path:", path);

//       let data = JSON.stringify(userData);

//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "POST",
//         headers: {
//           authorization: createdToken,
//         },
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
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
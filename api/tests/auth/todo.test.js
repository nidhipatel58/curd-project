// import * as chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../../../server.js";
// import bcrypt from "bcryptjs";
// import sequelize from "../../config/db.js";
// import { describe } from "mocha";
// import TodoModel from "../../models/todo.js";
// import createToken from "../../middleware/auth.js";
// import http from "http";
// import { title } from "process";

// chai.use(chaiHttp);
// const { expect } = chai;

// // Create Todo:-
// describe("Create Todo: ", () => {
//   it("Should create a todo correctly", () => {
//     try {
//       let registerData = {
//         title: "Break the Routine",
//         description: "Change one daily habit for a fresh perspective.",
//         userId: 22,
//       };

//       const createdToken = createToken({
//         userId: registerData.userId,
//       });

//       console.log("User Token For Create Todo=============", createdToken);

//       const path = `/api/todos/create`;
//       console.log(path, "path");

//       const data = JSON.stringify(registerData);
//       const options = {
//         hostname: "localhost",
//         port: 3003,
//         path: path,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
//           Authorization: createdToken,
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
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//       });

//       req.write(data);
//       req.end();
//       console.log("Create Todo request sent successfully");
//     } catch (err) {
//       console.log("Todo creation failed", err.message);
//     }
//   });
// });

// // GetTodo By Id:-
// describe("GetTodo BY User Id", () => {
//   it("GetTodo BY User Id", () => {
//     try {
//       let GetData = {
//         // title: "Break the Routine",
//         // description: "Change one daily habit for a fresh perspective.",
//         userId: 22,
//       };

//       const createdToken = createToken({
//         userId: GetData.userId,
//         // title: GetData.title,
//         // description: GetData.description,
//       });

//       console.log("User Token For Create Todo=============", createdToken);

//       const path = `/api/todos/gettodo/${GetData.userId}`;
//       console.log(path, "path");

//       const data = JSON.stringify(GetData);
//       const options = {
//         hostname: "localhost",
//         port: 3003,
//         path: path,
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
//           Authorization: createdToken,
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
//           //   console.log("Response Data:", data);

//           // expect(res.statusCode).to.equal(201);
//           // expect(parsedData)
//           //   .to.have.property("message")
//           //   .eql("Todo created successfully");
//           // expect(parsedData).to.have.property("todo");
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//       });

//       req.write(data);
//       req.end();
//       //console.log("Create Todo request sent successfully");
//     } catch (err) {
//       console.log("Todo creation failed", err.message);
//     }
//   });
// });

// // // Update todo:-
// describe("Update Todo", () => {
//   it("Update Todo :)", async () => {
//     try {
//       let userData = {
//         userId: "22",
//         username: "native",
//         email: "native@gmail.com",
//       };

//       let createdToken = createToken({
//         userId: userData.userId,
//         username: userData.username,
//         email: userData.email,
//       });

//       let updateId = {
//         id: "3",
//       };
//       const updateTodo = {
//         title: "Okay girls Cool:)",
//       };

//       const path = `/api/todos/updatetodo/${updateId.id}`;
//       console.log("path:", path);

//       const data = JSON.stringify(updateTodo);
//       const options = {
//         hostname: "localhost",
//         port: 3003,
//         path: path,
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
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
//         });
//       });

//       reqst.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       reqst.write(data);
//       reqst.end();
//     } catch (tokenError) {
//       console.error(
//         "Token verification failed immediately after generation!!",
//         tokenError.message
//       );
//       throw tokenError;
//     }
//   });
// });

// // //Delete Todo:-
// describe("Delete Todo", () => {
//   it("Delete Todo :)", async () => {
//     try {
//       let userData = {
//         userId: "22",
//         username: "native",
//         email: "native@gmail.com",
//       };

//       let createdToken = createToken({
//         userId: userData.userId,
//         username: userData.username,
//         email: userData.email,
//       });

//       let deleteData = {
//         id: "4",
//       };

//       const path = `/api/todos/deletetodo/${deleteData.id}`;
//       console.log("path:", path);

//       const options = {
//         hostname: "localhost",
//         port: 3003,
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
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       req.end();
//     } catch (err) {
//       console.log("Unauthorized user", err.message);
//       throw err;
//     }
//   });
// });

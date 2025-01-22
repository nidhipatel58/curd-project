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

// Create Users:-
describe("Create Users", () => {
  it("Create User Succes", async () => {
    try {
      let createUser = {
        username: "yashvi",
        email: "yashvi@gmail.com",
        password: "Pyashvi@123",
      };

      const hashedPassword = await bcrypt.hash(createUser.password, 10);
      createUser.password = hashedPassword;

      let path = `/api/user/register`;
      console.log(path, "path");

      let data = JSON.stringify(createUser);
      const options = {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      };

      let req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunks) => {
          data += chunks;
        });
        res.on("end", () => {
          console.log("Response Status:", res.statusCode);
          const parsedData = JSON.parse(data);
          console.log("Response Body:", parsedData);
          expect(res.statusCode).to.equal(201);
        });
      });

      req.on("error", (error) => {
        console.error("Request error:", error.message);
        throw error;
      });
      req.write(data);
      req.end();
    } catch (err) {
      console.log("Creation of users Failed!!", err.message);
    }
  });
});

// GetUser BY Id:-
describe("Get User By ID", () => {
  it("Get User By Id :)", async () => {
    try {
      const tokenUserData = {
        id: 18,
        username: "yashvi",
        email: "yashvi@gmail.com",
        password: "Pyashvi@123",
      };

      const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

      let createdToken = createToken({
        id: tokenUserData.id,
        email: tokenUserData.email,
        username: tokenUserData.username,
      });

      const getUserData = {
        id: 18,
      };

      const path = `/api/user/getuser/${getUserData.id}`;
      console.log("path:", path);

      const options = {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "GET",
        headers: {
          authorization: createdToken,
        },
      };

      const req = http.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          console.log("Response Status:", res.statusCode);

          const parsedData = JSON.parse(data);
          console.log("Response Body:", parsedData);

          expect(res.statusCode).to.equal(200);
        });
      });

      req.on("error", (error) => {
        console.error("Request error:", error.message);
        throw error;
      });
      req.end();
    } catch (tokenError) {
      console.error(
        "Token verification failed immediately after generation:",
        tokenError.message
      );
      throw tokenError;
    }
  });
});

// // // GETAll Users:-
describe("GetAll Users", () => {
  it("GetAll Users :)", async () => {
    const options = {
      hostname: "localhost",
      port: 3001,
      path: "/api/user/usersall",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log("Response Status:", res.statusCode);

        const parsedData = JSON.parse(data);
        console.log("Response Body:", parsedData);

        expect(res.statusCode).to.equal(200);
      });
    });

    req.on("error", (error) => {
      console.error("Request error:", error.message);
      throw error;
    });
    req.end();
  });
});

// // // //Update Users:-
describe("Update Users", () => {
  it("Update Users :)", async () => {
    try {
      // USER DATA =====>
      const tokenUserData = {
        id: 18,
        username: "yashvi",
        email: "yashvi@gmail.com",
        password: "Pyashvi@123",
      };

      const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

      let createdToken = createToken({
        id: tokenUserData.id,
        email: tokenUserData.email,
        username: tokenUserData.username,
        password: hashedPassword,
      });

      const updateUser = {
        id: 18,
        username: "yashvii",
        email: "yashvi@gmail.com",
        password: hashedPassword,
      };

      const path = `/api/user/updateuser/${updateUser.id}`;
      console.log("path:", path);

      //   Pass here your json Data:-
      const data = JSON.stringify(updateUser);
      const options = {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          authorization: createdToken,
        },
      };

      const reqst = http.request(options, (res) => {
        let data = "";

        res.on("data", (chunks) => {
          data += chunks;
        });

        res.on("end", () => {
          console.log("Response Status:", res.statusCode);
          const parsedData = JSON.parse(data);
          console.log("Response Body:", parsedData);
          expect(res.statusCode).to.equal(200);
        });
      });

      reqst.on("error", (error) => {
        console.error("Request error:", error.message);
        throw error;
      });
      reqst.write(data);
      reqst.end();

      console.log(`Update Users successfully`);
    } catch (tokenError) {
      console.error(
        "Token verification failed immediately after generation!!",
        tokenError.message
      );
      throw tokenError;
    }
  });
});

// // // Delete Users:-
// describe("Delete Users", () => {
//   it("Delete Users :)", async () => {
//     try {
//       //  User Data:-
//       const tokenUserData = {
//         id: 17,
//         username: "yashvi",
//         email: "yashvi@gmail.com",
//         password: "Pyashvi@123",
//       };

//       const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);
//       let createdToken = createToken({
//         id: tokenUserData.id,
//         email: tokenUserData.email,
//         username: tokenUserData.username,
//         password: hashedPassword,
//       });

//       let deleteUser = {
//         id: 17,
//       };

//       const path = `/api/user/deleteuser/${deleteUser.id}`;
//       console.log("path:", path);

//       const data = JSON.stringify(deleteUser);
//       const options = {
//         hostname: "localhost",
//         port: 3001,
//         path: path,
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Content-Length": Buffer.byteLength(data),
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

//           expect(res.statusCode).to.equal(201);
//         });
//       });

//       req.on("error", (error) => {
//         console.error("Request error:", error.message);
//         throw error;
//       });
//       req.write(data);
//       req.end();
//       console.log("Deleted user successfully");
//     } catch (err) {
//       console.log("Unauthorized user", err.message);
//       throw err;
//     }
//   });
// });

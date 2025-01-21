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
        username: "laxmi",
        email: "laxmi@gmail.com",
        password: "Plaxmi@123",
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
        id: 7,
        username: "laxmi",
        email: "laxmi@gmail.com",
        password: "Laxmi@123",
      };

      const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

      let createdToken = createToken({
        id: tokenUserData.id,
        email: tokenUserData.email,
        username: tokenUserData.username,
      });

      const getUserData = {
        id: 7,
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

// GETAll Users:-
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

// //Update Users:-
describe("Update Users", () => {
  it("Update Users :)", async () => {
    try {
      // USER DATA =====>
      const tokenUserData = {
        id: 1,
        username: "umii",
        email: "umi@gmail",
        password: "Pumi@123",
      };

      const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

      let createdToken = createToken({
        id: tokenUserData.id,
        email: tokenUserData.email,
        username: tokenUserData.username,
        password: hashedPassword,
      });

      const updateUser = {
        id: 1,
        username: "umi..",
        email: "umi@gmail.com",
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

// // Delete Users:-
describe("Delete Users", () => {
  it("Delete Users :)", async () => {
    try {
      //  User Data:-
      const tokenUserData = {
        id: 3,
        username: "nidhi",
        email: "nidhi@gmail.com",
        password: "Pnidhi@123",
      };

      const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);
      let createdToken = createToken({
        id: tokenUserData.id,
        email: tokenUserData.email,
        username: tokenUserData.username,
        password: hashedPassword,
      });

      let deleteUser = {
        id: 3,
      };

      const path = `/api/user/deleteuser/${deleteUser.id}`;
      console.log("path:", path);

      const data = JSON.stringify(deleteUser);
      const options = {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
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
      req.write(data);
      req.end();
      console.log("Deleted user successfully");
    } catch (err) {
      console.log("Unauthorized user", err.message);
      throw err;
    }
  });
});

// Signup:-
describe("Signup API: ", () => {
  it("Should signup correctly", async () => {
    // Signup Data:-
    let data = {
      username: "laxmi",
      email: "laxmi@gmail.com",
      password: "Plaxmi@123",
    };

    console.log("Signup Data--------", data);

    try {
      const existingUser = await usersQueries.findUserByEmail(data.email);
      if (existingUser) {
        console.log("User already exists with email:", data.email);
        return;
      }

      // Hash the password:-
      const hashedPassword = await bcrypt.hash(data.password, 10);

      let outcome = await sequelize.query(
        `INSERT INTO users(email, password, username) VALUES (:email, :password, :username)`,
        {
          replacements: {
            email: data.email,
            password: hashedPassword,
            username: data.username,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      );

      console.log("Signup and Insert into Database", outcome);
      let res = await http.request
        .execute(app)
        .post("/api/user/signup")
        .send(data);
      expect(res).to.have.status(201);
      expect(res.body.username).to.equal(data.username);
      expect(res.body.password).to.equal(data.password);
      expect(res.body.email).to.equal(data.email);
      expect(res.body.message).to.equal("Signup Successfully:)");
    } catch (err) {
      console.log("Signup Failed============!!", err.message);
    }
  });
});

// Login User:-
describe("Login API Test", () => {
  it("Should login with valid info", async () => {
    const UserData = {
      id: "12",
      username: "nidhi",
      email: "nidhi@gmail.com",
      password: "Pnidhi@123",
    };

    try {
      const path = "/api/user/login";
      console.log("path:", path);

      let createdToken = createToken({
        id: UserData.id,
        email: UserData.email,
        username: UserData.username,
      });

      const options = {
        hostname: "localhost",
        port: 3001,
        path: path,
        method: "POST",
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

      console.log("User Login Successfully :)");
    } catch (err) {
      console.log("Login Auth Failed=========", err.message);
    }
  });
});

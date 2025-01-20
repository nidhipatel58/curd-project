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

// Login Testing
describe("Login API Test", () => {
  it("Should login with valid info", async () => {
    // console.log("User Data:", UserData);
    // const hashedPassword = await bcrypt.hash(UserData.password, 10);
    // // query the database :-
    // const result = await sequelize.query(
    //   `INSERT INTO users(email, password,username) VALUES (:email, :password,:username)`,
    //   {
    //     replacements: {
    //       username: UserData.username,
    //       email: UserData.email,
    //       password: hashedPassword,
    //     },
    //     type: sequelize.QueryTypes.INSERT,
    //   }
    // );
    // console.log("Select from Database:", result);

    try {
      const UserData = {
        id: "21",
        username: "native",
        email: "native@gmail.com",
        password: "Pnative@123",
      };

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

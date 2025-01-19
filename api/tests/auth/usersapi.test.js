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

const { expect } = chai;
let http = chai.use(chaiHttp);

//Demo:-
describe("Array Test", () => {
  it("should verify that the array contains a specific element", () => {
    const fruits = ["apple", "banana", "cherry"];
    const target = "banana";
    expect(fruits).to.include(target);
  });
});

// Create Users:-
describe("POST /api/user/register", () => {
  it("should create a user and insert into the database", async () => {
    const newUserData = {
      username: "hetal",
      email: "hetal@gmail.com",
      password: "Hetal@123",
    };
    console.log("Test - Creating user with data:", newUserData);

    try {
      const existingUser = await usersQueries.findUserByEmail(
        newUserData.email
      );
      if (existingUser) {
        console.log("User already exists with email:", newUserData.email);
        return;
      }

      // Hash the password:-
      const hashedPassword = await bcrypt.hash(newUserData.password, 10);

      // Insert the user into the database:-
      const user = await usersQueries.createUser({
        username: newUserData.username,
        email: newUserData.email,
        password: hashedPassword,
      });
      console.log("Insert users===========", user);

      // Send request :-
      const res = await http.request
        .execute(app)
        .post("/api/user/register")
        .send(newUserData);

      console.log("Response Status:", res.status);
      console.log("Response Body:", res.body);

      // Validate response:-
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("message", "User Created Successfully");
      expect(res.body.user).to.have.property("username", newUserData.username);
      expect(res.body.user).to.have.property("email", newUserData.email);
    } catch (err) {
      console.error("Test - Unexpected error:", err.message);
      throw err;
    }
  });
});

// GetUser BY Id:-
describe("Should GetUser by Id", () => {
  it("GetUser BY Id", async () => {
    try {
      // User data:-
      let GetData = {
        id: 11,
        username: "uno",
        email: "uno@gmail.com",
        password: "Puno@123",
      };

      //  Generate a token :-
      let GetToken = createToken({
        id: GetData.id,
        username: GetData.username,
        email: GetData.email,
      });

      console.log("Generated Token:", GetToken);

      const verifiedToken = jwt.verify(
        GetToken,
        process.env.JWT_SECERT || "DefaultSecret"
      );
      console.log("Decoded Token:", verifiedToken);

      let getData = {
        id: 11,
        username: "uno",
        email: "uno@gmail.com",
        password: "Puno@123",
      };

      // Validate token:-
      expect(verifiedToken).to.have.property("id", getData.id);
      expect(verifiedToken).to.have.property("username", getData.username);
      expect(verifiedToken).to.have.property("email", getData.email);
      console.log("Token validated successfully");
    } catch (err) {
      console.log("Unauthorized user============", err.message);
      throw err;
    }
  });
});

// GetAll Users:-
describe("GetAll Users", () => {
  it("GetAll Users :)", async () => {
    try {
      const users = await sequelize.query(
        `SELECT id, username, email FROM users`
      );

      console.log(users, "Fetch Users");
      let res = await http.request.execute(app).get("/api/user/usersall");

      console.log("Response Status:", res.status);
      console.log("Response Body:", res.body);

      expect(res.status).to.be.equal(200);
    } catch (err) {
      console.error("Unexpected error:", err.message);
      throw err;
    }
  });
});

// Update Users:-
describe("Update Users", () => {
  it("Update Users :)", async () => {
    //  User Data:-
    const tokenUserData = {
      id: 3,
      username: "Masterrr",
      email: "testusers@gmail.com",
      password: "Test@123",
    };

    // Hash the password:-
    const hashedPassword = await bcrypt.hash(tokenUserData.password, 10);

    let createdToken = createToken({
      id: tokenUserData.id,
      email: tokenUserData.email,
      username: tokenUserData.username,
    });
    try {
      const decoded = jwt.verify(createdToken, process.env.JWT_SECERT);
      console.log(decoded, "decoded");
      expect(decoded).to.have.property("id", tokenUserData.id);
      expect(decoded).to.have.property("email", tokenUserData.email);
      expect(decoded).to.have.property("username", tokenUserData.username);
      console.log("Token validation successful");

      // Update User Data:-
      const updateUserData = {
        id: 3,
        username: "Test",
        email: "testusers@gmail.com",
        password: "Test@123",
      };

      const [users] = await sequelize.query(
        `UPDATE users SET username = :username, email = :email, password = :password WHERE id = :id`,
        {
          replacements: {
            id: updateUserData.id,
            username: updateUserData.username,
            email: updateUserData.email,
            password: hashedPassword,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
      console.log(`${users}, Update Users successfully`);
    } catch (tokenError) {
      console.error(
        "Token verification failed immediately after generation:",
        tokenError.message
      );
      throw tokenError;
    }
  });
});

// Delete Users:-

describe("Delete Users", () => {
  it("Delete Users :)", async () => {
    try {
      // User Data:-
      const tokenData = {
        id: 1,
        username: "nidhu",
        email: "nidhu@gmail.com",
        password: "Nidhu@123",
      };

      // Hash the password:-
      const hashedPassword = await bcrypt.hash(tokenData.password, 10);

      // Deleted User Data:-
      let createdToken = createToken({
        id: tokenData.id,
        email: tokenData.email,
        username: tokenData.username,
      });

      const verifiedToken = jwt.verify(createdToken, process.env.JWT_SECERT);
      console.log(verifiedToken, "decoded============");

      const deleteData = {
        id: 1,
      };

      expect(verifiedToken).to.have.property("id", deleteData.id);
      console.log("Token valid successfully");

      let user = await sequelize.query(`DELETE FROM users WHERE  id = :id`, {
        replacements: {
          id: deleteData.id,
        },
        type: sequelize.QueryTypes.DELETE,
      });
      console.log("Deleted user successfully", user);
    } catch (err) {
      console.log("Unauthorized user============", err.message);
      throw err;
    }
  });
});

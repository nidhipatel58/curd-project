import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../server.js";
import bcrypt from "bcryptjs";
import usersQueries from "../../queries/users.querie.js";
import sequelize from "../../config/db.js";
const { expect } = chai;
let http = chai.use(chaiHttp);

// Login Testing
describe("Login API Test", () => {
  it("Should login with valid info", async () => {
    const UserData = {
      username: "laxmi",
      email: "native",
      password: "Pnavtive@123",
    };
    console.log("User Data:", UserData);
    const hashedPassword = await bcrypt.hash(UserData.password, 10);
    // query the database :-
    const result = await sequelize.query(
      `INSERT INTO users(email, password,username) VALUES (:email, :password,:username)`,
      {
        replacements: {
          username: UserData.username,
          email: UserData.email,
          password: hashedPassword,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    console.log("Select from Database:", result);
    try {
      // login request:-
      const res = await http.request
        .execute(app)
        .post("/api/user/login")
        .send(UserData);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("email", UserData.email);
      expect(res.body).to.have.property("token");

      console.log("User Login Successfully :)");
    } catch (err) {
      console.log("Login Auth Failed=========", err.message);
    }
  });
});

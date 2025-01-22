import chaiHttp from "chai-http";
import app from "../../../server.js";
import sequelize from "../../config/db.js";
import bcrypt from "bcryptjs";
import usersQueries from "../../queries/users.querie.js";
import createToken from "../../middleware/auth.js";
import http from "http";

const { expect } = chai;
chai.use(chaiHttp);

// Signup:-
describe("Signup API: ", () => {
  it("Should signup correctly", async () => {
    // Signup Data:-
    let signupData = {
      username: "viddhi",
      email: "viddhi@gmail.com",
      password: "Pviddhi@123",
    };

    console.log("Signup Data--------", signupData);
    try {
      // Hash the password:-
      const hashedPassword = await bcrypt.hash(signupData.password, 10);
      signupData.password = hashedPassword;

      let path = `/api/user/signup`;
      console.log(path, "path");

      let data = JSON.stringify(signupData);
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

      console.log("Signup and Insert into Database------------");
    } catch (err) {
      console.log("Signup Failed============!!", err.message);
    }
  });
});

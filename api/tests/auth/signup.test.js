import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../server.js";
import signup from "../../routes/user.route.js";
import sequelize from "../../config/db.js";
import bcrypt from "bcryptjs";
import usersQueries from "../../queries/users.querie.js";

// const { expect } = chai;
// chai.use(chaiHttp);

// // Signup Testing
// describe("Signup API: ", () => {
//   it("Should signup correctly", async () => {
//     // Signup Data:-
//     let data = {
//       username: "native",
//       email: "native@gmail.com",
//       password: "Pnative@123",
//     };

//     console.log("Signup Data--------", data);

//     try {
//       const existingUser = await usersQueries.findUserByEmail(data.email);
//       if (existingUser) {
//         console.log("User already exists with email:", data.email);
//         return;
//       }

//       // Hash the password:-
//       const hashedPassword = await bcrypt.hash(data.password, 10);

//       let outcome = await sequelize.query(
//         `INSERT INTO users(email, password, username) VALUES (:email, :password, :username)`,
//         {
//           replacements: {
//             email: data.email,
//             password: hashedPassword,
//             username: data.username,
//           },
//           type: sequelize.QueryTypes.INSERT,
//         }
//       );

//       console.log("Signup and Insert into Database", outcome);
//       let res = await http.request
//         .execute(app)
//         .post("/api/user/signup")
//         .send(data);
//       expect(res).to.have.status(201);
//       expect(res.body.username).to.equal(data.username);
//       expect(res.body.password).to.equal(data.password);
//       expect(res.body.email).to.equal(data.email);
//       expect(res.body.message).to.equal("Signup Successfully:)");
//     } catch (err) {
//       console.log("Signup Failed============!!", err.message);
//     }
//   });
// });

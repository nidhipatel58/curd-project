// import * as chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../../../server.js";
// const { expect } = chai;

// let http = chai.use(chaiHttp);

// // Signup Testing:-

// describe("Signup API: ", () => {
//   it("Should Signup correctly:)", (done) => {
//     let data = {
//       email: "test@gmail.com",
//       password: "Ptest@123",
//       username: "Test",
//     };
//     http.request
//       .execute(app)
//       .post("/api/user/signup")
//       .send(data)
//       .end((err, res) => {
//         if (err) {
//           done(err);
//         } else {
//           expect(res.status).to.be.equal(201);
//           console.log("Signup User Successfully:)");
//           done();
//         }
//       });
//   });
// });

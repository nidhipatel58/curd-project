// import * as chai from "chai";
// import chaiHttp from "chai-http";
// import app from "../../../server.js";
// const { expect } = chai;
// let http = chai.use(chaiHttp);

// // Login Testing
// describe("Login API Test", () => {
//   it("Should login with valid info:)", (done) => {
//     http.request
//       .execute(app)
//       .post("/api/user/login")
//       .send({ email: "laxmi@gmail.com", password: "Plaxmi@123" })
//       .end((err, res) => {
//         if (err) {
//           done(err);
//         } else {
//           expect(res.status).to.be.equal(200);
//           expect(res.body).to.have.property("token");
//           done();
//         }
//       });
//   });
// });

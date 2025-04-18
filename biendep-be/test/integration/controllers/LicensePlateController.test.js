var supertest = require("supertest");

// describe("LicensePlateController.create", function () {
//   describe("#create()", function () {
//     it("should return 200 OK with new license plate data", function (done) {
//       supertest(sails.hooks.http.app)
//         .post("/license-plate")
//         .send({ plateCode: "51A-123.45", price: 120000000, isVip: true })
//         .expect(200)
//         .end((err, res) => {
//           if (err) {
//             console.error("Test error:", err);
//             return done(err);
//           }

//           console.log("Response:", res.body);
//           done();
//         });
//     });

//     it("should return 200 OK with new license plate data", function (done) {
//       supertest(sails.hooks.http.app)
//         .post("/license-plate")
//         .send({ plateCode: "26A-222.23", price: 79000000 })
//         .expect(200)
//         .end((err, res) => {
//           if (err) {
//             console.error("Test error:", err);
//             return done(err);
//           }

//           console.log("Response:", res.body);
//           done();
//         });
//     });

//     it("should return 200 OK with new license plate data", function (done) {
//       supertest(sails.hooks.http.app)
//         .post("/license-plate")
//         .send({ plateCode: "68A-287.89", price: 120000000, isVip: true })
//         .expect(200)
//         .end((err, res) => {
//           if (err) {
//             console.error("Test error:", err);
//             return done(err);
//           }

//           console.log("Response:", res.body);
//           done();
//         });
//     });

//     it("should return 409 conflict", function (done) {
//       supertest(sails.hooks.http.app)
//         .post("/license-plate")
//         .send({ plateCode: "60K55225", price: 100000000 })
//         .expect(409)
//         .end((err, res) => {
//           if (err) {
//             console.error("Test error:", err);
//             return done(err);
//           }

//           console.log("Response:", res.body);
//           done();
//         });
//     });
//   });
// });

describe("LicensePlateController.get", function () {
  describe("#get()", function () {
    it("should return 200 OK with list license plate data", function (done) {
      supertest(sails.hooks.http.app)
        .get("/license-plate")
        .query({
          province: "",
          sort: "desc",
          price: 0,
          luckyDigit: null,
          char: "N",
          type: "",
          key: "68",
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error("Test error:", err);
            return done(err);
          }

          console.log("Response:", res.body);
          done();
        });
    });
  });
});

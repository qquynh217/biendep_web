var supertest = require("supertest");

describe("ProvinceController.create", function () {
  describe("#create()", function () {
    it("should return 200 OK with province array", function (done) {
      supertest(sails.hooks.http.app)
        .get("/province")
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

const jwt = require("jsonwebtoken");
const { HTTP_RESPONSE } = require("../config/const");

module.exports = async function (req, res, proceed) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(HTTP_RESPONSE.STATUS.UNAUTHORIZE).send({
      msg: "Token không hợp lệ",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(HTTP_RESPONSE.STATUS.UNAUTHORIZE).send({
        msg: "Token hết thời hạn",
      });
    }
    req.me = decoded;
    return proceed();
  } catch (err) {
    return res.status(HTTP_RESPONSE.STATUS.UNAUTHORIZE).send({
      msg: "Token không hợp lệ",
    });
  }
};

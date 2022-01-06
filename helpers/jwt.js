const jwt = require("jsonwebtoken");
const secret_key = "aaaaaaaakuutaktauuuu";

function signToken(payload) {
  return jwt.sign(payload, secret_key);
}
function verifyToken(payload) {
  return jwt.verify(payload, secret_key);
}

module.exports = { signToken, verifyToken };

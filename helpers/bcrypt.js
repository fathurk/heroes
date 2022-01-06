const bcrypt = require("bcryptjs");
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
function comparePassword(password, savedPassword) {
  return bcrypt.compareSync(password, savedPassword);
}
module.exports = { hashPassword, comparePassword };

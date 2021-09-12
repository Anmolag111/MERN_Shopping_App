const bcrypt = require("bcryptjs");
require("dotenv").config();

const encrypt = {
  salt: bcrypt.genSaltSync(10),
  doEncryption(plainPasword) {
    return bcrypt.hashSync(plainPasword, this.salt);
  },
  compareHash(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },
};

module.exports = encrypt;

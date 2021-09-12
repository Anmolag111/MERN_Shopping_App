const userModel = require("../schemas/user");
const encrypt = require("../../utils/encryption");
const crypto = require("crypto");
const { reject } = require("lodash");

const userCrud = {
  addUser(userObject) {
    userObject.password = encrypt.doEncryption(userObject.password);
    let promise = userModel.create(userObject);
    return promise;
  },
  findUser(email, password) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOne({ email }, (err, doc) => {
        if (err || !doc) {
          reject(new Error("Email not register with us!"));
        }
        if (doc && doc._id) {
          const dbPassword = doc.password;
          const isAuthenticated = encrypt.compareHash(password, dbPassword);
          if (isAuthenticated) {
            return resolve(doc);
          } else {
            return reject(new Error("Check your Password again!!"));
          }
        }
        reject(new Error("Bad Request"));
      });
    });

    return promise;
  },
  findUserById(id) {
    let promise = new Promise((resolve, reject) => {
      userModel.findById({ _id: id }).exec((err, user) => {
        if (err || !user) {
          reject(new Error("No user was found in DB"));
        }
        resolve(user);
      });
    });

    return promise;
  },
  updateUser(id, user) {
    let promise = new Promise((resolve, reject) => {
      userModel.findByIdAndUpdate(
        { _id: id },
        { $set: user },
        { new: true },
        (err, user) => {
          if (err || !user) {
            reject(new Error("No such user found!"));
          }
          resolve(user);
        }
      );
    });
    return promise;
  },
  updateProductList(userid, newPurchase) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOneAndUpdate(
        { _id: userid },
        { $push: { purchases: newPurchase } },
        { new: true },
        (err, user) => {
          if (err || !user) {
            reject(new Error("Unable to save purchase list!"));
          }
          resolve(user);
        }
      );
    });
    return promise;
  },
  checkIfUserExist(email) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOne({ email }, (err, user) => {
        if (err) {
          reject(new Error("Encountered some error! Please try again later!"));
        }
        if (!user) {
          resolve();
        }
        reject(new Error("Email already Registered!"));
      });
    });
    return promise;
  },
  generateForgotToken(email) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOne({ email }, (err, user) => {
        if (err || !user) {
          reject(new Error("This user is not Registerd with us!"));
        }
        crypto.randomBytes(48, (err, buffer) => {
          if (err) {
            reject(
              new Error(
                "Your request could not be processed. Please try again."
              )
            );
          }

          const resetToken = buffer.toString("hex");
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save((err, user) => {
            if (err) {
              reject(
                new Error(
                  "Your request could not be processed. Please try again."
                )
              );
            }

            resolve(user);
          });
        });
      });
    });
    return promise;
  },
  resetPassWithToken(password, resetPasswordToken) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOne(
        {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now() },
        },
        (err, user) => {
          if (!user || err) {
            return reject(
              new Error(
                "Your token has expired. Please attempt to reset your password again."
              )
            );
          }
          user.password = encrypt.doEncryption(password);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.save((err, user) => {
            if (err) {
              reject(
                new Error(
                  "Your request could not be processed as entered. Please try again."
                )
              );
            }
            resolve(user);
          });
        }
      );
    });
    return promise;
  },
  resetPass(email, password) {
    let promise = new Promise((resolve, reject) => {
      userModel.findOne({ email }, (err, user) => {
        if (err) {
          return reject(
            new Error("Your request could not be processed. Please try again.")
          );
        }
        if (user === null) {
          return reject(
            new Error("Your request could not be processed. Please try again.")
          );
        }

        user.password = encrypt.doEncryption(password);
        user.save((err, user) => {
          if (err) {
            return reject(
              new Error(
                "Your request could not be processed. Please try again."
              )
            );
          }
          resolve(user);
        });
      });
    });
    return promise;
  },
};

module.exports = userCrud;

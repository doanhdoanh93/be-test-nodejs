import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);
const db = require("../models");

let handleUserLogin = (email, password) => {
  return new Promise(async (rel, rej) => {
    try {
      let userData = {};
      let isUser = await checkUserEmail(email);
      if (isUser) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        console.log("user: ", user);
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `not found`;
        }
        rel(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage = "k cos email";
        rel(userData);
      }
    } catch (error) {
      rej(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (rel, rej) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        rel(true);
      } else rel(false);
    } catch (error) {
      rej(error);
    }
  });
};

let handleGetuser = (id) => {
  return new Promise(async (rel, rej) => {
    try {
      let user = "";
      if (!id) {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      } else {
        user = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      console.log("user: ", user);
      rel(user);
    } catch (error) {
      rej(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise((rel, rej) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      rel(hashPassword);
    } catch (error) {
      rej(error);
    }
  });
};

let newUser = (data) => {
  return new Promise(async (rel, rej) => {
    try {
      // validate email==> check
      let check = await checkUserEmail(data.email);
      if (check) {
        rel({
          errCode: 1,
          errMessage: "email da ton tai",
        });
      }
      let hashPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
      });
      rel({
        errCode: 0,
        errMessage: "ok",
      });
    } catch (error) {
      rej(error);
    }
  });
};

let handleDeleteUser = (userId) => {
  return new Promise(async (rel, rej) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        rel({
          errCode: 2,
          errMessage: "Khong ton tai user",
        });
      }
      // await user.destroy();
      await db.User.destroy({
        where: { id: userId },
      });
      rel({
        errCode: 0,
        errMessage: "da xoa",
      });
    } catch (error) {
      rej(error);
    }
  });
};
let handleEditUser = (data) => {
  return new Promise(async (rel, rej) => {
    try {
      if (!data.id) {
        rel({
          errCode: 2,
          errMessage: "khong co id",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      console.log("user12: ", user);
      if (user) {
        user.email = data.email;

        await user.save();

        rel({
          errCode: 0,
          errMessage: "succeesds",
        });
      } else
        rel({
          errCode: 1,
          errMessage: "fail",
        });
    } catch (error) {
      rej(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  checkUserEmail,
  handleGetuser,
  newUser,
  handleDeleteUser,
  handleEditUser,
};

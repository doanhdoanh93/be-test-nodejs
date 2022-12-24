import bcrypt from "bcrypt";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (rel, rej) => {
    try {
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
      rel("ok");
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

let getAllUser = () => {
  return new Promise(async (rel, rej) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      rel(users);
    } catch (error) {
      rej(error);
    }
  });
};

let getUserId = (userId) => {
  return new Promise(async (rel, rej) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      rel(users);
    } catch (error) {
      rej(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (rel, rej) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.email = data.email;

        await user.save();

        let allUsers = await db.User.findAll();
        rel(allUsers);
      } else rel();
    } catch (error) {
      rej(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (rel, rej) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (user){
        await user.destroy()
      }
      rel();
    } catch (error) {
      rej(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser,
  getUserId,
  updateUserData,deleteUser
};

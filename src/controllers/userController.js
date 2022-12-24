import db from "../models/index";
import crudService, { createNewUser } from "../services/crudService";
import userService from "../services/userService";

const { reset } = require("nodemon");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: " chua nhap email",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let getAllUser = async (req, res) => {
  let id = req.query.id;
  console.log("id: ", id);

  let allUsers = await userService.handleGetuser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    user: allUsers ? allUsers : {},
  });
};

let createUser = async (req, res) => {
  let message = await userService.newUser(req.body);
  return res.status(200).json(message);
};

let editUser = async (req, res) => {
  let message = await userService.handleEditUser(req.body);
  return res.status(200).json(message);
};

let deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: " Nothing",
    });
  }
  let message = await userService.handleDeleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  getAllUser,
  createUser,
  editUser,
  deleteUser,
};

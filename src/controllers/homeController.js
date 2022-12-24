import db from "../models/index";
import crudService, { createNewUser } from "../services/crudService";

const { reset } = require("nodemon");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log("data: ", data);
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let crud = (req, res) => {
  return res.render("crud.ejs");
};

let postCrud = async (req, res) => {
  let mesage = await crudService.createNewUser(req.body);
  console.log("mesage: ", mesage);
  return res.send("post crud");
};

let getCrud = async (req, res) => {
  let data = await crudService.getAllUser();
  return res.render("getCrud.ejs", {
    dataUser: data,
  });
};

let editCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await crudService.getUserId(userId);
    return res.render("editCrud.ejs", { userData: userData });
  } else return res.send("404 Not Found");
};

let putCrud = async (req, res) => {
  let data = req.body;
  let allUsers = await crudService.updateUserData(data);
  return res.render("getCrud.ejs", {
    dataUser: allUsers,
  });
};

let deleteCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await crudService.deleteUser(userId);
    return res.send("delete");
  } else return res.send("404");
};

module.exports = {
  getHomePage: getHomePage,
  crud: crud,
  getCrud: getCrud,
  postCrud: postCrud,
  editCrud,
  putCrud,
  deleteCrud,
};

import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/",homeController.getHomePage);
  router.get("/crud",homeController.crud);
  router.post("/post-crud",homeController.postCrud);
  router.get("/get-crud",homeController.getCrud);
  router.get("/edit-crud",homeController.editCrud);
  router.post("/put-crud",homeController.putCrud);
  router.get("/delete-crud",homeController.deleteCrud);

  router.post("/api/login",userController.handleLogin);
  router.get("/api/getAllUser",userController.getAllUser);
  router.post("/api/createUser",userController.createUser);
  router.put("/api/editUser",userController.editUser);
  router.delete("/api/deleteUser",userController.deleteUser);

  return app.use("/", router);
};

module.exports = initWebRouter;

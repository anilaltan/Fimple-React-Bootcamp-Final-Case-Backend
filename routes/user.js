const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user");

router.post("/users", userController.createUser);

router.post("/users/login", userController.loginUser);

router.get("/users/me", auth, userController.getLoggedInUserProfile);

router.post("/users/me/logout", auth, userController.logoutUser);

router.post(
  "/users/me/logoutall",
  auth,
  userController.logoutUserFromAllDevices
);

module.exports = router;

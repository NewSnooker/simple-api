var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const upload = require("../middleware/multerConfig");

// http://localhost:3000/users
router.get("/", userController.showAllUsers);

//http://localhost:3000/users/pagination?page=1&limit=5
router.get("/pagination", userController.getPaginationUser);

// http://localhost:3000/users/:id
router.get("/:id", userController.showById);

// http://localhost:3000/users/register
router.post("/register", upload.single("image"), userController.register);

// http://localhost:3000/users/register
router.post("/login", userController.login);

// http://localhost:3000/users/:id
router.put("/:id", upload.single("image"), userController.updateUser);

// http://localhost:3000/users/:id
router.delete("/:id", userController.deleteUser);

// http://localhost:3000/users/me
// router.get('/me', function(req, res, next) {
//   res.send('Hello World ???');
// });

// // http://localhost:3000/users/a
// router.get('/a', function(req, res, next) {
//   res.send('Hello Aon');
// });

module.exports = router;

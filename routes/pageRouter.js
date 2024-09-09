const express = require("express");
const router = express.Router();

const passport = require("../middleware/passpostJWT");
const page1 = require("../controller/page1");

router.get("/", [passport.isLogin], page1.page1);
router.get("/admin", [passport.isLogin, passport.isAdmin], page1.adminPage);

module.exports = router;

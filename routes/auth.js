const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth')
const { baseResponse } = require('../utils/response')
const validation = require('../middlewares/validator')

router.post("/signup", Auth.postSignUp, baseResponse);

router.post("/login", validation.userLogin, Auth.postLogin, baseResponse);


router.get("/signup", Auth.getUsers);


module.exports = router;
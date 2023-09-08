const express = require('express')
// import userController from '../controllers/userController';
const userCtl = require('../controllers/userController.js')
const router = express.Router();
router.get('/users', userCtl.getAllUsers);
router.get('/usersTemp', userCtl.temp);
module.exports=router;
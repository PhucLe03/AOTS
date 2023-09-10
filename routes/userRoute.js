const express = require('express')
const userCtl = require('../controllers/userController.js')
const router = express.Router()
router.get('/users', userCtl.getAllUsers)
router.get('/user/:id', userCtl.getUserById)
router.post('/user', userCtl.createUser)
router.put('/user/:id', userCtl.updateUser)
router.delete('/user/:id', userCtl.deleteUser)
module.exports= router
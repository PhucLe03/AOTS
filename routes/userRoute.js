const express = require('express')
const userCtl = require('../controllers/userController.js')
const router = express.Router()
router.get('/users', userCtl.getAllUsers)
router.get('/user/:id', userCtl.getUserById)
router.get('/user/:id/room', userCtl.getUserRoomById)
router.post('/user', userCtl.createUser)
router.put('/user/:id', userCtl.updateUser)
router.delete('/user/:id', userCtl.deleteUser)
router.get('/users/exportxl', userCtl.ExportToXL)
// router.get('/users/exportdoc', userCtl.ExportToDOCX)
module.exports= router
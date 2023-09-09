const express = require('express')
const roomCtl = require('../controllers/roomController.js')
const router = express.Router()
router.get('/rooms', roomCtl.getAllRooms)
router.get('/room/:id', roomCtl.getRoomById)
// router.post('/room', roomCtl.createRoom)
// router.put('/room/:id', roomCtl.updateRoom)
// router.delete('/room/:id', roomCtl.deleteRoom)
module.exports = router
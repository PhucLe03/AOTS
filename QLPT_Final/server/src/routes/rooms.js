const express = require("express");
const router = express.Router()
const RoomController = require('../controllers/RoomController')

router.get('/', RoomController.Index)
router.post('/store', RoomController.Store)
router.get('/show/:id', RoomController.Show)
router.put('/update/:id', RoomController.Update)
router.delete('/delete/:id', RoomController.Delete)

module.exports = router
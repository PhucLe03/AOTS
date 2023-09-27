const express = require("express");
const router = express.Router()
const ServiceController = require('../controllers/ServiceController')

router.get('/', ServiceController.Index)
router.post('/store', ServiceController.Store)
router.get('/show/:id', ServiceController.Show)
router.put('/update/:id', ServiceController.Update)
router.delete('/delete/:id', ServiceController.Delete)

module.exports = router
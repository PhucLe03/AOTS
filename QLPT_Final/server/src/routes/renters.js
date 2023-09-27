const express = require("express");
const router = express.Router()
const RenterController = require('../controllers/RenterController')

router.get('/', RenterController.Index)
router.post('/store', RenterController.Store)
router.put('/update/:id', RenterController.Update)
router.delete('/delete/:id', RenterController.Delete)
router.get('/export', RenterController.Export)

module.exports = router
const express = require("express");
const renterCtl = require("../controllers/renterController");

const router = express.Router();
router.get("/renters", renterCtl.getAllRenters);
router.get("/renter/:id", renterCtl.getRenterById);
router.post("/renter", renterCtl.createRenter);
router.put("/renter/:id", renterCtl.updateRenter);
router.delete("/renter/:id", renterCtl.deleteRenter);

module.exports = router;

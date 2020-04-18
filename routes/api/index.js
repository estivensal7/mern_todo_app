// Dependencies
const router = require("express").Router();
const itemRoutes = require("./items");

// Item routes
router.use("/items", itemRoutes);

//Exporting
module.exports = router;

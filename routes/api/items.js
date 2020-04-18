// Dependencies
const router = require("express").Router();
const itemsController = require("../../controllers/items-controller.js");

// Matches with "/api/items"
router.route("/").get(itemsController.findAll).post(itemsController.create);

// Matches with "/api/items/:id"
router
	.route("/:id")
	.get(itemsController.findById)
	.put(itemsController.update)
	.delete(itemsController.remove);

// Exporting
module.exports = router;

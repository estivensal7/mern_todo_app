import axios from "axios";

export default {
	// Gets all items
	getItems: function () {
		return axios.get("/api/items");
	},
	// Gets the item with the given id
	getItem: function (id) {
		return axios.get("/api/items/" + id);
	},
	updateItem: function (id, itemData) {
		return axios.put("/api/items/" + id, itemData);
	},
	// Deletes the item with the given id
	deleteItem: function (id) {
		return axios.delete("/api/items/" + id);
	},
	// Saves an item to the database
	saveItem: function (itemData) {
		return axios.post("/api/items", itemData);
	},
};

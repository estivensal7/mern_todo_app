// Dependencies
const mongoose = require("mongoose");
const db = require("../models");

//This file empties the Items & Users collections and inserts the items & users below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/mern_todolist",
	{ useNewUrlParser: true }
);

const itemSeed = [
	{
		note: "Buy milk",
		author: "Nicole",
		date: new Date(Date.now()),
	},
	{
		note: "Walk the dog",
		author: "Sam",
		date: new Date(Date.now()),
	},
];

db.Item.remove({})
	.then(() => db.Item.collection.insertMany(itemSeed))
	.then((data) => {
		console.log(data.result.n + " records inserted!");
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

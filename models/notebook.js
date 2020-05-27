var mongoose = require('mongoose');

//SCHEMA SETUP
var notebookSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Note"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
module.exports = mongoose.model("Notebook",notebookSchema);
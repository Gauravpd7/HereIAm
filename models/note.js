var mongoose = require('mongoose');

//SCHEMA SETUP
var noteSchema = new mongoose.Schema({
	text: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String 
	}
});

module.exports = mongoose.model("Note",noteSchema);
var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String 
	},
	firstName: String,
	lastName: String,
	picture: String,
	designation: String,
	address: String,
	email: String,
	mobileno: String,
	objective: String,
	education1: {
		startDate: String,
		endDate: String,
		uniName: String,
		courseName: String
	},
	education2: {
		startDate: String,
		endDate: String,
		uniName: String,
		courseName: String
	},
	experience1:{
		startDate: String,
		endDate: String,
		organisation: String,
		designation: String
	},
	experience2:{
		startDate: String,
		endDate: String,
		organisation: String,
		designation: String
	}	
});

module.exports = mongoose.model("Profile",profileSchema);
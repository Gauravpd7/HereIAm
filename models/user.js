var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
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
	},
	skills:{
		skill1: String,
		skill2: String,
		skill3: String,
		skill4: String,
		skill5: String,
		skill6: String,
		skill7: String,
		skill8: String,
		skill9: String
	}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//Root Route
router.get("/",(req,res)=>{
	res.render("landing");
});

//show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});
//handle signup logic
router.post("/register",(req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
    		console.log(err);
    		return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome "+user.username);
			res.redirect("/notebooks");
		});
	});
});
//login
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});
router.post("/login",passport.authenticate("local",{
	successRedirect: "/notebooks",
	failureRedirect: "/login"
}),(req,res)=>{
	
});
//logout route
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged You Out!");
	res.redirect("/login");
});

module.exports = router;
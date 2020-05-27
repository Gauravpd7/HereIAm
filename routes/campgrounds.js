var express = require('express');
var router = express.Router({mergeParams: true});
var Notebook = require('../models/notebook');
var  middleware = require('../middleware');
//INDEX - Shows all notebooks
router.get("/", middleware.isLoggedIn, function(req, res){
    // Get all notebooks from DB
    Notebook.find({}, function(err, allNotebooks){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{notebooks: allNotebooks, page: 'notebooks'});
       }
    });
});

//CREATE - Adds new campground
router.post("/",middleware.isLoggedIn,(req,res)=>{
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newNotebook = {name: name, image: image, description: description, author: author};
	Notebook.create(newNotebook,(err,notebook)=>{
		if(err){
			console.log(err);
		} else {
			console.log("New Notebook Added!");
			res.redirect("/campgrounds");
		}
	});
});

//NEW - Displays the form to add a new campground
router.get("/new",middleware.isLoggedIn,(req,res)=>{
	res.render("campgrounds/new.ejs");
});
//SHOW - Shows more info about one campground
router.get("/:id",(req,res)=>{
	Notebook.findById(req.params.id).populate("notes").exec((err,foundNotebook)=>{
		if(err || !foundNotebook){
			console.log(err);
			req.flash("error","Notebook not found");
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/show",{notebook: foundNotebook});
		}
	});
});
//EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
	Notebook.findById(req.params.id,(err,foundNotebook)=>{
		res.render("campgrounds/edit",{notebook: foundNotebook});
	});


});

//UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	Notebook.findByIdAndUpdate(req.params.id,req.body.notebook,(err,updatedNotebook)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Notebook successfully updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	Notebook.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			console.log("Notebook Deleted");
			req.flash("success","Notebook successfully removed");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
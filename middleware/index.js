var Notebook = require('../models/notebook');
var Note = require('../models/note');
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	//is the user logged in?
	  //if yes then is the campground owned by the same use
	     // if it is the same user then open the edit form
		 // otherwise redirect here also
	//if not then redirect to login page
	if(req.isAuthenticated()){
		Notebook.findById(req.params.id,(err,foundNotebook)=>{
		if(err || !foundNotebook){
			console.log(err);
			req.flash("error","Notebook not found")
			res.redirect("back");
		}else{
			if(foundNotebook.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","You don't have permission to do that!");
				res.redirect("back");
			}
		}
	});
	}else{
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Note.findById(req.params.note_id,(err,foundNote)=>{
			if(err || !foundNote){
				console.log(err);
				req.flash("error","Note not found");
				res.redirect("back");
			}else {
				if(foundNote.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that!");
	res.redirect("/login");
}


module.exports = middlewareObj;
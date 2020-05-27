var express = require('express');
var router = express.Router({mergeParams: true});
var Notebook = require('../models/notebook');
var Note = require('../models/note');
var middleware = require('../middleware');

//Notes New
router.get("/new",middleware.isLoggedIn,(req,res)=>{
	Notebook.findById(req.params.id,(err,foundNotebook)=>{
		if(err){
			console.log(err);
		}else{
			res.render("notes/new",{notebook: foundNotebook});	
		}
	});
});
//Notes Create
router.post("/",middleware.isLoggedIn,(req,res)=>{
	Notebook.findById(req.params.id,(err,foundNotebook)=>{
		if(err){
			console.log(err);
			res.redirect("/notebooks");
		}else{
			Note.create(req.body.note,(err,note)=>{
				if(err){
					console.log(err);
					req.flash("error","Something went wrong");
				}else{
					//add username and id to the comment
					note.author.id = req.user._id;
					note.author.username = req.user.username;
					note.save();
					foundNotebook.notes.push(note);
					foundNotebook.save();
					req.flash("success","Successfully added a note");	 
					res.redirect("/notebooks/"+foundNotebook._id);
				}
			});
		}
	});
});
//Notes Edit Route
router.get("/:note_id/edit",middleware.checkCommentOwnership,(req,res)=>{
	
	Notebook.findById(req.params.id,(err,foundNotebook)=>{
		if(err || !foundNotebook){
			req.flash("error","Notebook not found");
			return res.redirect("back");
		}
		Note.findById(req.params.note_id,(err,foundNote)=>{
			if(err){
				res.redirect("back");	
			}else{	
				res.render("notes/edit",{notebook: foundNotebook,note: foundNote});	
			}		
		});		
	});
});
//Notes Update
router.put("/:note_id",middleware.checkCommentOwnership,(req,res)=>{
	Note.findByIdAndUpdate(req.params.note_id,req.body.note,(err,updatedNote)=>{
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/notebooks/"+req.params.id);
		}
	});
});
//Notes Destroy Route
router.delete("/:note_id",middleware.checkCommentOwnership,(req,res)=>{
	Note.findByIdAndRemove(req.params.note_id,(err)=>{
		if(err){
			res.redirect("back");
		}else{
			console.log("Note Deleted");
			req.flash("success","Note successfully deleted");
			res.redirect("/notebooks/"+req.params.id);
		}
	})
});

module.exports = router;
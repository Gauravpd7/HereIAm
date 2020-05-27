var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
    Notebook     = require('./models/notebook'),
    Note        = require('./models/note'),
	User    	   = require('./models/user'),
	flash	       = require('connect-flash'),
	methodOverride = require('method-override')


//Requiring Routes
var noteRoutes    = require('./routes/notes'),
	notebookRoutes = require('./routes/notebooks'),
	indexRoutes      = require('./routes/index')

mongoose.connect("mongodb+srv://gauravpd7:Bloodsucker@c1@cluster0-qim5j.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true,useFindAndModify: false, useUnifiedTopology: true});
//Bloodsucker@c1
//mongodb+srv://gauravpd7:<password>@cluster0-qim5j.mongodb.net/test?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//========================
//Passport Configuration
//========================
app.use(require('express-session')({
	secret: "The yelp camp super secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use("/notebooks/:id/notes",noteRoutes);
app.use("/notebooks",notebookRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT || 3000,function(){
	console.log("Server has been started!");
});
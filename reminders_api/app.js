var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ '/public'));
app.use(express.static(__dirname + '/views')); //telling our express app to use this directory to look for views to serve

app.get('/',(req,res)=>{
	res.sendFile("index.html");
});

app.use('/api/todos',todoRoutes);



app.listen(3000||process.env.PORT,function(){
	console.log("Server Started");
});

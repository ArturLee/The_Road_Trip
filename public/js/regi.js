var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.static('public'));

app.get('/register.html', function(req,res){
	res.sendFile( __dirname + "/" + "register.html");
})


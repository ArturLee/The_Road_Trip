var express = require('express');
var app = express();

//app.use(express.static('sendnudes'));

app.get('/login.html', function(req,res){
	res.sendFile( __dirname + "/" + "login.html");
})

app.get('/process_get', function(req,res){

	response = {
		first_name:req.query.first_name,
		last_name:req.query.last_name,
		email:req.query.email
	};
	console.log(response);
	res.end(JSON.stringify(response));
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s",host, port)
})

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

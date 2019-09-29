var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var session  = require('express-session');

var connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'123',
  database:'TRT'
});

var nome =[];
//register
router.post('/sublime' , function(req,res,done){
	//req.check('email','Invalide email address').isEmail();
	//req.check('password','Password is invalid').isLength({min:4}).equals(req.body.confirmPass);
	var name=req.body.name;
	var username=req.body.username;
	var email=req.body.email;
	var password=bcrypt.hashSync(req.body.password);
	connection.query("Select * from users where username = ?",[username], function(err,rows){
		if(err)
			return done(err);
		if (rows.length){
			//return done(null, false, req.flash("messages", { "error" : "username taken" }));
        	//res.locals.messages = req.flash();
        	console.log("username already taken");
			res.redirect('/home');
		}else { connection.query("Select * from users where email = ?",[email], function(err,rows){
		if(err)
			return done(err);
		if (rows.length){
			//return done(null, false, req.flash("messages", { "error" : "email taken" }));
        	//res.locals.messages = req.flash();
        	console.log("email already taken");
			res.redirect('/home');
		}else {
			var sql = "insert into TRT.users(name,username,email,password) values ?"; 
	var values = [[ name, username, email, password]];
	connection.query(sql, [values], function(err, rows, fields){});
	console.log('name = '+ name + '</br> Username = '+ username + '</br> email = '+ email +'</br> Passcode = '+ password + '</br>');
	res.redirect('/');
		}
	});
};
});
});

//login
router.post('/login',function(req,res){
	var sess = req.session;
	var email=req.body.email;
	var password=req.body.password;
	var sql = "select * from TRT.users Where email = ?";
	var values = [[email]];
	connection.query(sql,[values], function(err,rows,fields){
		if(err){
				console.log('connection error');
		}
		else
		{
			if (rows.length) {
			if (bcrypt.compareSync(password, rows[0].password)) {
					console.log('logged in');
					nome.push({
								name: rows[0].name,
								username: rows[0].username,
								email: rows[0].email,
								picture: rows[0].picture});
					res.redirect('/');
					//user.push(rows[0].name = name);
					 //got pushed !!!!!!
			}
			else 
			{
					console.log('something wrong');
					res.render('/home');
			}
		}
	}
});
});
//=========================================NEWS POST =======================
router.post('/post',function(req,res,done){
	var title = req.body.title;
	var link = req.body.link;
	var sql = "insert into TRT.News_Post(title,link) values ?";
	var values = [[title, link]];
	connection.query(sql, [values], function(err,rows,fields){
		if (err) {
			console.log('err');
		}else{
		console.log('hey');}
	});
	var sql = 'SELECT * FROM TRT.News_Post;';
	news = new Array;
  	connection.query(sql,function(err,rows,fields){
    if(err){
        console.log('connection error');
    }
    else
    {
      if (rows.length) {
        for (i=0; i<rows.length; i++){
        info = {
          title : rows[i].title,
          link:rows[i].link
        }
        news.push(info);
        }
        for (j=0; j<news.length; j++){
        console.log(news[j].title);
        }
      }
    }
  });
	res.redirect('/news');
});
//router.get('/profile', isLoggedIn, function(req, res){
//	res.render('profile'{
//		user: req.user
//	});
//});
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/home');
});

exports.nome = nome;

module.exports = router;

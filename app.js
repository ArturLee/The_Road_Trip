var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var expressValidator = require('express-validator');
var session  = require('express-session');

var app = express();

var store = new session.MemoryStore();
var cookie = cookieParser('shh');


//==========================================DATABASE=========================================
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'1234',
  database:'TRT'
});

getUser = function(users,sessid) {
  for (var i = 0; i < nome.length; i++) {
      if(nome[i].sid == sessid) {
        return nome[i];
      }
  }
  return false;
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');

//body parser middleweare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

//static folder
app.use(express.static(path.join(__dirname, 'resources')));

app.use(session({
    secret: 'shh',
    name: 'sessID',
    resave: false,
  saveUninitialized: true,
    cookie: { secure: false },
    store: store
}));

/* GET home page. */
app.get('/', function(req, res, next) {
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('HomePage',{name:nome[0].name});
  }
  }else{
    layout = 'main';
    res.render('HomePage');
  }
  console.log(nome);
});
app.get('/home', function(req, res, next) {
    var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('HomePage',{name:nome[0].name});
  }
  }else{
    res.render('HomePage');
  }
});
//concept
app.get('/concept', function(req,res){
 var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('concept',{name:nome[0].name});
  }
  }else{
    res.render('concept');
  }
});
//forum
app.get('/forum', function(req,res){
   var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('forum',{name:nome[0].name});
  }
  }else{
    res.render('forum');
  }
});
app.get('/forum', function(req,res){
   var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('forum',{name:nome[0].name});
  }
  }else{
    res.render('forum');
  }
});
app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});
//===========================================news===============================
var player = [];
connection.query('select * from TRT.users;',function(err,rows,fields){
if (err){ 
  console.log('connection error player');
}else{
  if(rows.length){
    for(i=0; i<rows.length; i++){
      records = { place:i+1,
                  name: rows[i].name,
                  score: rows[i].Score,
                  distance: rows[i].Distance,
                  money: rows[i].Money,
                  vehicles: rows[i].Vehicles};
                  player.push(records);
    }
  }
  for (j=0; j<player.length; j++){
        console.log(player[j].name);
      }
}
});
var news = [];
//var sql = 'SELECT * FROM TRT.News_Post';
  connection.query('SELECT * FROM TRT.News_Post;',function(err,rows,fields){
    if(err){
        console.log('connection error1');
    }
    else
    {
      if (rows.length) {
        for (i=0; i<rows.length; i++){
        info = {
          id:rows[i].idNews_Post,
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
app.get('/news', function(req,res,next){
   var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('News',{news, name:nome[0].name});
  }
  }else{
    res.render('News',{news});
  }
});
//news poste
app.get('/newspost',function(req,res){
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('New_Post',{name:nome[0].name});
  } 
  }else{
    res.render('News',{news});
  }
});
app.get('/profile',function(req,res){
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('profile',{name:nome[0].name,
                        place:nome[0].score,
                        distance:nome[0].distance,
                        money:nome[0].money,
                        vehicles:nome[0].vehicles,
                        player});
  }
  }else{
    res.render('/');
  }
});


//==========================================other stuffs=========================================
//news page
app.get('/First_News',function(req,res){
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('./newspost/First_News',{name:nome[0].name});
  }
  }else{
    res.render('./newspost/First_News');
  }
});
app.get('/Welcome',function(req,res){
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('./newspost/Welcome',{name:nome[0].name});
  }
  }else{
    res.render('./newspost/Welcome');
  }
});
app.get('/First_event',function(req,res){
  var sess = req.session;
  var user = getUser(nome,sess.id);
  if (user){
    req.app.locals.layout = 'logged';
    for (i=0; i<nome.length; i++){
    res.render('./newspost/Firste_event',{name:nome[0].name});
  }
  }else{
    res.render('./newspost/Firste_event');
  }
});

//======================================================user js =======================================================
var nome=[];
app.post('/sublime' , function(req,res,done){
  var sess = req.session;
req.checkBody('username', 'Username field cannot be empty.').notEmpty();
req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
req.checkBody('password', 'Password must be between 8-100 characters long.').len(4, 100);
//req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(4, 100);
req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
 var errors = req.validationErrors();
  if (errors){
    res.render('HomePage',{errors:errors});
  }else{

  var name=req.body.name;
  var username=req.body.username;
  var email=req.body.email;
  var password=bcrypt.hashSync(req.body.password);
  connection.query("Select * from users where username = ?",[username], function(err,rows){
    if(err)
      return done(err);
    if (rows.length){
          console.log("username already taken");
          req.checkBody('username', 'Username already taken').len(1000, 1001);
     var errors = req.validationErrors();
     if(errors){
      res.render('HomePage',{errors:errors});
     }
    }else { connection.query("Select * from users where email = ?",[email], function(err,rows){
    if(err)
      return done(err);
    if (rows.length){
          console.log("email already taken");
      req.checkBody('email', 'E-mail already taken').len(1000, 1001);
     var errors = req.validationErrors();
     if(errors){
      res.render('HomePage',{errors:errors});
     }
    }else {
      var sql = "insert into TRT.users(name,username,email,password,Score,Distance,Money,Vehicles) values ?"; 
      var values = [[ name, username, email, password,0,0,0,'Mini']];
      connection.query(sql, [values], function(err, rows, fields){});
      var sql2 = "select * from TRT.users Where email = ?";
      connection.query(sql2,[email], function(err,rows,fields){
      if (rows.length) {
          console.log('logged in');
          nome.push({sid: sess.id,
                name: rows[0].name,
                username: rows[0].username,
                email: rows[0].email,
                score: rows[0].Score,
                distance: rows[0].Distance,
                money: rows[0].Money,
                vehicles: rows[0].Vehicles
                });
      }});
      //console.log('name = '+ name + '</br> Username = '+ username + '</br> email = '+ email +'</br> Passcode = '+ password + '</br>');
       res.redirect('/');
    }
  });
};
});}
});

//login
app.post('/login',function(req,res){
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
          nome.push({sid: sess.id,
                name: rows[0].name,
                username: rows[0].username,
                email: rows[0].email,
                score: rows[0].Score,
                distance: rows[0].Distance,
                money: rows[0].Money,
                vehicles: rows[0].Vehicles
                });
          res.redirect('/');
      }
      else 
      {
           res.render('HomePage', {donttouch:'error'});
      }
    }
    else{
      res.render('HomePage', {donttouch:'error'});
    }
  }
});
});
//=========================================NEWS POST =======================
app.post('/post',function(req,res,done){
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
//  res.render('profile'{
//    user: req.user
//  });
//});
app.get('/logout', function(req, res, user){
  var sess = req.session;
  sess.destroy();
  nome.length = 0;
  req.app.locals.layout = 'main';
  res.redirect('/');
});

app.post('/search',function(req,res){
  console.log('at least try');
  news.length=0;
  console.log(req.body.look);
  connection.query('Select News_Post.title from TRT.News_Post where News_post.title like "%'+req.body.look+'%";',function(err,rows,fields){
    if(err){
      console.log('Error Search');
    }else{
      if (rows.length){
      
      for (i=0; i<rows.length; i++){
        noticias = {title: rows[i].title,
          link: rows[i].link}
          news.push(noticias);
        console.log(rows[i].title);
      }
      }
      console.log(news);
    }
  });
  res.render('news',{news});
});
app.get('/delete', function(req, res, user){
  var sess = req.session;
  var sql = "DELETE FROM TRT.users WHERE users.email = ?";
var values = [[nome[0].email]];
  connection.query(sql,[values],function(err, rows, fields){
  });
  req.app.locals.layout = 'main';
  nome.length = 0;
  sess.destroy();
  res.redirect('/');
});

app.post('/change-password', function(req, res, user){
  req.checkBody('newpass', 'Password must be between 8-100 characters long.').len(4, 100);
  //req.checkBody("newpass", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('newpassmatch', 'Password must be between 8-100 characters long.').len(4, 100);
  req.checkBody('newpassmatch', 'Passwords do not match, please try again.').equals(req.body.newpass);
 var errors = req.validationErrors();
  if (errors){
    res.render('HomePage',{errors:errors});
    console.log(errors);
  }else{
  var sess = req.session;
  var newpass=bcrypt.hashSync(req.body.newpass);
  var email = [[nome[0].email]];
  var sql = "UPDATE TRT.users SET users.password = ? where users.email = ?";
  connection.query(sql,[newpass,email], function(err, rows, fields){
    console.log('connected');
      });
  req.app.locals.layout = 'main';
  nome.length = 0;
  sess.destroy();
  res.redirect('/');
  }
});
//=====================================View Pages =======================================
//custom 404 page 
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
  });
//constum 500 page
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
  });

//=====================================End View Pages =======================================
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
	console.log('Server port http://localhost:'+ app.get('port')+';press Ctrl-C to terminate');
});

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'1234',
  database:'TRT'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
//  if(sess.views){
//    res(layout = 'logged');
//  }else{
//    res(layout = 'main');}
  res.render('HomePage',{name:'artur'});
});
router.get('/home', function(req, res, next) {
  res.render('HomePage');
});
//concept
router.get('/concept', function(req,res){
  res.render('concept');
});
//forum
router.get('/forum', function(req,res){
  res.render('forum');
});
//Login
router.get('/login', function(req,res){
  res.render('login');
});
//register
router.get('/register', function(req,res){
  res.render('register');
});
//===========================================news===============================
function news(id,title,content,link){
  this.id = id;
  this.title = title;
  this.content = content;
  this.link = link;
}
var news= [];
var sql = 'SELECT * FROM TRT.News_Post';
  connection.query(sql,function(err,rows,fields){
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
router.get('/news', function(req,res,next){
  res.render('News',{news});
});
//news poste
router.get('/newspost',function(req,res){
  res.render('New_Post');
});
//news page
router.get('/First_News',function(req,res){
  res.render('First_News');
});

//==========================================other stuffs=========================================

router.get('/register', function(req,res){
  res.render('register');
});

module.exports = router;

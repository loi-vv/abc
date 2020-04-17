var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter  = require('./routes/car');
var session = require('express-session')
var hbs = require('hbs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var app = express();

var userModel = require('./models/user');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
//Nhập mô-đun mongoose
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost/demo';
mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true});
var db = mongoose.connection;
//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',function(){
})

app.get('/setcookie', function(req, res){
  // setting cookies
  res.cookie('username', 'loi', { maxAge: 900000, httpOnly: true });
  return res.send('Cookie has been set');
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/user',(req,res)=>{
  var token = jwt.verify(req.headers.token,"loi");
  console.log(token);
})

app.get('/home',(req,res,next)=>{
  if(req.session.isLogin){
    res.json("home")
  }else{
    res.json('ban chua dang nhap')
  }
},(req,res,next)=>{

})

app.get('/login',(req,res)=>{
  res.render('login');
})

app.post('/login',(req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;

  userModel.findOne({username:username,password:password}).lean().exec().then((data)=>{
    delete data.password
    if(data){
      var token = jwt.sign(data,"loi",{expiresIn: 60*60})
      res.json({
        code: 200,
        message: "dang nhap thanh cong",
        token : token
      })
      console.log(token);
    }else{
      req.session.isLogin = false;
      res.status(500).json('Sai tai khoan')
    }
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose= require('mongoose');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//PASSPORT CONFIG
require('./config/passport')(passport);

// DB CONFIG
const keys = require('./config/keys');



// mongoose.connect(keys, {
//         useNewUrlParser: true
//     })
//     .then(() => console.log("Mongo db is been connected"))
//     .catch(err => console.log("Error with mongodb " + err));



mongoose.connect(keys.MongoURI); //IF TESTAROO DB IS ALREADY EXIST THEN OK. OR IF IT ISN'T IT WILL CREATE AUTOMATICLY
mongoose.connection.once('open', function () {
    console.log("Connection has been made now let's make fireaowks");
}).on('error', function (error) {
    console.log('Connection', error);
});


app.use(express.static('public'));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');



//BODY PARSER
app.use(express.urlencoded({extended: false})); //now we can get data from form 


//EXPRESS SESSION
app.use(session({
  secret: keys.session_secret,
  resave: false,
  saveUninitialized: false
}));

//PASSPORT MIDDLEWARE WE MUSH KEEP IT BELOW THE EXPRESS SESSION
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(methodOverride('_method'))







//ROUTES
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);




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

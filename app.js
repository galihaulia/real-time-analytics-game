const createError = require('http-errors');
const express = require('express');
const expSession = require('express-session');
const hbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const cloudRouter = require('./routes/cloud');

//#region connect to db
const db = require('./db/connection');
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//#endregion

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expSession({
  key: 'user_id',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_id && !req.session.user) {
      res.clearCookie('user_id');        
  }
  next();
});

// view engine setup
app.engine('hbs', hbs({extname: 'hbs',defaultLayout: 'layout'})); 
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/', cloudRouter);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
res.status(404).send("Sorry can't find that!")
});

//#region default
//// app.use('/', indexRouter);
//// app.use('/users', usersRouter);

// catch 404 and forward to error handler
//// app.use(function(req, res, next) {
////   next(createError(404));
//// });

// error handler
//// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //// res.locals.message = err.message;
  //// res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //// res.status(err.status || 500);
  //// res.render('error');
//// });
//#endregion

module.exports = app;

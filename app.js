const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const ratingsRouter = require('./routes/ratings');
const emailRouter = require('./routes/email');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(
  bodyParser.json({
    limit: '8mb'
  })
);

app.use(
  bodyParser.urlencoded({
    limit: '8mb',
    extended: true
  })
);

app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ratings', ratingsRouter);
app.use('/email', emailRouter);

app.get('/', function (req, res) {
  res.locals.title = 'Amp 4 Email';
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

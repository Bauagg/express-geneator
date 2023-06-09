var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

// Impotr Mildeware
const { decodeToken } = require('./midelware/decodeToken')

// Import Router
const routerProduct = require('./APP/product/routes')
const routerCategory = require('./APP/categori/routes')
const routerTag = require('./APP/tag/routes')
const routerAuth = require('./APP/auth/routes')
const routerDeliveryAdress = require('./APP/DeliveryAdress/routes')
const routerCart = require('./APP/cart/routes')
const routerOrder = require('./APP/order/routes')
const routerInvoice = require('./APP/invoice/routes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// midelware
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken())


// router
app.use('/', routerAuth)
app.use('/', routerProduct)
app.use('/', routerCategory)
app.use('/', routerTag)
app.use('/', routerDeliveryAdress)
app.use('/', routerCart)
app.use('/', routerOrder)
app.use('/', routerInvoice)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, () => console.log('localhost udah berjalan di port 4000 start'))

module.exports = app;

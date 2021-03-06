
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRoutes = require('./routes/api');
var adminRoutes = require('./routes/admin');
var expressValidator = require('express-validator');
var cors = require('cors');
var helmet = require('helmet')
var app = express();

//CORS ALLOW
app.use(cors());

//Security headers
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//handling and protecting static files
const filesAuthenticate = require('./app/middlewares/files-authenticate');
app.use("/uploads", filesAuthenticate);
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator({
    errorFormatter: (param, msg, value, location) => {
        return { field: param, message: msg }
    }    
}));


//loading config
require('dotenv').config();
require("./config/database");
require("./config/workers-manager");
require("./config/mailer").configure(app);

//ROUTES CONFIG
app.get('/', (req, res) => res.send("Oliver James API"));
app.use('/api', apiRoutes); // API routes
app.use('/admin', adminRoutes); // ADMIN routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

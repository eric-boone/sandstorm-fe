var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static('./views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var knex = require("knex")({
  client: "pg",
  connection: 'postgres://kkavxscrkrhght:LDRokhc3yTLzuzNH-1yxoIJIvU@ec2-54-225-195-249.compute-1.amazonaws.com:5432/db4emn8nb1aepe?ssl=true',
  });

app.post('/makeOrder', function(req, res, next){
  console.log('trying to post')
  knex("sandyclean").insert({
      name: req.body.name,
      email: req.body.email,
      quantity: req.body.quantity,
  }, "name").then(function(name){
    res.redirect('/index.html');
  });
})

app.get('/allOrders', function(req, res, next){
  knex("sandyclean").select().then(function(data){
    res.status(200).json({data: data});
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3030, function(){
  console.log('vhats up')
})
module.exports = app;

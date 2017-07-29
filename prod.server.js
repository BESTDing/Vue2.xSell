var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var apiRouter = express.Router();

apiRouter.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

apiRouter.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

app.use(apiRouter);
apiRouter.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRouter.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRouter);
app.use(express.static('./dist'));

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};


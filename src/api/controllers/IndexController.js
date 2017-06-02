/**
 * IndexController
 */
const http = require('http');
const IndexController = module.exports = {};

IndexController.notFound = (req, res) => {
  res.render('error/404', {});
};

IndexController.userhome = (req, res) => {
  res.render('admin', {user: req.user});
};

IndexController.proxy = (request, response) => {
  // https://s3.amazonaws.com/tarabalam/events_2016_12_CH.json
  let opts = {
    hostname: 's3.amazonaws.com',
    method: request.method,
    path: `/tarabalam${request.url}`,
    headers: request.headers
  };

  let req = http.request(opts, (res) => {
    res.pipe(response);
    response.writeHead(res.statusCode, res.headers);
  });

  request.pipe(req);
};

IndexController.redirect = (req,res,next) => {
  let routes = staticRoutes.routes();
  if(routes.hasOwnProperty(req.param('staticRoute'))) {
    return res.redirect(routes[req.param('staticRoute')]);
  } else {
    next();
  }
};

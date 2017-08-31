var shell = require('shelljs');

let AdminController = module.exports = {};


AdminController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  /*UtilService.wrapCb(cluster.create(params), (err, cluster) => {
    if (err) {
      server.log.error('Error create image', err);
      res.status(500).json(err);
    }
    res.send(cluster);

});*/

  console.log("server side start cluster admin controller");



};



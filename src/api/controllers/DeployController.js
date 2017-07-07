/**
 * Create DeployController
 */
var shell = require('shelljs');
var K8s = require('k8s');
const http = require('http');
const fs = require('fs');
var Slack = require('slack-node');
var webhookUri = "https://hooks.slack.com/services/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";

let DeployController = module.exports = {};

// Route: post /organizations/projects/application/deployments
DeployController.create = (req, res) => {
  let params = req.body;
  params.organizationId = req.params.organizationId;
  params.projectId = req.params.projectId;
  params.applicationId=req.params.applicationId;
  params.stage = req.params.stage;
  console.log('This is at the deploy controller',params.applicationId);

  UtilService.wrapCb(Cluster.create(params), (err, cluster) => {
    if (err) {
      server.log.error('Error while creating deployments', err);
      res.status(500).json(err);
    }
    res.send(cluster);
});
};


DeployController.findAll = (req, res) => {
  UtilService.wrapCb(Cluster.findAndCountAll({where: {
    organizationId: req.params.organizationId,
    projectId: req.params.projectId,
    applicationId:req.params.applicationId
  }}), (err, clusters) => {
    if (err) {
      server.log.error('Error while getting application', err);
      res.status(500).json(err);
    }
    res.send(clusters);
});
};

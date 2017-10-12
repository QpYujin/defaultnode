var shell = require('shelljs');
var K8s = require('k8s');
const http = require('http');
const fs = require('fs');
var dummyjson = require('dummy-json');
var yaml = require('write-yaml');
var Slack = require('slack-node');
var webhookUri = "https://hooks.slack.com/services/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";


const LaunchInstanceController = module.exports = {};


LaunchInstanceController.launchinstance = (req, res) => {

let params = req.body;
console.log('This is at the launch instances');
UtilService.wrapCb(Instance.create(params), (err, instance) => {
    if (err) {
      server.log.error('Error create Instance', err);
      res.status(500).json(err);
    }
    res.send(instance);
    console.log("This is instance no of instances creating",instance.noofinstances);
    

    /* 
    yaml('/usr/src/app/api/controllers/createInstances.yaml',data, function(err) {
	  // do stuff with err
	  console.log('This is inside error')
    });*/


  var data={
  "apiVersion": "v1",
  "kind": "List",
  "items": [
    {
      "apiVersion": "v1",
      "kind": "Namespace",
      "metadata": {
        "name": "flask"
      }
    },
    {
      "apiVersion": "v1",
      "kind": "Service",
      "metadata": {
        "name": "metrics",
        "namespace": "flask",
        "labels": {
          "app": "flask",
          "role": "web"
        },
        "annotations": {
          "external-dns.alpha.kubernetes.io/hostname": "flaskmetrics.deploybytes.com.",
          "consul.register/enabled": "true",
          "consul.register/service.name": "flask_metrics"
        }
      },
      "spec": {
        "type": "LoadBalancer",
        "ports": [
          {
            "name": "metrics",
            "port": 80,
            "targetPort": "metrics",
            "protocol": "TCP"
          }
        ],
        "selector": {
          "app": "flask",
          "role": "web"
        }
      }
    },
    {
      "apiVersion": "v1",
      "kind": "Service",
      "metadata": {
        "name": "flask",
        "namespace": "flask",
        "labels": {
          "app": "flask",
          "role": "web"
        },
        "annotations": {
          "external-dns.alpha.kubernetes.io/hostname": "flask.deploybytes.com.",
          "consul.register/enabled": "true",
          "consul.register/service.name": "flask_app",
          "externaldns": "flask.deploybytes.com"
        }
      },
      "spec": {
        "type": "LoadBalancer",
        "ports": [
          {
            "name": "web",
            "port": 80,
            "targetPort": "web",
            "protocol": "TCP"
          }
        ],
        "selector": {
          "app": "flask",
          "role": "web"
        }
      }
    },
    {
      "apiVersion": "extensions/v1beta1",
      "kind": "Deployment",
      "metadata": {
        "name": "flask",
        "namespace": "flask"
      },
      "spec": {
        "replicas": parseInt(instance.noofinstances),
        "strategy": {
          "type": "RollingUpdate"
        },
        "revisionHistoryLimit": 10,
        "selector": {
          "matchLabels": {
            "app": "flask",
            "role": "web"
          }
        },
        "template": {
          "metadata": {
            "labels": {
              "app": "flask",
              "role": "web"
            }
          },
          "spec": {
            "containers": [
              {
                "name": "flask",
                "image": "qpair/flaskapp:1.0.2",
                "imagePullPolicy": "Always",
                "ports": [
                  {
                    "name": "web",
                    "containerPort": 5000
                  },
                  {
                    "name": "metrics",
                    "containerPort": 8000
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ]
 }//yaml



yaml('/usr/src/app/api/controllers/createInstance.yaml',data, function(err) {
	  // do stuff with err
	});


var kubectl= K8s.kubectl ({
    	binary: '/usr/local/bin/kubectl',
   	kubeconfig: '/root/.kube/config',
    	version: '/api/v1'
     })//remove this comment

console.log('before service.yml file');

kubectl.command('create -f /usr/src/app/api/controllers/createInstance.yaml', function(err, data){
    console.log(data)
    console.log(err)
})



});//util services
};




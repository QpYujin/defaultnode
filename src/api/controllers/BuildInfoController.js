const BuildInfoController = module.exports = {};

/**
 * Render login page
 */
var fs = require('fs');
var gitCommits = require('git-commits');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || ('/usr/src/app/.git'));
var branch = require('git-branch');
var gittags = require('git-tags');
var shell = require('shelljs');


BuildInfoController.getInfo = function(req, res) {
	
	shell.exec('/usr/src/app/buildinfo.sh',function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
			console.log('error' +stderr);
				};
	});	

	fs.readFile('/usr/src/app/gitbuildinfo.txt', 'utf8', function(err, contents) {
    		console.log(contents);
		//res.send(contents);
	});


	res.sendFile('/usr/src/app/gitbuildinfo.txt')
};

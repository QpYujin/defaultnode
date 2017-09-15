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
	
	/*	
	branch(function(err, str) {
  	if (err) throw err;
  	console.log("This is branch",str);
	gittags.latest(function(err, latest) {
  	console.log("This is tag",latest);
	});
	

	gitCommits(repoPath, {
  	limit: 2
	}).on('data', function(commit) {
  	console.log(commit);
  	console.log('\n------------------\n');
	//res.send(commit);
	}).on('error', function(err) {
  	throw err;
	}).on('end', function() {
  	console.log("That's all, folks!");
	});

	});

		
	var gitlog = require('gitlog')
  	,options =
   	 { repo:'/usr/src/app/.git'
   	 , number: 2
	, author: ''
    	, fields:
     	 [ 'hash'
      	, 'abbrevHash'
      	, 'subject'
      	, 'authorName'
      	, 'authorDateRel'
     	 ]
    	, execOptions:
     	 {       }
   	 }
	
	gitlog(options, function(error, commits) {
  	// Commits is an array of commits in the repo
  	  console.log(commits);
	  //res.send(commits);
	  //res.sendFile(mytext.txt)
	})*/

	shell.exec('/usr/src/app/api/controllers/myshell.sh',function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
			console.log('error' +stderr);
				};
	});	

	fs.readFile('/usr/src/app/api/controller/mytext.txt', 'utf8', function(err, contents) {
    		console.log(contents);
		//res.send(contents);
	});


	res.sendFile('/usr/src/app/api/controllers/mytext.txt')
};

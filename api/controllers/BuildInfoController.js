const BuildInfoController = module.exports = {};

/**
 * Render login page
 */

var gitCommits = require('git-commits');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || ('/usr/src/app/.git'));
var branch = require('git-branch');
var gittags = require('git-tags');

BuildInfoController.getInfo = function(req, res) {
	
	

	console.log('at build info controller')  
	//------------------------------ for recent commits
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


	var gitlog = require('gitlog')
  	,options =
   	 { repo:'/usr/src/app/.git'
   	 , number: 1
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
	  res.send(commits);
	})


	/*
	branch(function(err, str) {
  	if (err) throw err;
  	console.log(str);
	result2=str
  	//=> 'master' 
	});
 
	// sync 
	console.log(branch.sync());
	//=> 'master' 


	gittags.latest(function(err, latest) {
  	console.log(latest);
 	 // '1.0.1' 
	});

	gittags.get(function(err, tags) {
  	if (err) throw err;
  	console.log(tags);
  	// ['1.0.1', '1.0.0', '0.1.0-beta'] 
	});*/
	//res.end();
};

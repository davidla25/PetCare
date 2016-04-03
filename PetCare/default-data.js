/*
	This script will add default data to the mongoDB database
	Only run this script once
	Running this script multiple times will add duplicate data to the database 

	How to run
		1) cd in to the PetCare directory
		2) if your server if already running, do ctrl + c to stop the server
		3) do 'npm istall' if you haven't done so
		4) in one terminal start the mongoDB daemon by typing 'mongod --dbpath ./mongodb_data'
			NOTE: If the mongoDB daemon is already running, you DO NOT have to run it again 
		5) in the second termianl type 'node default-data.js'
			WAIT: Until you see the 'Completed successfully!' message
				: This might take a few seconds
		6) now you can do 'npm start' and load http://localhost:3000/ in a browser
*/

var mongoose 			= require("mongoose");
var autoIncrement 		= require("mongoose-auto-increment");
var async 				= require('async');

/* Database Setup */
// Connect to a database
// NOTE: Dont forget to run 'mongod' (mongoDB daemon) in a different terminal
var connection = mongoose.connect("mongodb://localhost/testDB");
autoIncrement.initialize(connection);

// Import Database schema
var Application 	= require(__dirname + '/public/models/Application');
var Message 		= require(__dirname + '/public/models/Message');
var Pet 			= require(__dirname + '/public/models/Pet');
var Pet_Posting 	= require(__dirname + '/public/models/Pet_Posting');
var Sitter_Posting	= require(__dirname + '/public/models/Sitter_Posting');
var Report			= require(__dirname + '/public/models/Report');
var Review			= require(__dirname + '/public/models/Review');
var Pet_Review		= require(__dirname + '/public/models/Pet_Review');
var User			= require(__dirname + '/public/models/User');
var ForumPost		= require(__dirname + '/public/models/Forum_Post');

// Drop all collections in the db
User.collection.drop();
Application.collection.drop();
Message.collection.drop();
Pet.collection.drop();
Pet_Posting.collection.drop();
Sitter_Posting.collection.drop();
Report.collection.drop();
Review.collection.drop();
Pet_Review.collection.drop();
ForumPost.collection.drop();

// Call functions in a series and at the end call process.exit()
async.series([

    function(callback) {		// Adding the admin user

    	// Admin user
        var user = new User({
        	_id		: 1,
			name	: 'Ben Affleck',
			username: 'Ben',
			email	: 'admin@gmail.com',
			rating	: 0,
			banned	: false,
			location: 'Toronto, ON',
			role	: 'admin',
		});

		var password = '12345'

        User.register(user, password, function(err) {
			if (err) {
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Adding regular user
    	var user = new User({
        	_id		: 2,
			name	: 'Jennifer Lawrence',
			username: 'Jenniffer',
			email	: 'Jenniffer@gmail.com',
			rating	: 4,
			banned	: false,
			location: 'Toronto, ON',
			role	: 'regular',
		});

		var password = '12345'

        User.register(user, password, function(err) {
			if (err) {
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Adding regular user
    	var user = new User({
        	_id		: 3,
			name	: 'Christian Bale',
			username: 'Bale',
			email	: 'Bale@gmail.com',
			rating	: 3,
			banned	: false,
			location: 'Toronto, ON',
			role	: 'regular',
		});

		var password = '12345'

        User.register(user, password, function(err) {
			if (err) {
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Adding report from userId=3 to userId=2
    	
    	var report = new Report({
			to 		: 2,
			from 	: 3,
			message : 'I would like this report this user'
		});

        report.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

	function(callback) {		// Adding report from userId=2 to userId=3
    	
    	var report = new Report({
			to 		: 3,
			from 	: 2,
			message : 'This is a fake account. Please ban this user'
		});

        report.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Review from userId=3 to userId=2
    	var review = new Review({
    		to 		: 2,
			from 	: 3,
			rating 	: 4,
			comment : 'Im very satisfied with the service. I totally recommend her'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Review from userId=3 to userId=2
    	var review = new Review({
    		to 		: 2,
			from 	: 3,
			rating 	: 2,
			comment : 'Not the best pet sitter out there. But she only charged $10/hr'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    }, 

	function(callback) {		// Review from userId=2 to userId=3
    	var review = new Review({
    		to 		: 3,
			from 	: 2,
			rating 	: 4,
			comment : 'Very good service'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

	function(callback) {		// Review from userId=2 to userId=3
    	var review = new Review({
    		to 		: 3,
			from 	: 2,
			rating 	: 4,
			comment : 'He is a very freindly person and has years of experience. My dogs love him'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },   

    function(callback) {		// Pet Review from userId=3 to petId=1
    	var review = new Pet_Review({
    		to 		: 1,  // petId=1
			from 	: 3,
			rating 	: 5,
			comment : 'Very adorable and playful'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Pet Review from userId=3 to petId=2
    	var review = new Pet_Review({
    		to 		: 2,  // petId=2
			from 	: 3,
			rating 	: 3,
			comment : 'I had no trouble looking after him. Im giving 3 stars'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Pet Review from userId=2 to petId=1
    	var review = new Pet_Review({
    		to 		: 1,  // petId=1
			from 	: 2,
			rating 	: 4,
			comment : 'Has a cheerful, tail-wagging nature. I love him'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    },

    function(callback) {		// Pet Review from userId=2 to petId=2
    	var review = new Pet_Review({
    		to 		: 2,  // petId=2
			from 	: 2,
			rating 	: 4,
			comment : 'A little bit grumpy. But I like him. I rate 4/5'
    	});

    	review.save(function(err, report) {
			if(err){
				console.log(err);
			}
			callback();
		});
    }


// At the end of the script call process.exit()
], function(err, result){
	if (err){ 
		throw err; 
	}
    console.info('Completed successfully!');  
    process.exit();
});

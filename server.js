var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path    = require('path');
var vm = require ('vm');
var sessions = require ('express-session');
var jsonFile = require ('jsonfile');
var session;
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(sessions({
	secret: 'test'
}))


app.use(express.static('public'));

var content;
content = fs.readFileSync("users.json","UTF-8");



app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));

})


app.get('/login',function(req, res){
	session = req.session;
	if(session.uniqueID){
		res.redirect('/redir');
	}

	res.sendFile(path.join(__dirname+'/views/index.html'));
});

//SignUp
app.get('/log', function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
})
//login test
app.post('/log',function(req,res){
	var content = fs.readFileSync("users.json","UTF-8");
	var js = JSON.parse(content);
	session = req.session;

	if (session.uniqueID){
		res.redirect('/redir');
	}
	for (var i=0;i<js.lenght;i++){
		if (req.body.email == js[i].email && req.body.password == js[i].password){
			session.uniqueIS = req.body.email;
		}
	}
	res.redirect('/redir')
});



app.get('/redir',function(req,res){
	session = req.session;
	if (session.uniqueID){
		res.sendFile(path.join(__dirname+'/views/index.html'));
	}
	else {
		res.sendFile(path.join(__dirname + '/views/index.html'));
	}
})

app.post('/createAcc',function(req,res){
	var mail = req.body.email;
	var password = req.body.password;

	try {
		let userData = fs.readFileSync('users.json');
		userData=JSON.parse(userData);
		userData.push({
			'email':mail,
			'password':password
		});
		fs.writeFileSync('users.json', JSON.stringify(userData, null, 2));
	alert("now please login");
  } catch (error){
		console.log(error);
	}
	res.sendFile(path.join(__dirname+'/views/index.html'));
});


app.post('/contact', function(req,res){ //Post Response
	var surname = req.body.surname;
	var name = req.body.name;
	var mail = req.body.email;
	var message=req.body.message;

	try {
		let userMessage = fs.readFileSync('form.json');
		userMessage = JSON.parse(userMessage);
		userMessage.push({
			lastName:surname,
			FirstName:name,
			email:mail,
			message:message
		});
		fs.writeFileSync('form.json', JSON.stringify(userMessage,null,2));
	} catch (error) {
		console.log(error);
	}
	res.sendFile(path.join(__dirname+'/views/index.html'));
});




app.listen(3000);

console.log("Running at Port 3000");
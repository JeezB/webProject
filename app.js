var express = require('express');
var app     = express();
var path    = require('path');
app.use(express.static('public'));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
  //It will find and locate index.html from View or Scripts
});

app.get('/msg',function(req,res){
  res.sendFile(path.join(__dirname+'/views/msgform.html'));
});

app.get('/req',function(req,res){
  res.sendFile(path.join(__dirname+'/views/request.html'));
});

app.listen(3000);

console.log("Running at Port 3000");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/scriptDb');
var Schema = mongoose.Schema;
var fs = require('fs');
var http = require('http');

var userDataSchema = new Schema({
  ID: String,
  Name: String,
  Script: String
});

var UserData = mongoose.model('script', userDataSchema);

router.get('/', function(req, res, next) {
  var nextProductID = "_p";
  fs.readFile('NextProductID.txt', function(err, data) {
    var productID = parseInt(data)
    productID += 1;
    fs.writeFile('NextProductID.txt', productID);
    nextProductID += productID;
    console.log(nextProductID);
    UserData.find()
        .then(function(doc) {
          console.log("Got as far as here, array length is: " + doc.length);
          res.render('index', {title: "My Page", items: doc, theNextProductID : nextProductID});
        });
    });
});

module.exports = router;

var express = require('express');
var contracts = require('truffle-contract');
var Web3 = require('web3')
var contractJSON = require(path.join(__dirname, 'build/contracts/MyContract.json'))
var app = express()

var web3Provider = new Web3.providers.HttpProvider('https://localhost:7545');


var Mycontract = contract(contractJSON);
Mycontract.setProvider(web3Provider);

app.post('/addPDS',function(req,res){
  uin = req.body.UIN;
  _type = req.body._type;
  weight = req.body.weight;
  name = req.body.quality;
  
  Mycontract.deployed.then(function(instance){
    instance.addPDS()
  });
});



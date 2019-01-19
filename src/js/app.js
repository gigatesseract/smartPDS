if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(web3Provider);
    }
var accountName = '';
web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        accountName = account;
      }else{
        console.log(err);
      }
});
$.getJSON("PDS.json", function(pds) {

      Mycontract = TruffleContract(pds);
      Mycontract.setProvider(web3Provider);
});
$.getJSON('https://jsonip.com/?callback=?',(data)=>{
  return data;
}).then(function(locationdata){
  locationip = locationdata.ip;
  console.log(locationip);
});


function addPDS(){
  console.log("I am here");
  uin = $('#f_aadhar').val();
  _type = $("#_type").val();
  weight = $("#weight").val();
  console.log(typeof(weight));
  quality = $("#quality").val();
  q_aadhar = $("#q_aadhar").val();
  var date = new Date();
  var time = date.getTime();
  time.toString();
  Mycontract.deployed().then(function(instance){
    instance.addPDS(time, _type, quality, uin, q_aadhar, weight, locationip, time, {from : accountName})
  });
};

function viewPDS(){
  uin = $('#UIN').val();
  var str = uin;
  var bytes = []; // char codes
  var bytesv2 = []; // char codes

  for (var i = 0; i < str.length; ++i) {
    var code = str.charCodeAt(i);
    
    bytes = bytes.concat([code]);
    
    bytesv2 = bytesv2.concat([code & 0xff, code / 256 >>> 0]);
  }


  Mycontract.deployed().then(function(instance){
    number = instance.PDScount().then(function(values){
      return values.c[0];
    })

    for (var i = 1; i <= number; i++){
      instance.PDSdatas(i).then(function(pd){
      console.log(pd);
    });
    }
  });
}


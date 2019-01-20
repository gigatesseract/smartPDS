$(function() {
  $.getJSON("PDS.json", function(pds) {
    Mycontract = TruffleContract(pds);
    Mycontract.setProvider(web3Provider);
    Mycontract.deployed().then(async function(instance) {
      var app = await instance;
      app.PDScount.call().then(
        function(number) {
          $("#number").text(
            "There are " + number.toNumber() + " blocks in the blockchain"
          );
        }
        // $("#number").text(
        //   "There are " +
        //     toString(number.toNumber()) +
        //     "blocks in the blockchain"
      );
    });
  });
  if (typeof web3 !== "undefined") {
    // If a web3 instance is already provided by Meta Mask.
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // Specify default instance if no web3 instance provided
    web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(web3Provider);
  }
});
var accountName = "";
web3.eth.getCoinbase(function(err, account) {
  if (err === null) {
    accountName = account;
  } else {
    console.log(err);
  }

  $.getJSON("https://jsonip.com/?callback=?", data => {
    return data;
  }).then(function(locationdata) {
    locationip = locationdata.ip;
    console.log(locationip);
  });
});

function addPDS() {
  uin = $("#f_aadhar").val();
  _type = $("#_type").val();
  weight = $("#weight").val();

  quality = $("#quality").val();
  q_aadhar = $("#q_aadhar").val();
  var date = new Date();
  var time = date.getTime();
  time.toString();
  Mycontract.deployed().then(function(instance) {
    instance.addPDS(
      time,
      _type,
      quality,
      uin,
      q_aadhar,
      weight,
      locationip,
      time,
      { from: accountName }
    );
  });
}

function updateWarehouse() {
  uin = $("#uin").val();
  q_aadhar = $("#q_aadhar").val();
  _type = $("#_type").val();
  weight = $("#weight").val();
  quality = $("#quality").val();
  var date = new Date();
  var time = date.getTime();
  time.toString();
  Mycontract.deployed().then(function(instance) {
    instance.warehouseUpdate(uin, quality, weight, locationip, time, {
      from: accountName
    });
  });
}
function pdsDisplay(pdsarray) {
  if (pdsarray.length > 0) {
    table_string = "";
    table_string +=
      "<table class = 'table'><tr><th>UIN</th><th>Type of goods</th><th>Quality</th><th>Weight</th><th>Location</th><th>Arrival</th>";
    pdsarray.forEach(function(element) {
      table_string +=
        "<tr><td>" +
        element[2] +
        "</td><td>" +
        element[3] +
        "</td><td>" +
        element[4] +
        "</td><td>" +
        element[5] +
        "</td><td>" +
        element[6] +
        "</td><td>" +
        element[7] +
        "</td><tr>";
    });
  }
  $("#table").html(table_string);
}

async function viewPDS() {
  uin = $("#UIN").val();
  Mycontract.deployed().then(function(instance) {
    app = instance;
    Mycontract.deployed().then(async function(instance) {
      var app = await instance;
      app.PDScount.call().then(
        async function(number) {
          var pdsarray = [];
          no_of_blocks = number.toNumber();
          for (i = 1; i <= no_of_blocks; i++) {
            var pdsdata = await app.PDSdatas(i);

            if (pdsdata[2] === uin) {
              pdsarray.push(pdsdata);
            }
          }
          console.log(pdsarray);
          pdsDisplay(pdsarray);
        }
        // $("#number").text(
        //   "There are " +
        //     toString(number.toNumber()) +
        //     "blocks in the blockchain"
      );
    });
  });
  // var bytes = []; // char codes
  // var bytesv2 = []; // char codes

  // for (var i = 0; i < str.length; ++i) {
  //   var code = str.charCodeAt(i);

  //   bytes = bytes.concat([code]);

  //   bytesv2 = bytesv2.concat([code & 0xff, (code / 256) >>> 0]);
  // }
}

// for (var i = 1; i <= number; i++) {
//   instance.PDSdatas(i).then(function(pd) {
//     console.log(pd);
//   });
// }


if (typeof web3 !== "undefined") {
  // If a web3 instance is already provided by Meta Mask.
  web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // Specify default instance if no web3 instance provided
  web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
  web3 = new Web3(web3Provider);
}
$.getJSON("PDS.json", function(pds) {
  Mycontract = TruffleContract(pds);
  Mycontract.setProvider(web3Provider);
  Mycontract.deployed().then(async function(instance) {
    var app = await instance;
    app.PDScount.call().then(function(number) {
      $("#number").text(
        "There are " + number.toNumber() + " blocks in the blockchain"
      );
    });
  });
});

var accountName = "";
web3.eth.getCoinbase(function(err, account) {
  if (err === null) {
    accountName = account;
  } else {
    console.log(err);
  }
});

$.getJSON("https://jsonip.com/?callback=?", data => {
  return data;
}).then(function(locationdata) {
  locationip = locationdata.ip;
  console.log(locationip);
});
function subscribe() {

   var mobile = document.getElementById('mobile').value;

    if (typeof(Storage) !== "undefined") {
    throwalert("Number Added Succesfully","success");
    var user = JSON.parse(localStorage.getItem('mobile'));
    if(user==null)
       user = {1:mobile};
    else
    {

       count=Object.keys(user).length+1;
       user[count] = mobile;
    }

    localStorage.setItem("mobile",JSON.stringify(user));

   }
    else {
       throwalert("Number could not be added","danger");
    }

 }
function throwalert(string, string2) {
  if (string2 == "success")
    $("#alert")
      .removeClass("alert-danger")
      .removeClass("alert-info")
      .addClass("alert-success")
      .show();
  else if (string2 == "danger") {
    $("#alert")
      .removeClass("alert-success")
      .removeClass("alert-info")
      .addClass("alert-danger")
      .show();
  } else if (string2 == "primary") {
    $("#alert")
      .removeClass("alert-success")
      .removeClass("alert-danger")
      .addClass("alert-info")
      .show();
  }
  $("#alert-text").text(string);
}
function addPDS() {
  uin = $("#f_aadhar").val();
  uin = uin.replace(/\s/g, '');
  _type = $("#_type").val();
  weight = $("#weight").val();

  quality = $("#quality").val();
  q_aadhar = $("#q_aadhar").val();
  q_aadhar = q_aadhar.replace(/\s/g, '');
  var date = new Date();
  var time = date.getTime();
  time = time.toString();
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

function updateBlocks() {
  Mycontract.deployed().then(async function(instance) {
    var app = await instance;
    app.PDScount.call().then(function(number) {
      $("#number").text(
        "There are " + number.toNumber() + " blocks in the blockchain"
      );
    });
  });
}

async function updateWarehouse() {
  uin = $("#uin").val();
  q_aadhar = $("#q_aadhar").val();
  q_aadhar = q_aadhar.replace(/\s/g, '');
  _type = $("#_type").val();
  weight = $("#weight").val();
  quality = $("#quality").val();
  var date = new Date();
  var time = date.getTime();
  time.toString();
  Mycontract.deployed().then(async function(instance) {
    var app = await instance;
    app.PDScount.call().then(async function(number) {
      var flag = false;

      no_of_blocks = number.toNumber();
      for (i = 1; i <= no_of_blocks; i++) {
        var pdsdata = await app.PDSdatas(i);
          pdsdata[1] = hex_to_ascii(pdsdata[1]);
          pdsdata[3] = hex_to_ascii(pdsdata[3]);
          var date = new Date(parseInt(pdsdata[6], 10)).toUTCString();
          pdsdata[6] = date;
          console.log(pdsdata[1]);
          if (uin.localeCompare(pdsdata[1]) == 0) {
            flag = true;
          }
      }
      console.log("outside for loop");
      if (flag) {
        instance.warehouseUpdate(uin, quality, weight, locationip, time, {
          from: accountName
        });
        throwalert(
          "Transaction initiated. Accept the transaction to continue",
          "primary"
        );
      } else {
        throwalert(
          "Unique Identification Number does not exist. The process failed",
          "danger"
        );
      }
      updateBlocks();
    });
  });
}
table_string = "";
function pdsDisplay(pdsarray) {
  if (pdsarray.length > 0) {
    table_string = "";
    table_string +=
      "<table class='table'><tr><th>UIN</th><th>Type of goods</th><th>Quality Checker Number</th><th>Quality</th><th>Weight(Kg)</th><th>Location</th><th>Arrival</th>";
    pdsarray.forEach(function(element) {
      table_string +=
        "<tr><td>" +
        element[1] +
        "</td><td>" +
        element[2] +
        "</td><td>" +
        element[3].slice(2,) +
        "</td><td>" +
        element[3].slice(0,2)+
        "</td><td>"+
        element[4] +
        "</td><td>" +
        element[5] +
        "</td><td>" +
        element[6] +
        "</td><tr>";
    });
  }
  $("#table").html(table_string);
  $('.table').css('margin','0');
  $('.table').css("width","100%");
};
function hex_to_ascii(str1)
{
  var hex  = str1.toString();
  var str = '';

  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

async function viewPDS() {
  var uin = $("#UIN").val();
  Mycontract.deployed().then(function(instance) {
    app = instance;
    Mycontract.deployed().then(async function(instance) {
      var app = await instance;
      app.PDScount.call().then(async function(number) {
        var pdsarray = [];
        no_of_blocks = number.toNumber();
        for (i = 1; i <= no_of_blocks; i++) {
          var pdsdata = await app.PDSdatas(i);
          pdsdata[1] = hex_to_ascii(pdsdata[1]);
          pdsdata[3] = hex_to_ascii(pdsdata[3]);
          var date = new Date(parseInt(pdsdata[6], 10)).toUTCString();
          pdsdata[6] = date;
          console.log(pdsdata[1]);
          if (uin.localeCompare(pdsdata[1]) == 0) {
            pdsarray.push(pdsdata);
          }
        }
        console.log(pdsarray);
        pdsDisplay(pdsarray);
      });
    });
  });
}

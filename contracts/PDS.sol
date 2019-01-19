pragma solidity 0.5.0;


contract PDS{



  struct PDSdata{
    uint id;
    uint UIN;
    string _type;
    string quality;
    string weight;
    string location;
    string arrival;


  }
  mapping(uint => PDSdata) public PDSdatas;
  uint public PDScount;

  function  addPDS(string memory _type,  string memory quality, string memory f_aadhar, string memory purist_aadhar, string memory weight, string memory location, string memory arrival) public {
    PDScount++;
    uint UIN = keccak256(f_aadhar);
    uint quality = quality + keccack256(purist_aadhar);
    
    PDSdatas[PDScount] = PDSdata(PDScount, UIN, _type, quality, weight, location, arrival);

  }
}


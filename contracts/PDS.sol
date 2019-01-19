pragma solidity 0.5.0;


contract PDS{



  struct PDSdata{
    uint id;
    bytes UIN;
    string _type;
    bytes quality;
    string weight;
    string location;
    string arrival;


  }
  mapping(uint => PDSdata) public PDSdatas;
  uint public PDScount;

  function  addPDS(string memory _type,  string memory quality, string memory f_aadhar, string  purist_aadhar, string memory weight, string memory location, string memory arrival) public {
    PDScount++;
    bytes memory UIN = abi.encodePacked(f_aadhar);
    bytes memory qual = abi.encodePacked(quality, string(keccak256(purist_aadhar)));
    
    PDSdatas[PDScount] = PDSdata(PDScount, UIN, _type, qual, weight, location, arrival);

  }
}


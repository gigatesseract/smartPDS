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
  mapping(uint => PDSdata) public tempPDSdatas;

  mapping(uint => PDSdata) public PDSdatas;
  uint public PDScount;

  constructor() public{
    PDScount = 1;
  }

  function convertingToString(string memory _a) public returns(string memory){
  
    string memory converted = string(_a);
    return converted;
  }
  

  function  addPDS(string memory _type,  string memory quality, string memory f_aadhar, string memory purist_aadhar, string memory weight, string memory location, string memory arrival) public {
    PDScount++;
    bytes memory UIN = abi.encodePacked(f_aadhar);
    bytes memory qual = abi.encodePacked(quality, convertingToString(purist_aadhar));
    
    PDSdatas[PDScount] = PDSdata(PDScount, UIN, _type, qual, weight, location, arrival);

  }

  function printStatus(bytes memory UIN) public {
    uint tempPDScount = 0;
    for(uint i = 1; i<=PDScount;i++){
      if(keccak256(PDSdatas[i].UIN)==keccak256(UIN)){
        tempPDScount++;
        tempPDSdatas[tempPDScount] = PDSdata(tempPDScount, UIN, PDSdatas[i]._type, PDSdatas[i].quality, PDSdatas[i].weight, PDSdatas[i].location, PDSdatas[i].arrival);

      }
    }
  }
}


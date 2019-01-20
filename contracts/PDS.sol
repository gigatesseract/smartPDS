pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

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

  // mapping(bytes=>(mapping(uiint->PDSdata)public)) public PDSlist;
  uint public PDSlistcount; 


  constructor() public{
    PDScount = 0;
  }

  function convertingToString(string memory _a) public returns(string memory){
  
    string memory converted = string(_a);
    return converted;
  }
  


  function  addPDS(string memory time, string memory _type,  string memory quality, string memory f_aadhar, string memory purist_aadhar, string memory weight, string memory location, string memory arrival) public {
    PDScount++;
    bytes memory UIN = abi.encodePacked(time, convertingToString(f_aadhar));
    bytes memory qual = abi.encodePacked(quality, convertingToString(purist_aadhar));
    
    PDSdatas[PDScount] = PDSdata(PDScount, UIN, _type, qual, weight, location, arrival);

  }

  // function printStatus(bytes memory UIN) public returns (bytes[] memory, string[] memory, bytes[] memory, string[] memory, string[] memory, string[] memory) { 
  //   // uint tempPDScount = 0;
 

  //   bytes[] memory uins = new bytes[](PDScount);

  //   string[] memory _types = new string[](PDScount);

  //   string[] memory qualities = new string[](PDScount);

  //   string[] memory weights = new string[](PDScount);

  //   string[] memory locations = new string[](PDScount);

  //   string[] memory arrivals = new string[](PDScount);

  
  //   for(uint i = 1; i<=PDScount;i++){
  //     if(compareStrings(PDSdatas[i].UIN, UIN)){
  //       uins[i] = PDSdatas[i].UIN;
  //       _types[i] = PDSdatas[i]._type;
  //       qualities[i] = PDSdatas[i].quality;
  //       weights[i] = PDSdatas[i].weight;
  //       locations[i] = PDSdatas[i].location;
  //       arrivals[i] = PDSdatas[i].arrival;

        
        

  //     }
  //     return (uins, _types, qualities, weights, locations, arrivals);
  //   }
  // }

  // function getUINsbykey() public {
  //   for(uint i=1;i<=PDScount;i++){




  //   }
  // }

  
  function warehouseUpdate(bytes memory UIN, bytes memory quality, string memory weight, string memory location, string memory arrival) public {
    for(uint i = 1; i<=PDScount;i++){
      if(keccak256(PDSdatas[i].UIN)==keccak256(UIN)){
        PDScount++;
        
        PDSdatas[PDScount] = PDSdata(PDScount, UIN, PDSdatas[i]._type, quality, weight, location, arrival);

      }
    }

  }
}
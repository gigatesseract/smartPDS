   
<img src="https://www.freelogoservices.com/api/main/images/1j+ojl1KOMkX9WyofBe43D6ki...KDqRJMnhzIwXs1M3EMoAJtlSQlgfRu8f06" alt="alt text" width="350" height="225"/>    



# smartPDS    
Implementation of a decentralised public distribution system using blockchain.    
Coded in two days from scratch as part of Pragyan Hackathon 2019

## Built With :house:   
* [Ganache](https://truffleframework.com/ganache) - For a personal Ethereum blockchain. 
* [Truffle](https://truffleframework.com/) - A development framework for building dapps.
* Solidity - For implementing smart contracts.
* Lots of :blue_heart: from Team Alpha :wolf::wolf::wolf:




## Run :runner: :runner: :runner:    
1. `git clone https://github.com/gigatesseract/smartPDS.git`
1. cd `smartPDS`
1. `npm install` (If npm command is not found, try `sudo apt install nodejs npm` and then `npm install`)
1. Download ganache appImage [here](https://truffleframework.com/ganache) and run it.    
1. Install [metamask](https://metamask.io/) extension for your browser.    
1. Configure the metamask extension to let it communicate between ganache and your dapp.     
    * Create a metamask account. You will be given a 8-word seed phrase. **Keep the seed phrase safe**    
    * Fire up the metamask extension. Change network to *Custom RPC*    
    * In the RPC URL field, enter the URL shown by Ganache at its top window and press Enter. 
    * In Ganache, click the :key: button of any one account and copy the Private key.
    * In metamask, click your account image, go to *import account* and paste the Private key. Check [here](https://truffleframework.com/docs/truffle/getting-started/truffle-with-metamask) for more details. 
    * Once everything is set, you are good to go. Now go back to terminal. 
1. `truffle migrate` (Use `truffle migrate --reset` if you want to overwrite build files)  *If metamask configuration was done right this will deduct fake ethereum from the account which you configured in the metamask, as this is where the contract is deployed in the blockchain*
1. `npm run dev`



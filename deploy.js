const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

const provider = new HDWalletProvider(
    '<Your mnemonic>',
    'https://rinkeby.infura.io/<your API endpoint>'

);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying to the Network using account : ', accounts[0]);
 
    // Please change the addresses according to your addresses 
    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x'+ bytecode, arguments: [['0x61Ee7fA43ff49d4E9CC680E6031F074bd4BF85c7','0xBdAb9d885443A1D381EF4c03600d80FED63ABf46'],'0x9De226640854E3b2408cDFD486663bEaC3C072EC']})
     .send({gas: '1000000', from : accounts[0], value: '2000000' });

    console.log('Contract Deployed to : ', result.options.address);
};

deploy();

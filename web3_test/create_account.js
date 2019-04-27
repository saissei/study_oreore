const Web3 = require('web3');
const web3 = new Web3();

// connect to geth
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

function createAccount(){
  const _account = web3.personal.newAccount("test");
  console.log(_account)
}

// 現在のアカウント一覧
function listAccount(){
  web3.eth.getAccounts((error, result) => {
    console.log(result)
  });
}
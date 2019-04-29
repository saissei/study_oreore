const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contract_addr = '0xb8b6f169174031802ec7d913b92554d9888f7089'
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_supply",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_decimals",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const OreCoin = new web3.eth.Contract(abi, contract_addr);



const getAccounts = async () => {
  return await web3.eth.getAccounts();
}

const OreBalance = async (_address) => {
  return await OreCoin.methods.balanceOf(_address).call();
}

const oreTransfer = async (_from, _to, _value) => {
  web3.eth.defaultAccount = _from;
  return await OreCoin.methods.transfer(_to, _value);
}

/** アカウント一覧の取得 */
getAccounts()
.then(_ac => {

  /** 既存アカウント数チェック */
  if(_ac.length < 2){
    const err = 'Number of accounts is not enough.\nprocess exit.';
    console.log(err);
    process.exit();
  };
  /** 使用するアカウントの変数化 */
  const _from = _ac[0]; // default coinbase
  const _to = _ac[1];

  /** 送金処理 */
  oreTransfer(_from, _to, '10')
  .then(result => {
    console.log(result)
    /** 残高参照 */
    OreBalance(_from)
    .then(oc => {
      /** 16 -> 10 の変換 */
      const _coin = parseInt((oc._hex).replace(/^0x/, ''), 16);
      console.log(`${_coin} oc`);
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))

})
.catch(err => console.error)
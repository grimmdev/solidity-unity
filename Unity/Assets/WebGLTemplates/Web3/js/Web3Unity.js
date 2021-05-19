// Here's how we would access our contract:
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomPicture",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pictureId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			}
		],
		"name": "NewPicture",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pictures",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dna",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const address = '0x5fDEF9166463Be96E3f8b94ea26E2b266718c73A'

async function Initialize()
{
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        window.account = accounts[0];
        console.log('ACCOUNT:' + account);

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);

            window.contract = await loadContract();

            window.contract.defaultChain = 'ropsten';

            gameInstance.SendMessage('Web3Manager', 'Initialize');

            window.contract.events.NewPicture({
                fromBlock: 'latest',
                toBlock: 'latest'
              }, function(error, result) {
                if (!error) {
					console.log('%j', result);
					console.log('Address:' + result.transactionHash);
					console.log('DNA:' + result.returnValues.dna);
					gameInstance.SendMessage('Web3Manager', 'Message', JSON.stringify({ id: result.returnValues.strainId, name: result.returnValues.name, dna: result.returnValues.dna, address: result.transactionHash }));
                } else {
                  console.log(error);
                }
            });
          }
      }
}

async function loadContract() {
    return await new window.web3.eth.Contract(abi, address);
}

Initialize();

function CreatePicture(name)
{
    console.log('Creating picture with ' + name + '.');
    window.contract.methods.createRandomPicture(name).send({from: window.web3.givenProvider.selectedAddress});
}
const eth = ethers.utils.parseEther

const networks = {
	mainnet: {
		chainId: 1,
		name: 'Ethereum Mainnet',
		explorer: 'https://etherscan.io/'
	},
	rinkeby: {
		chainId: 5,
		name: 'Goerli Testnet',
		explorer: 'https://goerli.etherscan.io/'
	}
}

const contractData = {
	abi: [
		'constructor(address,address,address,address,address)',
		'error InvalidETHReceived(uint256,uint256)',
		'error LevelOutOfBounds(uint8)',
		'event Approval(address indexed,address indexed,uint256 indexed)',
		'event ApprovalForAll(address indexed,address indexed,bool)',
		'event Donation(address indexed,uint256,uint256)',
		'event Minted(address indexed,uint256,bool,uint8)',
		'event Transfer(address indexed,address indexed,uint256 indexed)',
		'function alreadyMinted(address) view returns (bool)',
		'function approve(address,uint256)',
		'function balanceOf(address) view returns (uint256)',
		'function contractURI() pure returns (string)',
		'function front() view returns (address)',
		'function getApproved(uint256) view returns (address)',
		'function isApprovedForAll(address,address) view returns (bool)',
		'function isRegistered(address) view returns (bool)',
		'function levelOf(uint256) view returns (uint8)',
		'function mint(uint8) payable',
		'function mintingDonation(uint8) pure returns (uint256)',
		'function name() view returns (string)',
		'function nico() view returns (address)',
		'function ownerOf(uint256) view returns (address)',
		'function proofOfHumanity() view returns (address)',
		'function rarityOf(uint256) view returns (string)',
		'function safeTransferFrom(address,address,uint256)',
		'function safeTransferFrom(address,address,uint256,bytes)',
		'function setApprovalForAll(address,bool)',
		'function supportsInterface(bytes4) view returns (bool)',
		'function symbol() view returns (string)',
		'function tokenURI(uint256) view returns (string)',
		'function totalRaised() view returns (uint256)',
		'function totalSupply() view returns (uint256)',
		'function transferFrom(address,address,uint256)',
		'function ubiBurner() view returns (address)',
		'function v4len() view returns (address)',
		'function withdrawETH()'
	]
}

const donations = {
	0: 0,
	1: eth('0.01'),
	2: eth('0.1'),
	3: eth('1')
}

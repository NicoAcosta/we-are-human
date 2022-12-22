require('@nomicfoundation/hardhat-toolbox')
require('hardhat-abi-exporter')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	networks: {
		goerli: {
			url: process.env.TESTNET_RPC,
			accounts: [process.env.TESTNET_PK]
		}
	},
	abiExporter: {
		path: './abi',
		runOnCompile: true,
		flat: true,
		spacing: 2,
		pretty: true
	}
}

require('@nomicfoundation/hardhat-toolbox')
require('hardhat-abi-exporter')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('dotenv').config()

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
		pretty: true,
		only: ['IProofOfHumanity', 'IWeAreHuman', 'DummyPoH', 'WeAreHuman']
	},
	gasReporter: {
		enabled: true,
		currency: 'USD'
	},
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: false,
		runOnCompile: true,
		strict: true
	}
}

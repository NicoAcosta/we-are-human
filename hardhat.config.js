require('@nomicfoundation/hardhat-toolbox')
require('hardhat-abi-exporter')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('dotenv').config()

const env = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	networks: {
		goerli: {
			url: env.TESTNET_RPC,
			accounts: [env.TESTNET_PK]
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
	},
	etherscan: {
		apiKey: env.ETHERSCAN_KEY
	}
}

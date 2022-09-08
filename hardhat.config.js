require('@nomicfoundation/hardhat-toolbox')
require('hardhat-abi-exporter')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.9',
	abiExporter: {
		path: './abi',
		runOnCompile: true,
		flat: true,
		spacing: 2,
		pretty: true
	}
}

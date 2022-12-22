const {BigNumber} = require('ethers')
const hre = require('hardhat')
require('dotenv').config()

async function main() {
	const [deployer] = await ethers.getSigners()
	console.log('Deployer:', await deployer.getAddress())

	const WeAreHuman = await ethers.getContractFactory('WeAreHuman')
	const weAreHuman = await WeAreHuman.deploy()
	await weAreHuman.deployed(
		process.env.MAINNET_POH,
		process.env.MAINNET_BURNER,
		process.env.MAINNET_VALEN,
		process.env.MAINNET_NICO,
		process.env.MAINNET_FRONT
	)

	console.log('WeAreHuman address:', weAreHuman.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

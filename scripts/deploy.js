const {BigNumber} = require('ethers')
const hre = require('hardhat')
require('dotenv').config()

const env = process.env

async function main() {
	const [deployer] = await ethers.getSigners()
	console.log('Deployer:', await deployer.getAddress())

	const WeAreHuman = await ethers.getContractFactory('WeAreHuman')
	const weAreHuman = await WeAreHuman.deploy()
	await weAreHuman.deployed(
		env.MAINNET_POH,
		env.MAINNET_BURNER,
		env.MAINNET_VALEN,
		env.MAINNET_NICO,
		env.MAINNET_FRONT
	)

	console.log('WeAreHuman address:', weAreHuman.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

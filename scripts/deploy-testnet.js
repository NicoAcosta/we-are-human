const {BigNumber} = require('ethers')
const hre = require('hardhat')
require('dotenv').config()

async function main() {
	const [deployer] = await ethers.getSigners()
	console.log('Deployer:', await deployer.getAddress())

	const DummyPoH = await ethers.getContractFactory('DummyPoH')
	const proofOfHumanity = await DummyPoH.deploy([
		process.env.TESTNET_NICO,
		process.env.TESTNET_VALEN
	])
	await proofOfHumanity.deployed()

	console.log('DummyPoH address:', proofOfHumanity.address)

	const WeAreHuman = await ethers.getContractFactory('WeAreHuman')
	const weAreHuman = await WeAreHuman.deploy(
		proofOfHumanity.address,
		process.env.TESTNET_BURNER,
		process.env.TESTNET_VALEN,
		process.env.TESTNET_NICO,
		process.env.TESTNET_FRONT
	)

	await weAreHuman.deployed()

	console.log('WeAreHuman address:', weAreHuman.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})

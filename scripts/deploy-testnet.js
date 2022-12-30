const {BigNumber} = require('ethers')
const hre = require('hardhat')
require('dotenv').config()

const env = process.env

async function main() {
	const [deployer] = await ethers.getSigners()
	console.log('Deployer:', await deployer.getAddress())

	const DummyPoH = await ethers.getContractFactory('DummyPoH')
	const proofOfHumanity = await DummyPoH.deploy([
		env.TESTNET_HUMAN_1,
		env.TESTNET_HUMAN_2
	])
	await proofOfHumanity.deployed()

	console.log('DummyPoH address:', proofOfHumanity.address)

	const WeAreHuman = await ethers.getContractFactory('WeAreHuman')
	const weAreHuman = await WeAreHuman.deploy(
		proofOfHumanity.address,
		env.TESTNET_BURNER,
		env.TESTNET_VALEN,
		env.TESTNET_NICO,
		env.TESTNET_FRONT
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

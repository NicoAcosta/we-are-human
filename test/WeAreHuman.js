const {expect} = require('chai')

describe('WeAreHuman', async () => {
	let proofOfHumanity,
		weAreHuman,
		owner,
		burner,
		valen,
		nico,
		front,
		registered1,
		registered2,
		addr1,
		addr2

	const deploy = async () => {
		;[
			owner,
			burner,
			valen,
			nico,
			front,
			registered1,
			registered2,
			addr1,
			addr2
		] = await ethers.getSigners()

		const DummyPoH = await ethers.getContractFactory('DummyPoH')
		proofOfHumanity = await DummyPoH.deploy([
			process.env.TESTNET_NICO,
			process.env.TESTNET_VALEN
		])
		await proofOfHumanity.deployed()

		const WeAreHuman = await ethers.getContractFactory('WeAreHuman')
		weAreHuman = await WeAreHuman.deploy(
			proofOfHumanity.address,
			burner.address,
			valen.address,
			nico.address,
			front.address
		)
	}

	this.beforeEach(async () => {
		await deploy()
	})

	describe('Deployment', async () => {
		it('Should set proof of humanity contract address', async () => {
			expect(await weAreHuman.proofOfHumanity()).to.equal(
				proofOfHumanity.address
			)
		})
	})
})

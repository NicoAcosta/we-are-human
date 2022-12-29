const {expect} = require('chai')

const eth = ethers.utils.parseEther

describe('WeAreHuman', () => {
	let proofOfHumanity,
		weAreHuman,
		owner,
		burner,
		valen,
		nico,
		front,
		registered1,
		registered2,
		registered3,
		registered4,
		registered5,
		registered6,
		registered7,
		registered8,
		registered9,
		registered10,
		addr1,
		humans

	const deploy = async () => {
		;[
			owner,
			burner,
			valen,
			nico,
			front,
			registered1,
			registered2,
			registered3,
			registered4,
			registered5,
			registered6,
			registered7,
			registered8,
			registered9,
			registered10,
			addr1
		] = await ethers.getSigners()

		humans = [
			registered1,
			registered2,
			registered3,
			registered4,
			registered5,
			registered6,
			registered7,
			registered8,
			registered9,
			registered10
		]

		const DummyPoH = await ethers.getContractFactory('DummyPoH')
		proofOfHumanity = await DummyPoH.deploy([
			registered1.address,
			registered2.address,
			registered3.address,
			registered4.address,
			registered5.address,
			registered6.address,
			registered7.address,
			registered8.address,
			registered9.address,
			registered10.address
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

	beforeEach(async () => {
		await deploy()
	})

	describe('Deployment', async () => {
		it('Should set PoH contract address', async () => {
			expect(await weAreHuman.proofOfHumanity()).to.equal(
				proofOfHumanity.address
			)
		})
	})

	const mint = async (minter, level) => {
		const _value = await weAreHuman.mintingDonation(level)

		const tx = await weAreHuman.connect(minter).mint(level, {value: _value})
		await tx.wait()
	}

	describe('Minting', async () => {
		describe('Reverts', async () => {
			it('Should revert if minter is not PoH registered', async () => {
				await expect(mint(addr1, 1)).to.be.revertedWith('Not human')
			})

			it('Should revert when invalid value is sent', async () => {
				await expect(
					weAreHuman
						.connect(registered1)
						.mint(1, {value: eth('0.0001')})
				).to.be.revertedWithCustomError(
					weAreHuman,
					'InvalidETHReceived'
				)
			})

			it('Should revert if level is out of bounds', async () => {
				await expect(
					mint(registered1, 0)
				).to.be.revertedWithCustomError(weAreHuman, 'LevelOutOfBounds')
				await expect(mint(registered1, 4)).to.be.reverted
			})

			it('Should revert if human has already minted', async () => {
				await mint(registered1, 1)
				await expect(mint(registered1, 1)).to.be.revertedWith(
					'Human already minted NFT'
				)
			})
		})

		describe('Correct', async () => {
			it('Should mint if is PoH registered and value is correct', async () => {
				await mint(registered1, 1)
				expect(
					await weAreHuman.balanceOf(registered1.address)
				).to.equal(1)
			})

			it('Should set some rarity', async () => {
				await mint(registered1, 1)
				const rarity = await weAreHuman.rarityOf(1)

				expect(['earth', 'moon']).to.include(rarity)
			})

			it('Should set different randomish rarities', async () => {
				const rarities = {earth: 0, moon: 0}

				for (let i = 0; i < humans.length; i++) {
					await mint(humans[i], 1)

					const rarity = await weAreHuman.rarityOf(i + 1)
					rarities[rarity]++
				}

				expect(rarities.earth).to.be.greaterThanOrEqual(1)
				expect(rarities.moon).to.be.greaterThanOrEqual(1)
			})
		})
	})
})

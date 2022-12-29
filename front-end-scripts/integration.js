const connectWalletButton = $('#connect-wallet-button')

const mintLevel0Button = $('#mint-button-0')
const mintLevel1Button = $('#mint-button-1')
const mintLevel2Button = $('#mint-button-2')
const mintLevel3Button = $('#mint-button-3')

connectWalletButton.addEventListener('click', async function () {
	await connectWallet()
})

mintLevel0Button.addEventListener('click', async function () {
	await connectWallet()
	await mint(0)
})

mintLevel1Button.addEventListener('click', async function () {
	await connectWallet()
	await mint(1)
})

mintLevel2Button.addEventListener('click', async function () {
	await connectWallet()
	await mint(2)
})

mintLevel3Button.addEventListener('click', async function () {
	await connectWallet()
	await mint(3)
})

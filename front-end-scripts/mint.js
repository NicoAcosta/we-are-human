const etherscanURL = (tx) => {
	return contractData.network.explorer + 'tx/' + tx.hash
}

const mint = async (level) => {
	const _isRegistered = await isRegistered()

	if (!_isRegistered) {
		alert(
			'Connected wallet is not a verified human. Verify yourself on Proof of Humanity!'
		)
		// throw 'Not human'
		reload()
	}

	const _alreadyMinted = await alreadyMinted()

	if (_alreadyMinted) {
		alert('You have already minted your NFT. Cannot mint twice.')
		reload()
	}

	_mint(level)
}

const _mint = async (level) => {
	let tx

	if (level == 0) {
		tx = await contract.mint(level)
	} else if (level > 0 && level < 4) {
		tx = await contract.mint(level, {value: donations.level})
	} else {
		alert('Level out of bounds')
		return 0
	}

	alert('Minting in process')

	const url = etherscanURL(tx)
	alert(
		'Waiting for transaction to be confirmed... Track it on Etherscan ' +
			url
	)

	await tx.wait()

	alert('Transaction confirmed! Check your NFT at OpenSea!')
}

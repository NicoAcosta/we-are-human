const isRegistered = async () => {
	return await contract.isRegistered(await signer.getAddress())
}

const alreadyMinted = async () => {
	return await contract.alreadyMinted(await signer.getAddress())
}

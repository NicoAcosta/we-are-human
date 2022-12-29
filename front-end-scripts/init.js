let provider
let signer
let contract
let contractWithSigner

const init = async () => {
	provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
	provider.on('network', (newNetwork, oldNetwork) => {
		// When a Provider makes its initial connection, it emits a "network"
		// event with a null oldNetwork along with the newNetwork. So, if the
		// oldNetwork exists, it represents a changing network
		if (oldNetwork) {
			reload()
		}
	})

	await checkNetwork()

	contract = new ethers.Contract(config.address, contractData.abi, provider)
}

const connectWallet = async () => {
	// request addresses
	await provider.send('eth_requestAccounts', [])

	signer = await provider.getSigner()

	contractWithSigner = await contract.connect(signer)
}

const checkNetwork = async () => {
	const currentNetwork = await provider.getNetwork()
	const expectedNetwork = config.network
	if (currentNetwork.chainId != expectedNetwork.chainIg)
		// bootstrapAlert(`Change network to ${expectedNetwork.name}`, 'danger')
		alert(`Change network to ${expectedNetwork.name}`)
}

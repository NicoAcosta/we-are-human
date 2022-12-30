require('dotenv').config()

const env = process.env
const addresses = require('../contracts-addresses.json')

module.exports = [
	addresses.goerli.proof_of_humanity,
	addresses.goerli.ubi_burner,
	env.TESTNET_VALEN,
	env.TESTNET_NICO,
	env.TESTNET_FRONT
]

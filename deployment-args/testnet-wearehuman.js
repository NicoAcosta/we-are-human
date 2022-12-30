require('dotenv').config()

const env = process.env

module.exports = [
	'0x45C41D8A4F0dd93BEbF7661671a49d659343E466',
	env.TESTNET_BURNER,
	env.TESTNET_VALEN,
	env.TESTNET_NICO,
	env.TESTNET_FRONT
]

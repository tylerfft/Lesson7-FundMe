require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

const { vars } = require("hardhat/config")

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const GANACHE_PRIVATE_KEY = vars.get("GANACHE_PRIVATE_KEY_0")
const SEPOLIA_PRIVATE_KEY_0 = vars.get("SEPOLIA_PRIVATE_KEY_0")
const ETHERSCAN_API_KEY = vars.get("SEPOLIA_ETHERSCAN_API_KEY")
const INFURA_KEY = vars.get("INFURA_KEY")

const COINMARKETCAP_API_KEY = vars.get("COINMARKETCAP_API_KEY") || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        ganache: {
            url: "http://127.0.0.1:7545",
            accounts: [GANACHE_PRIVATE_KEY],
            chainId: 1337,
            blockConfirmations: 6,
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY_0],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        gasPriceApi:
            "https://api-sepolia.etherscan.io/api?module=proxy&action=eth_gasPrice",
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    mocha: {
        timeout: 500000,
    },
}

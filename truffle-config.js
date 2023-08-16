const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config();
const {
    ETHERSCAN_API_KEY,
    HECOINFO_API_KEY,
    BSCSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    BASESCAN_API_KEY,
    MNEMONIC,
    DEPLOY_GAS_LIMIT,
    DEPLOY_GAS_PRICE,
    INFURA_ID_PROJECT
} = process.env;

const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
    plugins: ['truffle-plugin-verify', 'truffle-contract-size'],

    api_keys: {
        etherscan: ETHERSCAN_API_KEY,
        bscscan: BSCSCAN_API_KEY,
        hecoinfo: HECOINFO_API_KEY,
        polygonscan: POLYGONSCAN_API_KEY,
        basescan: BASESCAN_API_KEY
    },

    networks: {
        /* development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            gas: 30000000
        }, */
        mainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://mainnet.infura.io/v3/" + INFURA_ID_PROJECT),
            network_id: 1,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            skipDryRun: false
        },
        goerli: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://goerli.infura.io/v3/" + INFURA_ID_PROJECT),
            network_id: 5,
            confirmations: 1,
            gas: DEPLOY_GAS_LIMIT,
            skipDryRun: true
        },
        bscTestnet: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://data-seed-prebsc-2-s2.binance.org:8545"),
            network_id: 97,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        bsc: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://bsc-dataseed.binance.org"),
            network_id: 56,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            // gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        maticMainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://polygon-rpc.com/"),
            network_id: 137,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: false
        },
        maticTestnet: {
            provider: () => new HDWalletProvider(MNEMONIC, "https://rpc-mumbai.maticvigil.com"),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        hecoTestnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://http-testnet.hecochain.com'),
            network_id: 256,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true 
        },
        hecoMainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://http-mainnet.hecochain.com'),
            network_id: 128,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: false
        },
        celoMainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://forno.celo.org'),
            network_id: 42220,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: false
        },
        celoTestnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://alfajores-forno.celo-testnet.org'),
            network_id: 44787,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            networkCheckTimeout: 999999
        },
        baseMainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://mainnet.base.org'),
            network_id: 8453,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            // gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: false
        },
        baseGoerli: {
            provider: () => new HDWalletProvider(MNEMONIC, 'https://goerli.base.org'),
            network_id: 84531,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            // gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            // networkCheckTimeout: 999999
        }
    },

    compilers: {
        solc: {
            version: "0.6.12",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1
                }
            }
        }
    }
};
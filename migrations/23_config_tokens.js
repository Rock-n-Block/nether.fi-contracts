const BN = require('bn.js');

require('dotenv').config();

let {
    VAULT,
    VAULT_PRICE_FEED,
    FAST_PRICE_FEED,
    CONFIG_TOKEN,
    CONFIG_TOKEN_DECIMALS,
    CONFIG_TOKEN_WEIGHT,
    CONFIG_MIN_PROFIT_BPS,
    CONFIG_MAX_USDG_AMOUNT,
    CONFIG_STABLE,
    CONFIG_SHORTABLE,
    CONFIG_PRICE_FEED,
    CONFIG_PRICE_DECIMALS,
    CONFIG_FPF_MAX_CUMULATIVE_DELTA_DIFF,
    CONFIG_FPF_TOKEN_PRECISION,
    TOKEN_MANAGER
} = process.env;

const Vault = artifacts.require("Vault");
const VaultPriceFeed = artifacts.require("VaultPriceFeed");
const FastPriceFeed = artifacts.require("FastPriceFeed");

CONFIG_TOKEN = CONFIG_TOKEN.split(" ");
CONFIG_TOKEN_DECIMALS = CONFIG_TOKEN_DECIMALS.split(" ");
CONFIG_TOKEN_WEIGHT = CONFIG_TOKEN_WEIGHT.split(" ");
CONFIG_MIN_PROFIT_BPS = CONFIG_MIN_PROFIT_BPS.split(" ");
CONFIG_MAX_USDG_AMOUNT = CONFIG_MAX_USDG_AMOUNT.split(" ");
CONFIG_STABLE = CONFIG_STABLE.split(" ");
CONFIG_SHORTABLE = CONFIG_SHORTABLE.split(" ");
CONFIG_PRICE_FEED = CONFIG_PRICE_FEED.split(" ");
CONFIG_PRICE_DECIMALS = CONFIG_PRICE_DECIMALS.split(" ");
CONFIG_FPF_MAX_CUMULATIVE_DELTA_DIFF = CONFIG_FPF_MAX_CUMULATIVE_DELTA_DIFF.split(" ");
CONFIG_FPF_TOKEN_PRECISION = CONFIG_FPF_TOKEN_PRECISION.split(" ");

for (let i = 0; i < CONFIG_TOKEN.length; i++) {
    if (CONFIG_STABLE[i] == 0) {
        CONFIG_STABLE[i] = false;
    }
    else {
        CONFIG_STABLE[i] = true;
    }
    if (CONFIG_SHORTABLE[i] == 0) {
        CONFIG_SHORTABLE[i] = false;
    }
    else {
        CONFIG_SHORTABLE[i] = true;
    }
}

console.log(CONFIG_STABLE);
console.log(CONFIG_SHORTABLE);

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    let VaultPriceFeedInst = await VaultPriceFeed.at(VAULT_PRICE_FEED);
    for(let i = 0; i < CONFIG_TOKEN.length; i++) {
        console.log(i);
        await VaultPriceFeedInst.setTokenConfig(CONFIG_TOKEN[i], CONFIG_PRICE_FEED[i], CONFIG_PRICE_DECIMALS[i], CONFIG_STABLE[i]);
    }

    let VaultInst = await Vault.at(VAULT);
    for (let i = 0; i < CONFIG_TOKEN.length; i++) {
        console.log(i);
        await VaultInst.setTokenConfig(CONFIG_TOKEN[i], CONFIG_TOKEN_DECIMALS[i], CONFIG_TOKEN_WEIGHT[i], CONFIG_MIN_PROFIT_BPS[i], CONFIG_MAX_USDG_AMOUNT[i], CONFIG_STABLE[i], CONFIG_SHORTABLE[i]);
    }

    let FastPriceFeedInst = await FastPriceFeed.at(FAST_PRICE_FEED);
    await FastPriceFeedInst.setMaxCumulativeDeltaDiffs(CONFIG_TOKEN, CONFIG_FPF_MAX_CUMULATIVE_DELTA_DIFF);
    await FastPriceFeedInst.setTokens(CONFIG_TOKEN, CONFIG_FPF_TOKEN_PRECISION);

    await FastPriceFeedInst.setTokenManager(TOKEN_MANAGER);

    console.log("Config done");
};
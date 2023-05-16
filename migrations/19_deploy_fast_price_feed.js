const BN = require('bn.js');

require('dotenv').config();

const {
    FPF_PRICE_DURATION,
    FPF_MAX_PRICE_UPDATE_DELAY,
    FPF_MIN_BLOCK_INTERVAL,
    FPF_MAX_DEVIATION_BASIS_POINTS,
    FAST_PRICE_EVENTS,
    FPF_TOKEN_MANAGER,
    POSITION_ROUTER,
    VAULT_PRICE_FEED
} = process.env;

const FastPriceFeed = artifacts.require("FastPriceFeed");
const FastPriceEvents = artifacts.require("FastPriceEvents");
const VaultPriceFeed = artifacts.require("VaultPriceFeed");

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    await deployer.deploy(
        FastPriceFeed, FPF_PRICE_DURATION, FPF_MAX_PRICE_UPDATE_DELAY, FPF_MIN_BLOCK_INTERVAL, FPF_MAX_DEVIATION_BASIS_POINTS, FAST_PRICE_EVENTS, FPF_TOKEN_MANAGER, POSITION_ROUTER
    );

    let FastPriceFeedInst = await FastPriceFeed.deployed();

    let FastPriceEventsInst = await FastPriceEvents.at(FAST_PRICE_EVENTS);
    await FastPriceEventsInst.setIsPriceFeed(FastPriceFeedInst.address, true);

    let VaultPriceFeedInst = await VaultPriceFeed.at(VAULT_PRICE_FEED);
    await VaultPriceFeedInst.setSecondaryPriceFeed(FastPriceFeedInst.address);

    console.log("FastPriceFeed =", FastPriceFeedInst.address);
};
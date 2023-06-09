const BN = require('bn.js');

require('dotenv').config();

const {
    FPF_PRICE_DURATION,
    FPF_MAX_PRICE_UPDATE_DELAY,
    FPF_MIN_BLOCK_INTERVAL,
    FPF_MAX_DEVIATION_BASIS_POINTS,
    FPF_MAX_TIME_DEVIATION,
    FPF_MIN_AUTHORIZATIONS,
    FPF_PRICE_DATA_INTERVAL,
    FPF_SPREAD_BASIS_POINTS_IF_INACTIVE,
    FPF_SPREAD_BASIS_POINTS_IF_CHAIN_ERROR,
    FAST_PRICE_EVENTS,
    DEPLOYER,
    POSITION_ROUTER,
    VAULT_PRICE_FEED,
    GOV,
    
    BACKEND_FAST_PRICE_FEED // new
} = process.env;

const FastPriceFeed = artifacts.require("FastPriceFeed");
const FastPriceEvents = artifacts.require("FastPriceEvents");
const VaultPriceFeed = artifacts.require("VaultPriceFeed");
const PositionRouter = artifacts.require("PositionRouter");

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
        FastPriceFeed, FPF_PRICE_DURATION, FPF_MAX_PRICE_UPDATE_DELAY, FPF_MIN_BLOCK_INTERVAL, FPF_MAX_DEVIATION_BASIS_POINTS, FAST_PRICE_EVENTS, DEPLOYER, POSITION_ROUTER
    );

    let FastPriceFeedInst = await FastPriceFeed.deployed();

    await FastPriceFeedInst.setMaxTimeDeviation(FPF_MAX_TIME_DEVIATION);
    await FastPriceFeedInst.setMinAuthorizations(FPF_MIN_AUTHORIZATIONS);
    await FastPriceFeedInst.setPriceDataInterval(FPF_PRICE_DATA_INTERVAL);
    await FastPriceFeedInst.setSpreadBasisPointsIfInactive(FPF_SPREAD_BASIS_POINTS_IF_INACTIVE);
    await FastPriceFeedInst.setSpreadBasisPointsIfChainError(FPF_SPREAD_BASIS_POINTS_IF_CHAIN_ERROR);
    await FastPriceFeedInst.setVaultPriceFeed(VAULT_PRICE_FEED);
    await FastPriceFeedInst.setSigner(BACKEND_FAST_PRICE_FEED, true); // new
    await FastPriceFeedInst.setUpdater(BACKEND_FAST_PRICE_FEED, true); // new

    let FastPriceEventsInst = await FastPriceEvents.at(FAST_PRICE_EVENTS);
    await FastPriceEventsInst.setIsPriceFeed(FastPriceFeedInst.address, true);

    let VaultPriceFeedInst = await VaultPriceFeed.at(VAULT_PRICE_FEED);
    await VaultPriceFeedInst.setSecondaryPriceFeed(FastPriceFeedInst.address);

    let PositionRouterInst = await PositionRouter.at(POSITION_ROUTER);
    await PositionRouterInst.setPositionKeeper(FastPriceFeedInst.address, true);
    await PositionRouterInst.setAdmin(GOV);

    console.log("FastPriceFeed =", FastPriceFeedInst.address);
};

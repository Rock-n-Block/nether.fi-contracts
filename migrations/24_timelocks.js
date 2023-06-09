const BN = require('bn.js');

require('dotenv').config();

const {
    DEPLOYER,
    TIMELOCK_BUFFER,
    TOKEN_MANAGER,
    TIMELOCK_MINT_RECEIVER,
    NLP_MANAGER,
    REWARD_ROUTER,
    TIMELOCK_MAX_TOKEN_SUPPLY,
    TIMELOCK_MARGIN_FEE_BASIS_POINTS,
    TIMELOCK_MAX_MARGIN_FEE_BASIS_POINTS,
    GOV,
    TIMELOCK_AVERAGE_PRICE_UPDATE_DELAY,
    TIMELOCK_MAX_AVERAGE_PRICE_CHANGE,
    POSITION_MANAGER,
    POSITION_ROUTER,
    
    BACKEND_MAIN // new
} = process.env;

const Timelock = artifacts.require("Timelock");
const ShortsTrackerTimelock = artifacts.require("ShortsTrackerTimelock");

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
        Timelock, DEPLOYER, TIMELOCK_BUFFER, TOKEN_MANAGER, TIMELOCK_MINT_RECEIVER, NLP_MANAGER, REWARD_ROUTER, TIMELOCK_MAX_TOKEN_SUPPLY, TIMELOCK_MARGIN_FEE_BASIS_POINTS, TIMELOCK_MAX_MARGIN_FEE_BASIS_POINTS
    );

    let TimelockInst = await Timelock.deployed();
    await TimelockInst.setShouldToggleIsLeverageEnabled(true);
    await TimelockInst.setContractHandler(POSITION_MANAGER, true);
    await TimelockInst.setContractHandler(POSITION_ROUTER, true);
    await TimelockInst.setKeeper(BACKEND_MAIN, true); // new
    console.log("Timelock =", TimelockInst.address);
    console.log("Request token manager to set timelock admin to gov");

    await deployer.deploy(
        ShortsTrackerTimelock, GOV, TIMELOCK_BUFFER, TIMELOCK_AVERAGE_PRICE_UPDATE_DELAY, TIMELOCK_MAX_AVERAGE_PRICE_CHANGE
    );

    let ShortsTrackerTimelockInst = await ShortsTrackerTimelock.deployed();
    console.log("ShortsTrackerTimelock =", ShortsTrackerTimelockInst.address);
};

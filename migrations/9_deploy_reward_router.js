const BN = require('bn.js');

require('dotenv').config();

const {
    WETH,
    GMX,
    ESGMX,
    BNGMX,
    GLP,
    REWARD_TRACKER_sGMX,
    REWARD_TRACKER_sbGMX,
    REWARD_TRACKER_sbfGMX,
    REWARD_TRACKER_fGLP,
    REWARD_TRACKER_fsGLP,
    GLP_MANAGER,
    VESTER_GMX,
    VESTER_GLP
} = process.env;

const RewardRouterV2 = artifacts.require("RewardRouterV2");

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
        RewardRouterV2
    );

    let RewardRouterV2Inst = await RewardRouterV2.deployed();
    await RewardRouterV2Inst.initialize(WETH, GMX, ESGMX, BNGMX, GLP, REWARD_TRACKER_sGMX, REWARD_TRACKER_sbGMX, REWARD_TRACKER_sbfGMX, REWARD_TRACKER_fGLP, REWARD_TRACKER_fsGLP, GLP_MANAGER, VESTER_GMX, VESTER_GLP);
    console.log("RewardRouterV2 =", RewardRouterV2Inst.address);
};
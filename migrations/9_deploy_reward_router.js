const BN = require('bn.js');

require('dotenv').config();

const {
    WETH,
    NEFI,
    ESNEFI,
    BNNEFI,
    NLP,
    REWARD_TRACKER_sNEFI,
    REWARD_TRACKER_sbNEFI,
    REWARD_TRACKER_sbfNEFI,
    REWARD_TRACKER_fNLP,
    REWARD_TRACKER_fsNLP,
    NLP_MANAGER,
    VESTER_NEFI,
    VESTER_NLP
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
    await RewardRouterV2Inst.initialize(WETH, NEFI, ESNEFI, BNNEFI, NLP, REWARD_TRACKER_sNEFI, REWARD_TRACKER_sbNEFI, REWARD_TRACKER_sbfNEFI, REWARD_TRACKER_fNLP, REWARD_TRACKER_fsNLP, NLP_MANAGER, VESTER_NEFI, VESTER_NLP);
    console.log("RewardRouterV2 =", RewardRouterV2Inst.address);
};
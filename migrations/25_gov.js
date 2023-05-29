const BN = require('bn.js');

require('dotenv').config();

const {
    GOV,
    TIMELOCK,
    TIMELOCK_SHORTS_TRACKER,

    SHORTS_TRACKER,

    VAULT,
    USDG,
    GLP,
    GLP_MANAGER,
    ESGMX,
    BNGMX,
    REWARD_TRACKER_sGMX,
    DISTRIBUTOR_sGMX,
    REWARD_TRACKER_sbGMX,
    DISTRIBUTOR_sbGMX,
    REWARD_TRACKER_sbfGMX,
    DISTRIBUTOR_sbfGMX,
    REWARD_TRACKER_fGLP,
    DISTRIBUTOR_fGLP,
    REWARD_TRACKER_fsGLP,
    DISTRIBUTOR_fsGLP,
    VESTER_GMX,
    VESTER_GLP,
    REFERRAL_STORAGE,

    GMX,
    REWARD_ROUTER,
    VAULT_UTILS,
    VAULT_PRICE_FEED,
    ROUTER,
    ORDER_BOOK,
    POSITION_ROUTER,
    POSITION_MANAGER,
    ERROR_CONTROLLER,
    FAST_PRICE_EVENTS,
    FAST_PRICE_FEED,
    READER
} = process.env;

const Governable = artifacts.require("Governable");

let TimelockList = [VAULT, USDG, GLP, ESGMX, BNGMX, GLP_MANAGER,
    REWARD_TRACKER_sGMX, DISTRIBUTOR_sGMX,
    REWARD_TRACKER_sbGMX, DISTRIBUTOR_sbGMX,
    REWARD_TRACKER_sbfGMX, DISTRIBUTOR_sbfGMX,
    REWARD_TRACKER_fGLP, DISTRIBUTOR_fGLP,
    REWARD_TRACKER_fsGLP, DISTRIBUTOR_fsGLP,
    VESTER_GMX, VESTER_GLP,
    REFERRAL_STORAGE];

let GovList = [GMX, REWARD_ROUTER, VAULT_UTILS, VAULT_PRICE_FEED, ROUTER, ORDER_BOOK, POSITION_ROUTER, POSITION_MANAGER, ERROR_CONTROLLER, FAST_PRICE_EVENTS, FAST_PRICE_FEED, READER];

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    let GovernableInst = await Governable.at(SHORTS_TRACKER);
    await GovernableInst.setGov(TIMELOCK_SHORTS_TRACKER);

    console.log("timelock list");
    for (let i = 0; i < TimelockList.length; i++) {
        console.log(i);
        GovernableInst = await Governable.at(TimelockList[i]);
        await GovernableInst.setGov(TIMELOCK);
    }

    console.log("gov list");
    for (let i = 0; i < GovList.length; i++) {
        console.log(i);
        GovernableInst = await Governable.at(GovList[i]);
        await GovernableInst.setGov(GOV);
    }
};
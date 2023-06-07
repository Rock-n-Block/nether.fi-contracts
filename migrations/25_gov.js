const BN = require('bn.js');

require('dotenv').config();

const {
    GOV,
    TIMELOCK,
    TIMELOCK_SHORTS_TRACKER,

    SHORTS_TRACKER,

    VAULT,
    USDG,
    NLP,
    NLP_MANAGER,
    ESNEFI,
    BNNEFI,
    REWARD_TRACKER_sNEFI,
    DISTRIBUTOR_sNEFI,
    REWARD_TRACKER_sbNEFI,
    DISTRIBUTOR_sbNEFI,
    REWARD_TRACKER_sbfNEFI,
    DISTRIBUTOR_sbfNEFI,
    REWARD_TRACKER_fNLP,
    DISTRIBUTOR_fNLP,
    REWARD_TRACKER_fsNLP,
    DISTRIBUTOR_fsNLP,
    VESTER_NEFI,
    VESTER_NLP,
    REFERRAL_STORAGE,

    NEFI,
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
    READER,
    BATCH_SENDER
} = process.env;

const Governable = artifacts.require("Governable");

let TimelockList = [VAULT, USDG, NLP, ESNEFI, BNNEFI, NLP_MANAGER,
    REWARD_TRACKER_sNEFI, DISTRIBUTOR_sNEFI,
    REWARD_TRACKER_sbNEFI, DISTRIBUTOR_sbNEFI,
    REWARD_TRACKER_sbfNEFI, DISTRIBUTOR_sbfNEFI,
    REWARD_TRACKER_fNLP, DISTRIBUTOR_fNLP,
    REWARD_TRACKER_fsNLP, DISTRIBUTOR_fsNLP,
    VESTER_NEFI, VESTER_NLP,
    REFERRAL_STORAGE];

let GovList = [NEFI, REWARD_ROUTER, VAULT_UTILS, VAULT_PRICE_FEED, ROUTER, ORDER_BOOK, POSITION_ROUTER, POSITION_MANAGER, ERROR_CONTROLLER, FAST_PRICE_EVENTS, FAST_PRICE_FEED, READER, BATCH_SENDER];

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

const BN = require('bn.js');

require('dotenv').config();

const {
    BACKEND_FAST_PRICE_FEED
} = process.env;

const EventFeed = artifacts.require("EventFeed");

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
        EventFeed, BACKEND_FAST_PRICE_FEED
    );

    let EventFeedInst = await EventFeed.deployed();
    console.log("EventFeed =", EventFeedInst.address);
};
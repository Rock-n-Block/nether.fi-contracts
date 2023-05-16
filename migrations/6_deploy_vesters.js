const BN = require('bn.js');

require('dotenv').config();

const {
    GMX,
    ESGMX,
    REWARD_TRACKER_sGMX,
    REWARD_TRACKER_sbfGMX,
    REWARD_TRACKER_fsGLP,
    VESTER_VESTING_DURATION
} = process.env;

const Vester = artifacts.require("Vester");

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
        Vester, "Vested GMX", "vGMX", VESTER_VESTING_DURATION, ESGMX, REWARD_TRACKER_sbfGMX, GMX, REWARD_TRACKER_sGMX
    );

    let VesterInstOne = await Vester.deployed();
    console.log("Vester 1 =", VesterInstOne.address);

    await deployer.deploy(
        Vester, "Vested GLP", "vGLP", VESTER_VESTING_DURATION, ESGMX, REWARD_TRACKER_fsGLP, GMX, REWARD_TRACKER_fsGLP
    );

    let VesterInstTwo = await Vester.deployed();
    console.log("Vester 2 =", VesterInstTwo.address);
};
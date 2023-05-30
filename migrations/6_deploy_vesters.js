const BN = require('bn.js');

require('dotenv').config();

const {
    NEFI,
    ESNEFI,
    REWARD_TRACKER_sNEFI,
    REWARD_TRACKER_sbfNEFI,
    REWARD_TRACKER_fsNLP,
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
        Vester, "Vested NEFI", "vNEFI", VESTER_VESTING_DURATION, ESNEFI, REWARD_TRACKER_sbfNEFI, NEFI, REWARD_TRACKER_sNEFI
    );

    let VesterInstOne = await Vester.deployed();
    console.log("Vester 1 =", VesterInstOne.address);

    await deployer.deploy(
        Vester, "Vested NLP", "vNLP", VESTER_VESTING_DURATION, ESNEFI, REWARD_TRACKER_fsNLP, NEFI, REWARD_TRACKER_fsNLP
    );

    let VesterInstTwo = await Vester.deployed();
    console.log("Vester 2 =", VesterInstTwo.address);
};
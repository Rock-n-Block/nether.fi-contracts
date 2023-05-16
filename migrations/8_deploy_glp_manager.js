const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT,
    USDG,
    GLP,
    SHORTS_TRACKER,
    GLP_MANAGER_COOLDOWN_DURATION
} = process.env;

const GlpManager = artifacts.require("GlpManager");

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
        GlpManager, VAULT, USDG, GLP, SHORTS_TRACKER, GLP_MANAGER_COOLDOWN_DURATION
    );

    let GlpManagerInst = await GlpManager.deployed();
    console.log("GlpManager =", GlpManagerInst.address);
};
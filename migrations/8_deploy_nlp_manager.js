const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT,
    USDG,
    NLP,
    SHORTS_TRACKER,
    NLP_MANAGER_COOLDOWN_DURATION
} = process.env;

const NlpManager = artifacts.require("NlpManager");

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
        NlpManager, VAULT, USDG, NLP, SHORTS_TRACKER, NLP_MANAGER_COOLDOWN_DURATION
    );

    let NlpManagerInst = await NlpManager.deployed();
    console.log("NlpManager =", NlpManagerInst.address);
};
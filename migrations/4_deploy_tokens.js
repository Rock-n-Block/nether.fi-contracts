const BN = require('bn.js');

require('dotenv').config();

const {
} = process.env;

const GMX = artifacts.require("GMX");
const EsGMX = artifacts.require("EsGMX");
const BnGMX = artifacts.require("MintableBaseToken");
const GLP = artifacts.require("GLP");

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
        GMX
    );

    let GMXInst = await GMX.deployed();
    console.log("GMX =", GMXInst.address);

    await deployer.deploy(
        EsGMX
    );

    let EsGMXInst = await EsGMX.deployed();
    console.log("EsGMX =", EsGMXInst.address);

    await deployer.deploy(
        BnGMX, "Bonus GMX", "bnGMX", ZERO
    );

    let BnGMXInst = await BnGMX.deployed();
    console.log("BnGMX =", BnGMXInst.address);

    await deployer.deploy(
        GLP
    );

    let GLPInst = await GLP.deployed();
    console.log("GLP =", GLPInst.address);
};
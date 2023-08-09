const BN = require('bn.js');

require('dotenv').config();

const {
} = process.env;

const NEFI = artifacts.require("NFI");
const EsNEFI = artifacts.require("EsNFI");
const BnNEFI = artifacts.require("MintableBaseToken");
const NLP = artifacts.require("NLP");

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
        NEFI
    );

    let NEFIInst = await NEFI.deployed();
    console.log("NEFI =", NEFIInst.address);

    await deployer.deploy(
        EsNEFI
    );

    let EsNEFIInst = await EsNEFI.deployed();
    console.log("EsNEFI =", EsNEFIInst.address);

    await deployer.deploy(
        BnNEFI, "NetherFi Multiplier Points", "MP", ZERO
    );

    let BnNEFIInst = await BnNEFI.deployed();
    console.log("BnNEFI =", BnNEFIInst.address);

    await deployer.deploy(
        NLP
    );

    let NLPInst = await NLP.deployed();
    console.log("NLP =", NLPInst.address);
};
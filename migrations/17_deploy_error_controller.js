const BN = require('bn.js');

require('dotenv').config();

let {
    VAULT,
    ERRORS
} = process.env;

const VaultErrorController = artifacts.require("VaultErrorController");
const Vault = artifacts.require("Vault");

ERRORS = ERRORS.split(",");

console.log(ERRORS);
console.log(ERRORS.length);

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
        VaultErrorController
    );

    let VaultErrorControllerInst = await VaultErrorController.deployed();

    let VaultInst = await Vault.at(VAULT);
    await VaultInst.setErrorController(VaultErrorControllerInst.address);
    await VaultErrorControllerInst.setErrors(VAULT, ERRORS);
    console.log("VaultErrorController =", VaultErrorControllerInst.address);
};
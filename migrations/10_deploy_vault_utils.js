const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT
} = process.env;

const VaultUtils = artifacts.require("VaultUtils");
const Vault = artifacts.require("Vault");

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
        VaultUtils, VAULT
    );

    let VaultUtilsInst = await VaultUtils.deployed();
    let VaultInst = await Vault.at(VAULT);
    await VaultInst.setVaultUtils(VaultUtilsInst.address);
    console.log("VaultUtils =", VaultUtilsInst.address);
};
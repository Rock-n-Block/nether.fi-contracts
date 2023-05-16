const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT,
    ROUTER,
    USDG,
    VAULT_PRICE_FEED,
    VAULT_LIQUIDATION_FEE_USD,
    VAULT_FUNDING_RATE_FACTOR,
    VAULT_STABLE_FUNDING_RATE_FACTOR,
    POSITION_MANAGER,
    GLP_MANAGER,
    SHORTS_TRACKER,
    POSITION_ROUTER
} = process.env;

const Vault = artifacts.require("Vault");
const ShortsTracker = artifacts.require("ShortsTracker");

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    let VaultInst = await Vault.at(VAULT);
    await VaultInst.initialize(ROUTER, USDG, VAULT_PRICE_FEED, VAULT_LIQUIDATION_FEE_USD, VAULT_FUNDING_RATE_FACTOR, VAULT_STABLE_FUNDING_RATE_FACTOR);
    await VaultInst.setInManagerMode(true);
    await VaultInst.setInPrivateLiquidationMode(true);
    await VaultInst.setLiquidator(POSITION_MANAGER, true);
    await VaultInst.setManager(GLP_MANAGER, true);

    let ShortsTrackerInst = await ShortsTracker.at(SHORTS_TRACKER);
    await ShortsTrackerInst.setHandler(POSITION_MANAGER, true);
    await ShortsTrackerInst.setHandler(POSITION_ROUTER, true);

    console.log("Settings done");
};
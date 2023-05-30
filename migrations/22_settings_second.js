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
    NLP_MANAGER,
    SHORTS_TRACKER,
    POSITION_ROUTER,
    ORDER_BOOK,

    VAULT_TAX_BASIS_POINTS,
    VAULT_STABLE_TAX_BASIS_POINTS,
    VAULT_MINT_BURN_FEE_BASIS_POINTS,
    VAULT_SWAP_FEE_BASIS_POINTS,
    VAULT_STABLE_SWAP_FEE_BASIS_POINTS,
    VAULT_MARGIN_FEE_BASIS_POINTS,
    VAULT_MIN_PROFIT_TIME,
    VAULT_FUNDING_INTERVAL,
    VAULT_MAX_LEVERAGE
} = process.env;

let {
    VAULT_HAS_DYNAMIC_FEES
} = process.env;

console.log(VAULT_HAS_DYNAMIC_FEES);

if (VAULT_HAS_DYNAMIC_FEES == 0) {
    VAULT_HAS_DYNAMIC_FEES = false;
}
else {
    VAULT_HAS_DYNAMIC_FEES = true;
}

console.log(VAULT_HAS_DYNAMIC_FEES);

const Vault = artifacts.require("Vault");
const ShortsTracker = artifacts.require("ShortsTracker");
const Router = artifacts.require("Router");

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
    await VaultInst.setFees(VAULT_TAX_BASIS_POINTS, VAULT_STABLE_TAX_BASIS_POINTS, VAULT_MINT_BURN_FEE_BASIS_POINTS, VAULT_SWAP_FEE_BASIS_POINTS, VAULT_STABLE_SWAP_FEE_BASIS_POINTS, VAULT_MARGIN_FEE_BASIS_POINTS, VAULT_LIQUIDATION_FEE_USD, VAULT_MIN_PROFIT_TIME, VAULT_HAS_DYNAMIC_FEES);
    await VaultInst.setFundingRate(VAULT_FUNDING_INTERVAL, VAULT_FUNDING_RATE_FACTOR, VAULT_STABLE_FUNDING_RATE_FACTOR);
    await VaultInst.setMaxLeverage(VAULT_MAX_LEVERAGE);
    await VaultInst.setInManagerMode(true);
    await VaultInst.setInPrivateLiquidationMode(true);
    await VaultInst.setLiquidator(POSITION_MANAGER, true);
    await VaultInst.setManager(NLP_MANAGER, true);

    let ShortsTrackerInst = await ShortsTracker.at(SHORTS_TRACKER);
    await ShortsTrackerInst.setHandler(POSITION_MANAGER, true);
    await ShortsTrackerInst.setHandler(POSITION_ROUTER, true);
    
    let RouterInst = await Router.at(ROUTER);
    await RouterInst.addPlugin(POSITION_MANAGER);
    await RouterInst.addPlugin(POSITION_ROUTER);
    await RouterInst.addPlugin(ORDER_BOOK);

    console.log("Settings done");
};

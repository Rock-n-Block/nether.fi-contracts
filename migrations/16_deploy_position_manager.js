const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT,
    ROUTER,
    SHORTS_TRACKER,
    WETH,
    POSITION_MANAGER_DEPOSIT_FEE,
    ORDER_BOOK,
    REFERRAL_STORAGE,
    GOV,
    
    BACKEND_LIQUIDATOR, // new
    BACKEND_ORDER_KEEPER // new
} = process.env;

const PositionManager = artifacts.require("PositionManager");

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
        PositionManager, VAULT, ROUTER, SHORTS_TRACKER, WETH, POSITION_MANAGER_DEPOSIT_FEE, ORDER_BOOK
    );

    let PositionManagerInst = await PositionManager.deployed();
    await PositionManagerInst.setShouldValidateIncreaseOrder(false);
    await PositionManagerInst.setReferralStorage(REFERRAL_STORAGE);
    await PositionManagerInst.setLiquidator(BACKEND_LIQUIDATOR, true); // new
    await PositionManagerInst.setOrderKeeper(BACKEND_ORDER_KEEPER, true); // new
    await PositionManagerInst.setAdmin(GOV);
    console.log("PositionManager =", PositionManagerInst.address);
};

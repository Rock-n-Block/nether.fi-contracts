const BN = require('bn.js');

require('dotenv').config();

const {
    VAULT,
    ROUTER,
    WETH,
    SHORTS_TRACKER,
    POSITION_ROUTER_DEPOSIT_FEE,
    POSITION_ROUTER_MIN_EXECUTION_FEE
} = process.env;

const PositionRouter = artifacts.require("PositionRouter");

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
        PositionRouter, VAULT, ROUTER, WETH, SHORTS_TRACKER, POSITION_ROUTER_DEPOSIT_FEE, POSITION_ROUTER_MIN_EXECUTION_FEE
    );

    let PositionRouterInst = await PositionRouter.deployed();
    await PositionRouterInst.setDelayValues(0, 180, 1800);
    console.log("PositionRouter =", PositionRouterInst.address);
};
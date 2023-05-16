const BN = require('bn.js');

require('dotenv').config();

const {
    ROUTER,
    VAULT,
    WETH,
    USDG,
    ORDER_BOOK_MIN_EXECUTION_FEE,
    ORDER_BOOK_MIN_PURCHASE_TOKEN_AMOUNT_USD
} = process.env;

const OrderBook = artifacts.require("OrderBook");

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
        OrderBook
    );

    let OrderBookInst = await OrderBook.deployed();
    await OrderBookInst.initialize(ROUTER, VAULT, WETH, USDG, ORDER_BOOK_MIN_EXECUTION_FEE, ORDER_BOOK_MIN_PURCHASE_TOKEN_AMOUNT_USD);
    console.log("OrderBook =", OrderBookInst.address);
};
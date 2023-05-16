const BN = require('bn.js');

require('dotenv').config();

const {
} = process.env;

const Reader = artifacts.require("Reader");
const OrderBookReader = artifacts.require("OrderBookReader");
const ReferralReader = artifacts.require("ReferralReader");
const RewardReader = artifacts.require("RewardReader");
const BatchSender = artifacts.require("BatchSender");

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
        Reader
    );

    let ReaderInst = await Reader.deployed();
    console.log("Reader =", ReaderInst.address);

    await deployer.deploy(
        OrderBookReader
    );

    let OrderBookReaderInst = await OrderBookReader.deployed();
    console.log("OrderBookReader =", OrderBookReaderInst.address);

    await deployer.deploy(
        ReferralReader
    );

    let ReferralReaderInst = await ReferralReader.deployed();
    console.log("ReferralReader =", ReferralReaderInst.address);

    await deployer.deploy(
        RewardReader
    );

    let RewardReaderInst = await RewardReader.deployed();
    console.log("RewardReader =", RewardReaderInst.address);

    await deployer.deploy(
        BatchSender
    );

    let BatchSenderInst = await BatchSender.deployed();
    console.log("BatchSender =", BatchSenderInst.address);
};
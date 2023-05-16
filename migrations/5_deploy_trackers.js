const BN = require('bn.js');

require('dotenv').config();

const {
    GMX,
    ESGMX,
    BNGMX,
    GLP,
    WETH
} = process.env;

const RewardTracker = artifacts.require("RewardTracker");
const RewardDistributor = artifacts.require("RewardDistributor");

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    //sGMX: gmx, esgmx
    //sbGMX: sGMX
    //sbfGMX: sbGMX, bnGMX
    //fGLP: GLP
    //fsGLP: fGLP

    await deployer.deploy(
        RewardTracker, "Staked GMX", "sGMX"
    );

    let RewardTrackerInstOne = await RewardTracker.deployed();
    console.log("RewardTracker 1 =", RewardTrackerInstOne.address);

    await deployer.deploy(
        RewardDistributor, ESGMX, RewardTrackerInstOne.address
    );

    let RewardDistributorInstOne = await RewardDistributor.deployed();
    console.log("RewardDistributor 1 =", RewardDistributorInstOne.address);

    await RewardTrackerInstOne.initialize([GMX, ESGMX], RewardDistributorInstOne.address);

    //SECOND
    await deployer.deploy(
        RewardTracker, "Staked + Bonus GMX", "sbGMX"
    );

    let RewardTrackerInstTwo = await RewardTracker.deployed();
    console.log("RewardTracker 2 =", RewardTrackerInstTwo.address);

    await deployer.deploy(
        RewardDistributor, BNGMX, RewardTrackerInstTwo.address
    );

    let RewardDistributorInstTwo = await RewardDistributor.deployed();
    console.log("RewardDistributor 2 =", RewardDistributorInstTwo.address);

    await RewardTrackerInstTwo.initialize([RewardTrackerInstOne.address], RewardDistributorInstTwo.address);

    //THIRD
    await deployer.deploy(
        RewardTracker, "Staked + Bonus + Fee GMX", "sbfGMX"
    );

    let RewardTrackerInstThree = await RewardTracker.deployed();
    console.log("RewardTracker 3 =", RewardTrackerInstThree.address);

    await deployer.deploy(
        RewardDistributor, WETH, RewardTrackerInstThree.address
    );

    let RewardDistributorInstThree = await RewardDistributor.deployed();
    console.log("RewardDistributor 3 =", RewardDistributorInstThree.address);

    await RewardTrackerInstThree.initialize([RewardTrackerInstTwo.address, BNGMX], RewardDistributorInstThree.address);

    //FOURTH
    await deployer.deploy(
        RewardTracker, "Fee GLP", "fGLP"
    );

    let RewardTrackerInstFour = await RewardTracker.deployed();
    console.log("RewardTracker 4 =", RewardTrackerInstFour.address);

    await deployer.deploy(
        RewardDistributor, WETH, RewardTrackerInstFour.address
    );

    let RewardDistributorInstFour = await RewardDistributor.deployed();
    console.log("RewardDistributor 4 =", RewardDistributorInstFour.address);

    await RewardTrackerInstFour.initialize([GLP], RewardDistributorInstFour.address);

    //FIFTH
    await deployer.deploy(
        RewardTracker, "Fee + Staked GLP", "fsGLP"
    );

    let RewardTrackerInstFive = await RewardTracker.deployed();
    console.log("RewardTracker 5 =", RewardTrackerInstFive.address);

    await deployer.deploy(
        RewardDistributor, ESGMX, RewardTrackerInstFive.address
    );

    let RewardDistributorInstFive = await RewardDistributor.deployed();
    console.log("RewardDistributor 5 =", RewardDistributorInstFive.address);

    await RewardTrackerInstFive.initialize([RewardTrackerInstFour.address], RewardDistributorInstFive.address);
};
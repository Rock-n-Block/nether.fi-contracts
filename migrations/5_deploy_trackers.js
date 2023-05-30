const BN = require('bn.js');

require('dotenv').config();

const {
    NEFI,
    ESNEFI,
    BNNEFI,
    NLP,
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

    //sNEFI: NEFI, esNEFI
    //sbNEFI: sNEFI
    //sbfNEFI: sbNEFI, bnNEFI
    //fNLP: NLP
    //fsNLP: fNLP

    await deployer.deploy(
        RewardTracker, "Staked NEFI", "sNEFI"
    );

    let RewardTrackerInstOne = await RewardTracker.deployed();
    console.log("RewardTracker 1 =", RewardTrackerInstOne.address);

    await deployer.deploy(
        RewardDistributor, ESNEFI, RewardTrackerInstOne.address
    );

    let RewardDistributorInstOne = await RewardDistributor.deployed();
    console.log("RewardDistributor 1 =", RewardDistributorInstOne.address);

    await RewardTrackerInstOne.initialize([NEFI, ESNEFI], RewardDistributorInstOne.address);

    //SECOND
    await deployer.deploy(
        RewardTracker, "Staked + Bonus NEFI", "sbNEFI"
    );

    let RewardTrackerInstTwo = await RewardTracker.deployed();
    console.log("RewardTracker 2 =", RewardTrackerInstTwo.address);

    await deployer.deploy(
        RewardDistributor, BNNEFI, RewardTrackerInstTwo.address
    );

    let RewardDistributorInstTwo = await RewardDistributor.deployed();
    console.log("RewardDistributor 2 =", RewardDistributorInstTwo.address);

    await RewardTrackerInstTwo.initialize([RewardTrackerInstOne.address], RewardDistributorInstTwo.address);

    //THIRD
    await deployer.deploy(
        RewardTracker, "Staked + Bonus + Fee NEFI", "sbfNEFI"
    );

    let RewardTrackerInstThree = await RewardTracker.deployed();
    console.log("RewardTracker 3 =", RewardTrackerInstThree.address);

    await deployer.deploy(
        RewardDistributor, WETH, RewardTrackerInstThree.address
    );

    let RewardDistributorInstThree = await RewardDistributor.deployed();
    console.log("RewardDistributor 3 =", RewardDistributorInstThree.address);

    await RewardTrackerInstThree.initialize([RewardTrackerInstTwo.address, BNNEFI], RewardDistributorInstThree.address);

    //FOURTH
    await deployer.deploy(
        RewardTracker, "Fee NLP", "fNLP"
    );

    let RewardTrackerInstFour = await RewardTracker.deployed();
    console.log("RewardTracker 4 =", RewardTrackerInstFour.address);

    await deployer.deploy(
        RewardDistributor, WETH, RewardTrackerInstFour.address
    );

    let RewardDistributorInstFour = await RewardDistributor.deployed();
    console.log("RewardDistributor 4 =", RewardDistributorInstFour.address);

    await RewardTrackerInstFour.initialize([NLP], RewardDistributorInstFour.address);

    //FIFTH
    await deployer.deploy(
        RewardTracker, "Fee + Staked NLP", "fsNLP"
    );

    let RewardTrackerInstFive = await RewardTracker.deployed();
    console.log("RewardTracker 5 =", RewardTrackerInstFive.address);

    await deployer.deploy(
        RewardDistributor, ESNEFI, RewardTrackerInstFive.address
    );

    let RewardDistributorInstFive = await RewardDistributor.deployed();
    console.log("RewardDistributor 5 =", RewardDistributorInstFive.address);

    await RewardTrackerInstFive.initialize([RewardTrackerInstFour.address], RewardDistributorInstFive.address);
};
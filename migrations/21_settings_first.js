const BN = require('bn.js');

require('dotenv').config();

const {
    USDG,
    GMX,
    ESGMX,
    BNGMX,
    GLP,
    REWARD_TRACKER_sGMX,
    REWARD_TRACKER_sbGMX,
    REWARD_TRACKER_sbfGMX,
    REWARD_TRACKER_fGLP,
    REWARD_TRACKER_fsGLP,
    GLP_MANAGER,
    VESTER_GMX,
    VESTER_GLP,
    REWARD_ROUTER
} = process.env;

const USDGCode = artifacts.require("USDG");
const GMXCode = artifacts.require("GMX");
const EsGMX = artifacts.require("EsGMX");
const BnGMX = artifacts.require("MintableBaseToken");
const GLPCode = artifacts.require("GLP");
const RewardTracker = artifacts.require("RewardTracker");
const Vester = artifacts.require("Vester");
const GlpManager = artifacts.require("GlpManager");

const debug = "true";

const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

module.exports = async function (deployer, network) {
    if (network == "test" || network == "development")
        return;

    let USDGInst = await USDGCode.at(USDG);
    await USDGInst.addVault(GLP_MANAGER);

    let GMXInst = await GMXCode.at(GMX);
    await GMXInst.setHandler(REWARD_TRACKER_sGMX, true);

    let EsGMXInst = await EsGMX.at(ESGMX);
    await EsGMXInst.setInPrivateTransferMode(true);
    await EsGMXInst.setHandler(REWARD_TRACKER_sGMX, true);
    await EsGMXInst.setHandler(VESTER_GMX, true);
    await EsGMXInst.setHandler(VESTER_GLP, true);

    let BnGMXInst = await BnGMX.at(BNGMX);
    await BnGMXInst.setHandler(REWARD_TRACKER_sbfGMX, true);

    let GLPInst = await GLPCode.at(GLP);
    await GLPInst.setInPrivateTransferMode(true);
    await GLPInst.setMinter(GLP_MANAGER, true);
    await GLPInst.setHandler(REWARD_TRACKER_fGLP, true);

    let sGMX = await RewardTracker.at(REWARD_TRACKER_sGMX);
    await sGMX.setInPrivateTransferMode(true);
    await sGMX.setInPrivateStakingMode(true);
    await sGMX.setHandler(REWARD_ROUTER, true);
    await sGMX.setHandler(REWARD_TRACKER_sbGMX, true);

    let sbGMX = await RewardTracker.at(REWARD_TRACKER_sbGMX);
    await sbGMX.setInPrivateTransferMode(true);
    await sbGMX.setInPrivateStakingMode(true);
    await sbGMX.setInPrivateClaimingMode(true);
    await sbGMX.setHandler(REWARD_ROUTER, true);
    await sbGMX.setHandler(REWARD_TRACKER_sbfGMX, true);

    let sbfGMX = await RewardTracker.at(REWARD_TRACKER_sbfGMX);
    await sbfGMX.setInPrivateTransferMode(true);
    await sbfGMX.setInPrivateStakingMode(true);
    await sbfGMX.setHandler(REWARD_ROUTER, true);
    await sbfGMX.setHandler(VESTER_GMX, true);

    let fGLP = await RewardTracker.at(REWARD_TRACKER_fGLP);
    await fGLP.setInPrivateTransferMode(true);
    await fGLP.setInPrivateStakingMode(true);
    await fGLP.setHandler(REWARD_ROUTER, true);
    await fGLP.setHandler(REWARD_TRACKER_fsGLP, true);

    let fsGLP = await RewardTracker.at(REWARD_TRACKER_fsGLP);
    await fsGLP.setInPrivateTransferMode(true);
    await fsGLP.setInPrivateStakingMode(true);
    await fsGLP.setHandler(REWARD_ROUTER, true);
    await fsGLP.setHandler(VESTER_GLP, true);

    let VesterGmx = await Vester.at(VESTER_GMX);
    await VesterGmx.setHandler(REWARD_ROUTER, true);
    let VesterGlp = await Vester.at(VESTER_GLP);
    await VesterGlp.setHandler(REWARD_ROUTER, true);

    let GlpManagerInst = await GlpManager.at(GLP_MANAGER);
    await GlpManagerInst.setInPrivateMode(true);
    await GlpManagerInst.setHandler(REWARD_ROUTER, true);

    console.log("Settings done");
};
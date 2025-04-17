import { HardhatRuntimeEnvironment } from "hardhat/types";
import hre from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import {
  MINIMUM_WALLET_VALIDATORS_WALLET,
  MAXIMUM_WALLET_VALIDATORS_WALLET,
} from "../config";

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  console.log(await hre.artifacts.getArtifactPaths());
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  
  const args = [
    MINIMUM_WALLET_VALIDATORS_WALLET,
    MAXIMUM_WALLET_VALIDATORS_WALLET,
  ];

  console.log("Deploying PaymentGateway.sol....");

  await deploy("PaymentGateway", {
    args,
    log: true,
    from: deployer,
    waitConfirmations: 1,
  });

  console.log("Deployin PaymentGateway.sol deployed....");
};
export default func;
func.tags = ["all", "paymentGateway"];

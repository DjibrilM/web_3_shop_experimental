import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "typechain";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
  },
  paths: {
    sources: "./contracts",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;

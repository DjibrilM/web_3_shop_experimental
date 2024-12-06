import { ethers } from "ethers";

//This file contains all ethers utilitity functions
export const isAddress = (address: string) => ethers.isAddress(address);
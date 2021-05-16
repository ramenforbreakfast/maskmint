import { ethers } from "ethers";
import MaskMint from "./MaskMint.json";
import { config } from "../config/app";

export async function getDeployedContracts(signer: any, provider: any) {
    const { hashmaskAddress } = config;
    const maskmintContract = new ethers.Contract(hashmaskAddress, MaskMint.abi, signer);
    const numberOfContracts = await maskmintContract.getNumberOfDeployedContracts();
    const deployedContracts = [];
    for (let i = 0; i < numberOfContracts; i++) {
        deployedContracts.push(await maskmintContract.getContractAtIndex(i))
    }
    return Promise.resolve(deployedContracts);
}
import { ethers } from "ethers";
import MaskMint from "./MaskMint.json";
import { config } from "../config/app";

export async function getDeployedContracts(signer: any) {
    const maskmintContract = new ethers.Contract(config.maskmintAddress, MaskMint.abi, signer);
    const numberOfContracts = await maskmintContract.getNumberOfDeployedContracts();
    const deployedContracts = [];

    for (let i = 0; i < numberOfContracts; i++) {
        deployedContracts.push(await maskmintContract.getContractAtIndex(i))
    };

    return deployedContracts;
}
import { ethers } from "ethers";
import Masks from "./Masks.json";
import { config } from "../config/app";

export async function getOwnedMasks(signer: any) {
    const walletAddress = await signer.getAddress();
    const masksContract = new ethers.Contract(config.hashmaskAddress, Masks.abi, signer);
    const balance = await masksContract.balanceOf(walletAddress);
    const maskIds = [];

    for (let i = 0; i < balance; i++) {
        maskIds.push(Number(await masksContract.tokenOfOwnerByIndex(walletAddress, i)))
    }

    return Promise.resolve(maskIds);
}
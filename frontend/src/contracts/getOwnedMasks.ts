import { ethers } from "ethers";
import IERC721Enumerable from "./IERC721Enumerable.json";
import { config } from "../config/app";

export async function getOwnedMasks(signer: any, provider: any) {
    const { hashmaskAddress } = config;
    const walletAddress = await signer.getAddress();
    const masksContract = new ethers.Contract(hashmaskAddress, IERC721Enumerable.abi, signer);
    const balance = await masksContract.balanceOf(walletAddress);
    const maskIds = [];
    for (let i = 0; i < balance; i++) {
        maskIds.push(await masksContract.tokenOfOwnerByIndex(walletAddress, i))
    }
    return Promise.resolve(maskIds);
}
import { ethers } from "ethers";
import Masks from "./Masks.json";
import { config } from "../config/app";

export async function getMaskName(signer: any, maskID: number) {
    const maskContract = new ethers.Contract(config.hashmaskAddress, Masks.abi, signer);
    const [
        maskName
    ] = await Promise.all([
        maskContract.tokenNameByIndex(maskID)
    ]);

    return {
        maskName
    };
}
import { ethers } from "ethers"
import { config } from "../config/app"
import MaskMint from "./MaskMint.json";

export async function deployToken(
    monitorTx: (hash: string) => Promise<any>,
    signer: any,
    name: string,
    symbol: string,
    maskID: number
) {
    const mintContract = new ethers.Contract(config.maskmintAddress, MaskMint.abi, signer);
    const deployTx = await mintContract.deployToken(name, symbol, maskID);
    monitorTx(deployTx.hash);
    console.log("deploy function called in", deployTx?.hash);
    await deployTx.wait();
}
import { ethers } from "ethers"
import { config } from "../config/app"
import MaskToken from "./MaskToken.json";
import NameChangeToken from "./NameChangeToken.json"

export async function approveAndMint(
    monitorTx: (hash: string) => Promise<any>,
    signer: any,
    tokenAddress: string,
    amt: string
) {
    const nctContract = new ethers.Contract(config.nctAddress, NameChangeToken.abi, signer);
    const parsedArg = ethers.utils.parseEther(amt);
    const approvalTx = await nctContract.approve(tokenAddress, parsedArg);
    monitorTx(approvalTx.hash);
    console.log("NCT approval called in", approvalTx?.hash);
    await approvalTx.wait();
    const tokenContract = new ethers.Contract(tokenAddress, MaskToken.abi, signer);
    const mintTx = await tokenContract.mint(parsedArg);
    monitorTx(mintTx.hash);
    console.log("mint function called in", mintTx?.hash);
    await mintTx.wait();
}
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import MaskToken from "./MaskToken.json";

export async function getTokenData(signer: any, tokenAddress: string) {
    const walletAddress = await signer.getAddress();
    const tokenContract = new ethers.Contract(tokenAddress, MaskToken.abi, signer);
    console.log("Entered getTokenData");
    const [
        symbol,
        name,
        maskID,
        balance
    ] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.name(),
        tokenContract.maskID(),
        tokenContract.balanceOf(walletAddress)
    ]);

    return {
        symbol,
        name,
        maskID: Number(maskID),
        balance: formatUnits(balance)
    };
}
import { Network } from "../types";

type Config = {
    networkId: Network;
    hashmaskAddress: string;
    nctAddress: string;
    maskmintAddress: string;
    rpcUrl: string;
    dappId: undefined | string;
    appName?: string;
};

export const config: Config =
{
    networkId: Network.ROPSTEN,
    hashmaskAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    nctAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    maskmintAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    rpcUrl: "http://127.0.0.1:8545",
    dappId: "aa4df3d2-2ef5-4bb6-a813-3b8438a09d19"
};
//networkId: Network.HARDHAT,
//hashmaskAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
//nctAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//maskmintAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
//rpcUrl: "http://127.0.0.1:8545",
//dappId: "aa4df3d2-2ef5-4bb6-a813-3b8438a09d19"
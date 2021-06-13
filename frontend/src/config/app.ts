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

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const BLOCKNATIVE_KEY = process.env.BLOCKNATIVE_KEY;

export const config: Config =
{
    networkId: Network.MAINNET,
    hashmaskAddress: "0xC2C747E0F7004F9E8817Db2ca4997657a7746928",
    nctAddress: "0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E",
    maskmintAddress: "0x27AF8A2B6FB0925e45a262809C75558D6525b10d",
    rpcUrl: "https://eth-ropsten.alchemyapi.io/v2/" + ALCHEMY_KEY,
    dappId: "0345c98f-1710-4ef9-bc57-94e92d42610e"
};
/*
{
    networkId: Network.ROPSTEN,
    hashmaskAddress: "0x008c8647b050cDc0771EcD08fA31C156Af2Da100",
    nctAddress: "0x27AF8A2B6FB0925e45a262809C75558D6525b10d",
    maskmintAddress: "0x662B8c706a748eD7AC982dD0E00F7260F09D2822",
    rpcUrl: "https://eth-ropsten.alchemyapi.io/v2/" + ALCHEMY_KEY,
    dappId: "aa4df3d2-2ef5-4bb6-a813-3b8438a09d19"
};
*/
/*
{
    networkId: Network.HARDHAT,
    hashmaskAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    nctAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    maskmintAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    rpcUrl: "http://127.0.0.1:8545",
    dappId: "aa4df3d2-2ef5-4bb6-a813-3b8438a09d19"
}
*/
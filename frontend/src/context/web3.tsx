import React, { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider as Web3ProviderType } from "../types";
import { initNotify, initOnboard } from "../services/walletServices";
import { getOwnedMasks } from "../contracts/getOwnedMasks";

const Web3Context = React.createContext<{
    web3: Web3ProviderType;
    address: null | string;
    onboard: any;
    wallet: any;
    readyToTransact: () => Promise<boolean>;
    provider: any;
    signer: any;
    monitorTx: (hash: string) => Promise<void>;
    reloadWallet: () => Promise<any>;
    masks: number[];
    deployed: string[];
    network: any;
}>({
    web3: null,
    onboard: null,
    wallet: null,
    address: null,
    readyToTransact: async () => false,
    provider: null,
    signer: null,
    monitorTx: async () => undefined,
    reloadWallet: async () => undefined,
    masks: [],
    deployed: [],
    network: null,
});

const Web3Provider: React.FC = (props) => {
    const [web3, setWeb3] = useState<Web3ProviderType>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [provider, setProvider] = useState<any>(null);
    const [network, setNetwork] = useState<any>(null);
    const [etherBalance, setEtherBalance] = useState<any>(null);
    const [signer, setSigner] = useState<any>();
    const [wallet, setWallet] = useState<any>({});
    const [masks, setMasks] = useState<number[]>([]);
    const [deployed, setDeployed] = useState<string[]>([]);
    const [onboard, setOnboard] = useState<ReturnType<typeof initOnboard>>(
        null as any
    );
    const [notify, setNotify] = useState<any>(null);

    const updateWallet = useCallback(
        (wallet: any) => {
            console.log("updating wallet");
            setWallet(wallet);
            const ethersProvider = new ethers.providers.Web3Provider(wallet.provider);
            let signer = ethersProvider.getSigner();
            setProvider(ethersProvider);
            setSigner(signer);
            window.localStorage.setItem("selectedWallet", wallet.name);
            getOwnedMasks(signer)
                .then((ownedMasks) => {
                    setMasks(ownedMasks)
                    console.log("Updating ownedMasks: ", ownedMasks)
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []
    );

    useEffect(() => {
        getOwnedMasks(signer)
            .then((ownedMasks) => {
                setMasks(ownedMasks)
                console.log("Updating ownedMasks: ", ownedMasks)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [signer, address]);

    useEffect(() => {
        const onboard = initOnboard({
            address: setAddress,
            network: setNetwork,
            balance: setEtherBalance,
            wallet: (wallet: any) => {
                if (wallet?.provider?.selectedAddress) {
                    updateWallet(wallet);
                } else {
                    setProvider(null);
                    setWallet({});
                }
            },
        });

        setOnboard(onboard);
        setNotify(initNotify());
    }, [updateWallet]);

    useEffect(() => {
        const previouslySelectedWallet = window.localStorage.getItem(
            "selectedWallet"
        );

        if (previouslySelectedWallet && onboard) {
            onboard.walletSelect(previouslySelectedWallet);
        }
    }, [onboard]);

    async function readyToTransact(): Promise<boolean> {
        if (!provider) {
            const walletSelected = await onboard.walletSelect();
            if (!walletSelected) return false;
        }

        const ready = await onboard.walletCheck();
        if (ready && !provider) {
            updateWallet(onboard.getState().wallet);
        }
        return ready;
    }

    function reloadWallet() {
        return new Promise((resolve) => resolve(updateWallet(wallet)));
    }

    async function monitorTx(hash: string) {
        const { emitter } = notify.hash(hash);
        const networkName = network === 1 ? "mainnet" : "ropsten";
        interface Transaction {
            hash: string;
        }
        emitter.on("txPool", (transaction: Transaction) => {
            return {
                message: `Your transaction is pending, click <a href="https://${networkName}.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
                // onclick: () =>
                //   window.open(`https://mainnet.etherscan.io/tx/${transaction.hash}`)
            };
        });

        emitter.on("txSent", console.log);
        emitter.on("txConfirmed", console.log);
        emitter.on("txSpeedUp", console.log);
        emitter.on("txCancel", console.log);
        emitter.on("txFailed", console.log);
    }

    return (
        <Web3Context.Provider
            value={{
                address,
                onboard,
                web3,
                wallet,
                readyToTransact,
                signer,
                provider,
                monitorTx,
                reloadWallet,
                masks,
                deployed,
                network,
            }}
        >
            {props.children}
        </Web3Context.Provider>
    );
};

export { Web3Provider };

export default Web3Context;
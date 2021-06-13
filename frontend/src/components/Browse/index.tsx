import React, { useContext, useEffect, useState } from 'react'
import { MaskCard } from '../MaskCard'
import Web3Context from '../../context/web3';
import { getTokenData } from "../../contracts/getTokenData"
import { getDeployedContracts } from '../../contracts/getDeployedContracts';
import { getMaskName } from '../../contracts/getMaskName';

type CardData = {
    tokenSym: string;
    tokenName: string;
    tokenBal: string
    tokenAddr: string;
    maskName: string;
    maskID: number;
};

export function Browse() {
    const { signer } = useContext(Web3Context);
    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
        const getCardData = async () => {
            const deployedContracts = await getDeployedContracts(signer);
            let dataForDeployed: Array<CardData> = [];
            let i, tokenQuery, maskQuery;
            for (i = 0; i < deployedContracts.length; i++) {
                tokenQuery = await getTokenData(signer, deployedContracts[i]);
                maskQuery = await getMaskName(signer, tokenQuery.maskID);
                dataForDeployed.push({
                    tokenSym: tokenQuery.symbol,
                    tokenName: tokenQuery.name,
                    tokenBal: tokenQuery.balance,
                    tokenAddr: deployedContracts[i],
                    maskName: maskQuery.maskName,
                    maskID: tokenQuery.maskID
                })
            }
            setCardData(dataForDeployed);
        }

        getCardData().then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    }, [signer]);


    return (
        <div className="flex flex-row flex-wrap p-4 justify-center">
            {cardData.length > 0
                ?
                cardData.map((mask, index) => {
                    const cardKey = "browse" + mask.maskID;
                    return <MaskCard key={cardKey} tokenSym={mask.tokenSym} tokenName={mask.tokenName} tokenBal={mask.tokenBal} tokenAddr={mask.tokenAddr} maskName={mask.maskName} maskID={mask.maskID} ></MaskCard>
                })
                :
                <h1 className="text-gray-500 font-mono text-3xl">
                    No Deployed Tokens Found, Have You Connected A Wallet?
                </h1>
            }
        </div >
    )
}
import React, { useContext, useEffect, useState } from 'react'
import { EditCard } from '../EditCard'
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

export default function Manage() {
    const { signer, masks } = useContext(Web3Context);
    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
        const getCardData = async () => {
            const deployedContracts = await getDeployedContracts(signer);
            let dataForManage: Array<CardData> = [];
            let i, tokenQuery, maskQuery;
            for (i = 0; i < deployedContracts.length; i++) {
                tokenQuery = await getTokenData(signer, deployedContracts[i]);
                if (masks.includes(tokenQuery.maskID)) {
                    maskQuery = await getMaskName(signer, tokenQuery.maskID);
                    dataForManage.push({
                        tokenSym: tokenQuery.symbol,
                        tokenName: tokenQuery.name,
                        tokenBal: tokenQuery.balance,
                        tokenAddr: deployedContracts[i],
                        maskName: maskQuery.maskName,
                        maskID: tokenQuery.maskID
                    })
                }
            }
            setCardData(dataForManage);
        }
        getCardData().then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    }, [signer, masks]);

    return (
        <div className="flex flex-col items-center">
            {cardData.map((mask, index) => {
                const cardKey = "manage" + mask.maskID;
                return <EditCard key={cardKey} tokenSym={mask.tokenSym} tokenName={mask.tokenName} tokenBal={mask.tokenBal} tokenAddr={mask.tokenAddr} maskName={mask.maskName} maskID={mask.maskID} ></EditCard>
            })}
        </div >
    )
}
import * as React from 'react'
import { EditCard } from '../EditCard'
import { AccountMaskProps } from '../Browse'

export default function Manage({ masks }: AccountMaskProps) {
    return (
        <div className="flex flex-col items-center">
            {masks.map((mask, index) => {
                return <EditCard tokenSym={mask.tokenSym} tokenName={mask.tokenName} maskName={mask.maskName} maskID={mask.maskID} ></EditCard>
            })}
        </div >
    )
}
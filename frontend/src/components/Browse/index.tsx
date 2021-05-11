import * as React from 'react'
import { TokenProps, MaskCard } from '../MaskCard'

export type AccountMaskProps = {
    masks: Array<TokenProps>
}

export function Browse({ masks }: AccountMaskProps) {
    return (
        <div className="flex flex-row flex-wrap p-4 justify-center">
            {masks.map((mask, index) => {
                return <MaskCard tokenSym={mask.tokenSym} tokenName={mask.tokenName} maskName={mask.maskName} maskID={mask.maskID} ></MaskCard>
            })}
        </div >
    )
}
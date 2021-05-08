import * as React from 'react'

interface Props {
    children: React.ReactNode
}

export default function MobileContainer(props: Props) {
    const { children } = props
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {children}
        </div>
    )
}
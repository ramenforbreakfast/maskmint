import React from 'react'
import Header from '../Header'
import NavBar from '../NavBar'

interface Props {
    children: React.ReactNode
}

export default function Page(props: Props) {
    const { children } = props
    return (
        <div className="flex flex-col">
            <Header />
            <NavBar />
            {children}
        </div>
    )
}
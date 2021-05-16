import React from 'react'
import Header from '../Header'
import NavBar from '../NavBar'
import Footer from '../Footer'
interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children, ...walletProps }: PageProps) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <NavBar />
            <div className="bg-gray-200 flex-1 overflow-y-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from './Sidebar'
import { useRouter } from 'next/dist/client/router'

// import * as layout from '../styles/components/Layout.module.css'

const Layout = ({children}) => {
    const { pathname } = useRouter()

    // Hides Sidebar if the current route shouldn't have it like the login or register pages
    const authRoutes = ['/login','/register','/']
    const hideSidebar = authRoutes.includes(pathname)


    return (
        <div>
            <Head>
                <title>Curator</title>
                <meta name="description" content="Content Curation App" />
                <link rel="icon" href="/favicon.ico" />
                <base target="_blank"></base>
             </Head>
            <NavBar />
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col ">
                    {children}
                    <Footer />
                </div>
                {/* <div className="relative">
                    { !hideSidebar && <Sidebar />}
                </div> */}
            </div>
        </div>
    )
}

export default Layout

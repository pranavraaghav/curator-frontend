import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Head from 'next/head'
import { useState } from 'react'

import Footer from './Footer'
import NavBar from './NavBar'
import Sidebar from './Sidebar'

// import * as layout from '../styles/components/Layout.module.css'

const Layout = ({children}) => {
    const { pathname } = useRouter()

    const [sidebarActive, setSidebarActive] = useState(true)

    const toggleSidebar = () => {setSidebarActive(!sidebarActive)}

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
            <NavBar hideSidebar={hideSidebar} toggleSidebar={toggleSidebar} sidebarActive={sidebarActive}/>
            <div className="frc">
                <div className="flex flex-col w-full">
                    {children}
                    <Footer />
                </div>
                { !hideSidebar && <Sidebar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive}/>}
            </div>
        </div>
    )
}

export default Layout

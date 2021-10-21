import React from 'react'
import Head from 'next/dist/shared/lib/head'

export default function Register() {
    return (
        <>
        <Head>
            <title>Register</title>
        </Head>
        <div className="flex flex-col items-center justify-center">
            <div className="p-10 text-white rounded bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
                <h1 className="text-5xl font-noto-serif">An Exquistely Crafted Sign Up Page</h1>
            </div>
        </div>
        </>
    )
}

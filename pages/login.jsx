import React from 'react'
import Head from 'next/dist/shared/lib/head'

export default function Login() {
    return (
        <>
        <Head>
            <title>Register</title>
        </Head>
        <div className="flex flex-col items-center justify-center">
            <div className="p-10 text-white rounded bg-gradient-to-br from-purple-600 via-blue-500 to-green-400">
                <h1 className="text-5xl font-noto-serif">An Adequately Made Login Page</h1>
            </div>
        </div>
        </>
    )
}

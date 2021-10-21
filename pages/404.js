import React from 'react'
import Link from 'next/link'

export default function NotFound() {


    return (
        <div className="flex flex-col justify-around items-center">
            <h1 className="font-bold text-2xl">Welcome to the 404 Deadend!</h1>
            <h2>Sadly there's nothing here :'(</h2>
            <p className="underline hover:text-red-700"><Link href="/">Head Back</Link></p>
        </div>
    )
}

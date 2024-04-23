import React from 'react'

export default function Hero() {
    return (
        <div>
            <div className="flex bg-gray-0 dark:bg-gray-900 bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px]">

                <div className="max-w-3xl mx-auto relative text-center px-4 sm:px-6 lg:px-8 py-10 md:py-24">
                    <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:text-white">Starter Pages &amp; Examples</h1>
                    <div className="">Free Bootstrap and Tailwind Examples <strong className="text-gray-500">Additional UI</strong></div>
                </div>
            </div>
        </div>
    )
}

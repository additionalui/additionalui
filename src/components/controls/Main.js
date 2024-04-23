import React from 'react'

export default function Main() {
    return (
        <div className='h-[33rem] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
            <div className="hs-accordion-group">
                <div className="hs-accordion active" id="hs-basic-heading-one">
                    <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                        aria-controls="hs-basic-collapse-one">
                        <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                        </svg>
                        Accordion #1
                    </button>
                    <div id="hs-basic-collapse-one"
                        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-basic-heading-one">
                        <p className="text-gray-800">
                            <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin
                            adds the appropriate classes that we use to style each element. These classes control the overall
                            appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                </div>

                <div className="hs-accordion" id="hs-basic-heading-two">
                    <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                        aria-controls="hs-basic-collapse-two">
                        <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                        </svg>
                        Accordion #2
                    </button>
                    <div id="hs-basic-collapse-two"
                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-basic-heading-two">
                        <p className="text-gray-800">
                            <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin
                            adds the appropriate classes that we use to style each element. These classes control the overall
                            appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                </div>

                <div className="hs-accordion" id="hs-basic-heading-three">
                    <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                        aria-controls="hs-basic-collapse-three">
                        <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                        </svg>
                        Accordion #3
                    </button>
                    <div id="hs-basic-collapse-three"
                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-basic-heading-three">
                        <p className="text-gray-800">
                            <em>This is the third item's accordion body.</em> It is hidden by default, until the collapse plugin
                            adds the appropriate classes that we use to style each element. These classes control the overall
                            appearance, as well as the showing and hiding via CSS transitions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

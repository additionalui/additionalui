import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/components', label: 'Components' },
        // { href: '/workspace', label: 'Workspace' },
        { href: '/examples', label: 'Examples' }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 backdrop-blur backdrop-filter relative w-full max-w-[90rem] mx-auto py-2 px-4 sm:px-6 lg:px-8 ">
            {/* relative w-full max-w-[90rem] mx-auto py-2 px-4 sm:px-6 lg:px-8 */}
            <nav className="py-2 border-b border-gray-200 flex items-center justify-between xl:mx-auto dark:bg-gray-900 dark:border-gray-700" aria-label="Global">
                <Link className="flex items-center text-xl gap-2 w-48 font-semibold dark:text-white" to="/" aria-label="Brand">
                    <img
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.png"
                        alt="Additional UI"
                        width={40}
                        height={40}
                    />
                </Link>
                <div className={`flex gap-5`}>
                    <div className={`flex gap-5   ${isMenuOpen ? "visible" : "hidden"} md:block`}>
                        {links.map((x, inx) => (
                            <Link key={`h_nav${inx}`} className="font-base text-gray-500 hover:text-gray-400 md:py-3 dark:text-gray-400 dark:hover:text-gray-500 px-2" to={x?.href}>{x?.label}</Link>
                        ))}

                    </div>
                    <div className="flex gap-1">
                        <Link to={'https://github.com/additionalui'} target="_blank" className="text-lg text-base dark:text-gray-100">
                            <i className="bi bi-github"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

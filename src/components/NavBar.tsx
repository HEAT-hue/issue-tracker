'use client'
import Link from "next/link"
import { NavLink } from "@/lib/definitions"
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const links: NavLink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
]

/**
 * Nav bar component
 * @returns navigation bar
 */
const NavBar = () => {

    // Get the current pathname for active states
    const pathname = usePathname();

    return (
        <nav className="flex gap-x-6 px-5 h-14 items-center border-b">
            {/* Logo */}
            <Link href={'/'}><FaBug /></Link>

            {/* Nav Links */}
            <ul className="flex gap-x-6">
                {links.map((link: NavLink, index: number) => {
                    return (
                        <li key={index} className={`${pathname === link.href ? 'text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'} transition-colors`}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar
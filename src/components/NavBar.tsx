'use client'
import Link from "next/link"
import { NavLink } from "@/lib/definitions"
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { signOutUser } from "@/lib/actions";

const links: NavLink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/dashboard/issues' },
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
                        <li key={index}
                            className={classNames({
                                'text-zinc-800': pathname === link.href,
                                'text-zinc-500': pathname !== link.href,
                                'hover:text-zinc-800 transition-colors': true
                            })}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    )
                })}
            </ul>

            {pathname.startsWith("/dashboard") && (
                <form
                    className="ml-auto"
                    action={signOutUser}
                >
                    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>

            )}
        </nav >
    )
}

export default NavBar
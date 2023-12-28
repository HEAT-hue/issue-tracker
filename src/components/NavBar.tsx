'use client'
import Link from "next/link"
import { NavLink } from "@/lib/definitions"
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { signOutUser } from "@/lib/actions";
import { Avatar, Button, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import { Session } from "next-auth/types";

const links: NavLink[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/dashboard/issues' },
]

/**
 * Nav bar component
 * @returns navigation bar
 */
const NavBar = ({ session }: { session: Session | null }) => {

    // Get the current pathname for active states
    const pathname = usePathname();

    return (
        <nav className="flex gap-x-6 px-5 py-2 items-center border-b">
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
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
                    </Flex>

                    {pathname.startsWith("/dashboard") && (
                        <>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Flex gap="2">
                                        <Avatar className="cursor-pointer" radius="full" fallback={session?.user.email?.charAt(0) ?? "M"} />
                                    </Flex>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>{session?.user.email}</DropdownMenu.Label>

                                    <form
                                        action={signOutUser}
                                    >
                                        <button className="flex ml-3 py-[0.4rem] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                                            <div className="hidden md:block">Sign Out</div>
                                        </button>
                                    </form>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>

                        </>
                    )}
                </Flex>
            </Container>

        </nav >
    )
}

export default NavBar
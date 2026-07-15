"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5"
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

const Navlink = () => {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    return (
        <>
            {session?.user ? (
                <div className="flex items-center justify-end md:order-2 gap-2">
                    <div className="hidden text-sm bg-white/10 border border-white/20 rounded-full md:me-0 md:block">
                        <Image className="size-8 rounded-full" src={session.user.image || "avatar.svg"} width={64} height={64} alt="avatar" />
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => signOut()} className="md:block hidden py-2 px-4 bg-white/10 text-white hover:bg-white/20 rounded-sm cursor-pointer transition-colors duration-200">Sign Out</button>
                    </div>
                </div>
            ) : null}
            <button onClick={() => setOpen(!open)} className='inline-flex items-center p-2 justify-center text-sm text-white rounded-md md:hidden hover:bg-white/10'>
                {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
            </button>
            <div className={clsx("w-full md:block md:w-auto", {
                "hidden": !open
            })}>
                <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-primary md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-transparent">
                    <li>
                        <Link href="/" className="block py-2 px-3 text-white hover:text-action-hover rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="block py-2 px-3 text-white hover:text-action-hover rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">About</Link>
                    </li>
                    <li>
                        <Link href="/room" className="block py-2 px-3 text-white hover:text-action-hover rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">Rooms</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="block py-2 px-3 text-white hover:text-action-hover rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">Contact</Link>
                    </li>
                    {session && (
                        <>
                            <li>
                                <Link href="/myreservation" className="block py-2 px-3 text-white hover:text-white rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">My Reservation</Link>
                            </li>
                            {session.user.role === "admin" && (
                                <>
                                    <li>
                                        <Link href="/admin/dashboard" className="block py-2 px-3 text-white hover:text-highlight rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href="/admin/room" className="block py-2 px-3 text-white hover:text-highlight rounded-sm md:hover:bg-transparent md:p-0 transition-colors duration-200">Manage Rooms</Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                    {session ? (
                        <li className="pt-2 md:pt-0">
                            <button
                                onClick={() => signOut()} className="md:hidden py-2.5 px-4 bg-error text-white hover:bg-error/80 rounded-sm cursor-pointer transition-colors duration-200">Sign Out</button>
                        </li>
                    ) : (
                        <li className="pt-2 md:pt-0">
                            <Link href="/signin" className="py-2.5 px-6 bg-action text-white hover:bg-action-hover rounded-sm transition-colors duration-200">Sign In</Link>
                        </li>
                    )}

                </ul>
            </div>
        </>
    );
};
export default Navlink

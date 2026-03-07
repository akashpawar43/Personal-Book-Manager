"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/auth.actions";
import { usePathname, useRouter } from "next/navigation";
import { userLogout } from "@/lib/auth";
import { BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch();

    const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";

    const handleLogout = () => {
        userLogout()
        dispatch(logout());
    };

    return (
        <div className="flex items-center justify-between border-b px-6 h-14 bg-white">
            <Link href="/books" className="flex items-center gap-2 font-semibold">
                <BookOpen size={18} />
                Personal Book Manager
            </Link>

            {!isAuthPage &&
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            }
        </div>
    );
}
"use client";

import { isLoggedIn } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = isLoggedIn();

        if (pathname === "/") {
            router.replace("/auth/login");
            return;
        }

        if (pathname.startsWith("/auth")) {
            if (token) {
                router.replace("/books");
            }
            return;
        }

        if (pathname.startsWith("/books")) {
            if (!token) {
                router.replace("/auth/login");
            }
        }

    }, [pathname, router]);

    return <>{children}</>;
}
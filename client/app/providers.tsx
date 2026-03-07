"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 py-6">
                {children}
            </main>
            <Toaster position="top-right" />
        </Provider>
    );
}
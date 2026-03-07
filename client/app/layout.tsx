import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Personal Book Manager",
  description: "Add Book, View books, Update Book status, Delete book.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gray-100"
      >
        <AuthGuard>
          <Providers>
            {children}
          </Providers>
        </AuthGuard>
      </body>
    </html>
  );
}

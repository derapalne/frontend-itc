import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
    title: "Free Shopping",
    description: "Shop Freely but buy Costly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="h-screen" lang="en">
            <body
                className={
                    roboto.className +
                    " bg-gradient-to-b from-stone-100 to-stone-200 dark:bg-gradient-to-b dark:from-stone-900 dark:to-stone-950 flex flex-col h-full"
                }
            >
                {children}
            </body>
        </html>
    );
}

import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
    title: "Free Shopping",
    description: "Shop Freely but buy Costly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            className="h-screen"
            lang="en"
            suppressHydrationWarning={true}
        >
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div
                        className={
                            roboto.className +
                            " text-stone-900 dark:text-stone-100 bg-orange-400 dark:bg-gradient-to-b dark:from-stone-900 dark:to-stone-950 flex flex-col h-full"
                        }
                    >
                        <Header />
                        <Main>
                            {children}

                        </Main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

export default function Home() {
    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                <LandingPage></LandingPage>
            </main>
            <Footer />
        </>
    );
}

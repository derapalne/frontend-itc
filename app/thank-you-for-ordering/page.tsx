"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThankYouPageComponent from "../components/ThankYouPage";

export default function ThankYouPage() {
    return (
        <div>
            <Header />
            <main className="min-h-screen w-full sm:w-5/6 pt-4 mx-auto bg-stone-50 dark:bg-stone-950">
                <ThankYouPageComponent></ThankYouPageComponent>
            </main>
            <Footer />
        </div>
    );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen w-full sm:w-5/6 pt-4 mx-auto bg-stone-50 dark:bg-stone-950">
                <div>
                    <SignupForm></SignupForm>
                </div>
            </main>
            <Footer />
        </>
    );
}

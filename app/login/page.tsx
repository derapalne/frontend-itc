import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 pt-4 mx-auto bg-stone-50 dark:bg-stone-950">
                <div>
                    <LoginForm></LoginForm>
                </div>
            </main>
            <Footer />
        </>
    );
}

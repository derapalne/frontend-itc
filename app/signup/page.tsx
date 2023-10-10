import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
    return (
        <>
            <Header />
            <main>
                <div className="w-7/12 mx-auto text-center">
                    <SignupForm></SignupForm>
                </div>
            </main>
        </>
    );
}

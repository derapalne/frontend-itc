import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Header />
            <main>
                <div className="w-7/12 mx-auto text-center">
                    <LoginForm></LoginForm>
                </div>
            </main>
        </>
    );
}

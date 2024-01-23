import Header from "../components/Header";
import Main from "../components/Main";
import LoginForm from "../components/users/LoginForm";

export default function LoginPage() {
    return (
        <>
            <Header />
            <Main>
                <div className="mt-8">
                    <LoginForm></LoginForm>
                </div>
            </Main>
        </>
    );
}

import Header from "../components/Header";
import Main from "../components/Main";
import SignupForm from "../components/users/SignupForm";

export default function SignupPage() {
    return (
        <div>
            <Header />
            <Main>
                <SignupForm></SignupForm>
            </Main>
        </div>
    );
}

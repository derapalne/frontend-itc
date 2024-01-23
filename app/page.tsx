import Header from "./components/Header";
import Main from "./components/Main";
import LandingPage from "./components/pages/LandingPage";

export default function Home() {
    return (
        <>
            <Header />
            <Main>
                <LandingPage></LandingPage>
            </Main>
        </>
    );
}

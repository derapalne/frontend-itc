"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import ThankYouPageComponent from "../components/pages/ThankYouPage";

export default function ThankYouPage() {
    return (
        <>
            <Header />
            <Main>
                <ThankYouPageComponent></ThankYouPageComponent>
            </Main>
        </>
    );
}

import AdminPanel from "../components/AdminPanel";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AdminPage() {
    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                <div className="w-7/12 mx-auto">
                    <AdminPanel></AdminPanel>
                </div>
            </main>
            <Footer />
        </>
    );
}

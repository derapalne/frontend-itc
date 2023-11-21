import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AddProductPage() {
    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto pt-4 bg-stone-50 dark:bg-stone-950">
                <AddProductForm></AddProductForm>
            </main>
            <Footer />
        </>
    );
}

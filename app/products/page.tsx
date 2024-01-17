import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Products() {
    return (
        <>
            <Header />
            <main className="w-full sm:w-5/6 mx-auto pb-8 bg-stone-50 dark:bg-stone-950">
                <ProductList></ProductList>
            </main>
            <Footer />
        </>
    );
}

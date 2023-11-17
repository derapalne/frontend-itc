import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Products() {
    return (
        <>
            <Header />
            <main className="h-screen w-full sm:w-5/6 mx-auto bg-stone-50 dark:bg-stone-950">
                <h4 className="mx-auto text-center pt-4">Listing: All Products</h4>
                <ProductList></ProductList>
            </main>
            <Footer />
        </>
    );
}

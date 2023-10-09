import Header from "../components/Header";
import ProductList from "../components/ProductList";

export default function Products() {
    return (
        <>
            <Header />
            <main className="">
                <ProductList></ProductList>
            </main>
        </>
    );
}

import Header from "../components/Header";
import Main from "../components/Main";
import ProductList from "../components/products/ProductList";

export default function Products() {
    return (
        <>
            <Header />
            <Main>
                <ProductList></ProductList>
            </Main>
        </>
    );
}

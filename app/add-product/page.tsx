import AddProductForm from "../components/AddProductForm";
import Header from "../components/Header";

export default function AddProductPage() {
    return (
        <>
            <Header />
            <main className="w-7/12 mx-auto text-center">
                <AddProductForm></AddProductForm>
            </main>
        </>
    );
}

import Link from "next/link"
import Header from "./components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main className="w-7/12 mx-auto text-center">
                <Link className="text-lg font-bold underline" href="/products">Go to Products</Link>
            </main>
        </>
    );
}

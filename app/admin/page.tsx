import Header from "../components/Header";
import Main from "../components/Main";
import AdminPanel from "../components/users/AdminPanel";

export default function AdminPage() {
    return (
        <>
            <Header />
            <Main>
                <div className="w-7/12 mx-auto">
                    <AdminPanel></AdminPanel>
                </div>
            </Main>
        </>
    );
}

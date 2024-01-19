import { ReactNode } from "react"

export default function Main({ children }: { children: ReactNode }) {
    return <main className="min-h-screen w-full sm:w-5/6 mx-auto pb-8 bg-stone-50 dark:bg-stone-950">
        {children}
    </main>
}
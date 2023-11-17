import Link from "next/link";

export default function Footer() {
    return <footer className="flex align-center justify-evenly py-4 bg-stone-50 dark:bg-stone-950">
        <span className="font-light mr-4">© 2023 Singing Spirits</span>
        <ul className="flex flex-col justify-around font-thin">
            <li className="font-light"><Link href="https://github.com/derapalne">Contact Us</Link></li>
            <li>14099 Angry Ninja Ferret Av.</li>
        </ul>
    </footer>
}
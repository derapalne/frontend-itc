import Link from "next/link";

export default function ThankYouPageComponent() {
    return (
        <div className="flex flex-col flex-grow-0 items-center">
            <h3 className="my-12 text-3xl font-bold">Thank you for ordering!</h3>
            <p className="mb-4">
                This is a portfolio-fake page so nothing will happen! But you can still browse,
                search and add products!
            </p>
            <p className="mb-16">
                Thanks so much for checking out the page! Follow me on{" "}
                <Link
                    href="https://www.linkedin.com/in/felipe-simon-rosello"
                    className="font-bold text-sky-600 duration-300 hover:underline"
                >
                    LinkedIn
                </Link>{" "}
                and{" "}
                <Link
                    href="https://github.com/derapalne"
                    className="font-bold duration-300 hover:underline"
                >
                    Github
                </Link>{" "}
                if you liked the page!
            </p>
            <Link
                className="text-lg mb-12 p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                href="/"
            >
                Return to landing page
            </Link>
            <span></span>
            <Link
                className="text-lg p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500"
                href="/products"
            >
                See all Products
            </Link>
        </div>
    );
}

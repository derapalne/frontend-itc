export default function ProductForListSkeleton() {
    return (
        <div
            className="flex flex-col p-4 cursor-pointer duration-300 border border-stone-100 dark:border-stone-950 dark:bg-stone-900 hover:bg-stone-200/[0.3] dark:hover:bg-stone-800"
        >
            <div className="mx-auto object-center relative h-28 w-28">
            </div>
            <h3 className="grow">
                ... <u className="text-sm no-underline opacity-70">- ...</u>
            </h3>
            <div>
                <p className="text-start font-light text-xs">...</p>
                <p className="text-end font-bold">$...</p>
            </div>
        </div>
    );
}

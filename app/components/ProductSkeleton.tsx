
export default function ProductSkeleton() {

    return (
        <div className="flex flex-col p-4 border-2 border-slate-100 shadow dark:border-0 dark:bg-stone-900 rounded-lg">
            <div className="mx-auto object-center relative w-40 h-40"></div>
            <h3 className="grow">
                <span className="font-bold text-xl">...</span>
            </h3>
            <div>
                <span className="font-light">Description:</span>
                <p className="px-8">...</p>
            </div>
            <p className="mr-8 text-end font-bold">$...</p>
            <p className="mr-8 text-end font-light text-xs">
                Uploaded by ...
            </p>
            <button
                className={`m-auto p-2 rounded duration-300 bg-orange-400 dark:bg-orange-500 cursor-default`}
            >
                .....
            </button>
        </div>
    );
}

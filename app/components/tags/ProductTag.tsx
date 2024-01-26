import { ITag } from "@/app/interfaces/Tag";
import Link from "next/link";

export default function ProductTag({ params }: { params: ITag }) {
    return (
        <Link
            href={`/products?tag=${params.name}`}
            className="m-1 p-1 rounded-md duration-300 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-600"
        >
            {params.name}
        </Link>
    );
}

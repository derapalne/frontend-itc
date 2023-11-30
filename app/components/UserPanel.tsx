import { IUser } from "../interfaces/User";
import ProductForList from "./ProductForList";

export default function UserPanel({ params }: { params: { user: IUser; ownProfile: boolean } }) {
    const { username, n_products, creationDate, products } = params.user;
    const date = creationDate ? new Date(Date.parse(creationDate)) : undefined;
    return (
        <div>
            <h4 className="text-xl font-bold">{username}</h4>
            <span className="block text-end">{n_products} proucts uploaded</span>
            {params.ownProfile && (
                <button className="m-auto p-2 rounded duration-300 bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-400 dark:bg-orange-500">
                    Edit Profile
                </button>
            )}
            <div className="text-end opacity-60">
                {date && (
                    <span>
                        Joined on {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                    </span>
                )}
            </div>
            <div className="my-2 grid grid-cols-1 sm:grid-cols-2">
                {products?.map((p) => (
                    <ProductForList
                        key={p.id}
                        params={{
                            id: p.id,
                            name: p.name,
                            description: p.description,
                            image_url: p.image_url,
                            price: p.price,
                            brand_id: p.brand_id,
                            brand: p.brand,
                            creator_user_id: p.creator_user_id,
                            user: params.user,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

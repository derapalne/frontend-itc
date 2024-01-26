import { Brand as IBrand } from "../../interfaces/Brand";
import ProductForList from "../products/ProductForList";

export default function Brand({ params }: { params: IBrand }) {
    const { name, logo_url, id, products, creationDate } = params;
    const date = creationDate ? new Date(Date.parse(creationDate)) : undefined;
    return (
        <div>
            <h4 className="text-xl font-bold">{name}</h4>
            <span className="block text-end">{products?.length} proucts</span>
            <div className="text-end opacity-60">
                {date && (
                    <span>
                        Added on {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
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
                            brand: { id: id, name: name, logo_url: logo_url },
                            creator_user_id: p.creator_user_id,
                            user: p.user,
                            tags: [],
                            is_on_cart: false
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

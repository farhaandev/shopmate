import products from "../data/products";
import ProductCard from "../components/ProductCard";

const FeaturedProducts = () => {
    return (
        <section className="py-12 px-6 md:px-12 bg-gray-50">
            <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
                Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {products.slice(0, 6).map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    )
}

export default FeaturedProducts

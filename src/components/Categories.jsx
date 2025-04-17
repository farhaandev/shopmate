import products from "../data/products"
import { useNavigate } from "react-router-dom";
import { useFilter } from "../context/filterContext";


const Categories = () => {
    const navigate = useNavigate();
    const { setSelectedCategory } = useFilter()

    const categories = [...new Set(products.map((p) => p.category))]

    const handleCategory = (category) => {
        setSelectedCategory(category);
        navigate("/products")
    }

    return (
        <section className="py-12 px-6 md:px-12 bg-white">
            <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">Shop by Category</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-200 transition cursor-pointer"
                        onClick={handleCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    )
}

export default Categories

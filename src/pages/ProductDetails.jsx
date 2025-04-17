import { Link, useParams } from "react-router-dom"
import products from "../data/products"
import { useCart } from "../context/cartContext"
import { toast } from "react-toastify"

const ProductDetails = () => {

  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const { cartItems, dispatch } = useCart();
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`);
  }

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found</div>;
  }


  return (
    <section className="py-12 px-6 md:px-12 bg-white max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img src={product.image} alt={product.name} className="w-full p-12 rounded border border-gray-200" />
        <div>
          <h1 className="text-3xl font-bold text-orange-600 mb-4">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-lg text-orange-500 font-semibold mb-4">₹{product.price}</p>
          {
            isInCart ? (
              <Link
                to="/cart"
              >
                <button
                  onClick={handleAddToCart}
                  className="block bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer">
                  Go To Cart
                </button>
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200 cursor-pointer">
                Add to Cart
              </button>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
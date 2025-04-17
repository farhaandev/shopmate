import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {

  const { dispatch, cartItems } = useCart();

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) return;
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="w-full h-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full p-12 object-cover rounded"
        />
      </Link>
      <Link to={`/product/${product.id}`}> <h3 className="text-lg font-semibold mt-3">{product.name}</h3></Link>
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <p className="text-orange-600 font-bold text-lg">₹{product.price}</p>
      </div>
      {
        isInCart ? (
          <Link
            to="/cart"
            className="block bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition"
          >
            Go to Cart
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-auto bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-orange-600 transition duration-200">
            Add to Cart
          </button>
        )
      }
    </div>
  );
};

export default ProductCard;

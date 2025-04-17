import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, dispatch } = useCart();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.error("Item removed from cart!");
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      toast.error("Item removed from cart!");
    }
    dispatch({ type: "DECREMENT_QUANTITY", payload: item.id });
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    toast.info("Check functionality is coming soon.")
  }

  return (
    <div className="max-w-5xl mx-auto min-h-[50vh] max-h-full h-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. <Link to={"/products"} className="text-blue-600">Shop Now</Link></p>
      ) : (
        <>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-300 p-4 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item.id })}
                      className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <p className="text-xl font-semibold">Total: ₹{getTotal()}</p>
            <button onClick={handleProceedToCheckout} className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

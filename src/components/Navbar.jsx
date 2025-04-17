import { useState } from "react";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { cartItems } = useCart();

    const totalItems = Array.isArray(cartItems)
        ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
        : 0;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-orange-600">ShopMate</div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link to={"/"} className="hover:text-orange-600 cursor-pointer">Home</Link>
                    <Link to={"/products"} className="hover:text-orange-600 cursor-pointer">Products</Link>
                    <Link to={"/cart"} className="hover:text-orange-600 cursor-pointer flex items-center gap-1">
                        <FiShoppingCart size={20} />
                        <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-0.5">{totalItems}</span>
                    </Link>
                </ul>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-white px-6 flex flex-col py-4 space-y-4 text-gray-700 font-medium">
                    <Link to={"/"} className="hover:text-orange-600 cursor-pointer">Home</Link>
                    <Link to={"/products"} className="hover:text-orange-600 cursor-pointer">Products</Link>
                    <Link to={"/cart"} className="hover:text-orange-600 cursor-pointer flex items-center gap-1">
                        <FiShoppingCart size={20} />
                        <span className="bg-orange-600 text-white text-xs rounded-full px-2 py-0.5">{totalItems}</span>
                    </Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;

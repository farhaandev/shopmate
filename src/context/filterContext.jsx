import { createContext, useContext, useEffect, useState } from "react";
import products from "../data/products";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const storedCategory = localStorage.getItem("selectedCategory") || "";
    const storedPrice = localStorage.getItem("selectedPrice") || "";

    const [selectedCategory, setSelectedCategory] = useState(storedCategory);
    const [selectedPrice, setSelectedPrice] = useState(storedPrice);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const categories = [...new Set(products.map((item) => item.category))];

    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory);
        localStorage.setItem("selectedPrice", selectedPrice)
    }, [selectedCategory, selectedPrice]);

    useEffect(() => {
        let filtered = [...products];

        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (selectedPrice) {
            if (selectedPrice === "2000+") {
                filtered = filtered.filter((p) => p.price > 2000);
            } else {
                const [min, max] = selectedPrice.split("-").map(Number);
                filtered = filtered.filter((p) => p.price >= min && p.price <= max);
            }
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, selectedPrice]);

    return (
        <FilterContext.Provider
            value={{
                filteredProducts,
                categories,
                selectedCategory,
                setSelectedCategory,
                selectedPrice,
                setSelectedPrice,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export const useFilter = () => useContext(FilterContext);
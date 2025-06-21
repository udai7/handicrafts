import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartOff } from "lucide-react";
import ProductListing from "../components/Product/ProductCard";

// Dummy wishlist products
const DUMMY_WISHLIST = [
  {
    productId: 101,
    title: "Handcrafted Macrame Wall Hanging",
    image: "/public/weaving.png",
    price: 59.99,
    rating: 4.8,
    featured: true,
    discountPercentage: 10,
  },
  {
    productId: 102,
    title: "Bamboo Jewelry Box",
    image: "/public/logo.png",
    price: 29.99,
    rating: 4.5,
    featured: false,
    discountPercentage: 15,
  },
  {
    productId: 103,
    title: "Ceramic Vase Set",
    image: "/public/pottery.png",
    price: 89.99,
    rating: 4.9,
    featured: true,
    discountPercentage: 20,
  },
];

const Wishlist = () => {
  const [wishlist] = useState(DUMMY_WISHLIST);

  return (
    <div className="container mx-auto pt-24 px-4 md:px-8 pb-8 max-w-7xl bg-yellow-50 min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
          <HeartOff size={48} />
          <p className="mt-2">Your wishlist is empty.</p>
          <Link
            to="/shop"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <ProductListing product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

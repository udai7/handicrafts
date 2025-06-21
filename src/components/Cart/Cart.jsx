import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingBasket,
  FaGift,
  FaTags,
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaPercentage,
} from "react-icons/fa";

// Dummy cart items
const DUMMY_CART = [
  {
    id: 1,
    name: "Hand-woven Basket",
    image: "/public/weaving.png",
    price: 45.99,
    quantity: 2,
    artisan: "Maya Crafts",
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    image: "/public/pottery.png",
    price: 89.99,
    quantity: 1,
    artisan: "Pottery Masters",
  },
  {
    id: 3,
    name: "Bamboo Jewelry Box",
    image: "/public/logo.png",
    price: 29.99,
    quantity: 3,
    artisan: "Bamboo Artisans",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(DUMMY_CART);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // 18% GST
  const gst = (subtotal - discount) * 0.18;
  // Shipping is free for demo
  const shippingCost = 0;
  // Total
  const total = subtotal - discount + shippingCost + gst;

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.1);
    } else if (couponCode.toUpperCase() === "ARTISAN25") {
      setDiscount(subtotal * 0.25);
    } else {
      setDiscount(0);
    }
  };

  const moveToWishlist = (item) => {
    removeItem(item.id);
  };

  return (
    <div className="container mx-auto pt-24 px-4 md:px-8 pb-4 max-w-7xl bg-yellow-50">
      <div className="relative">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 absolute inset-0 -z-10 rounded-2xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <FaShoppingBasket className="mr-3 text-yellow-600" />
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
            </div>
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <img
                  src="/images/empty-cart.svg"
                  alt="Empty Cart"
                  className="w-64 h-64 mx-auto mb-6 opacity-70"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Your cart feels lonely
                </h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <Link
                  to="/shop"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full transition duration-300 flex items-center justify-center w-64 mx-auto"
                >
                  <FaShoppingBasket className="mr-2" />
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col sm:flex-row items-start sm:items-center"
                  >
                    {/* Cart Item Details */}
                    <div className="flex-shrink-0 mr-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm flex items-center mt-1">
                            <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                            {item.artisan}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                          >
                            <FaMinus size={12} className="text-gray-600" />
                          </button>
                          <span className="font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
                          >
                            <FaPlus size={12} className="text-gray-600" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => moveToWishlist(item)}
                              className="text-gray-500 hover:text-yellow-600 transition"
                              title="Save for later"
                            >
                              <FaHeart />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 hover:text-red-600 transition"
                              title="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clearCart}
                  className="mt-4 bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-full font-medium transition"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
          {/* Order Summary Column */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaGift className="mr-3 text-yellow-600" />
                Order Summary
              </h2>
              {/* Coupon Section */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                  />
                  <button
                    onClick={applyCoupon}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4 py-2 transition"
                  >
                    <FaTag />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Try "WELCOME10" for 10% off!
                </p>
              </div>
              {/* Cost Breakdown */}
              <div className="space-y-4 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <FaPercentage className="mr-2" /> Discount
                    </span>
                    <span className="font-medium">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shippingCost === 0
                      ? "FREE"
                      : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{gst.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 font-bold text-xl">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              {/* Checkout Button */}
              <Link
                to="/checkout"
                state={{ cartItems, subtotal, discount, gst, total }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-full mt-6 flex items-center justify-center transition"
              >
                <FaShoppingBasket className="mr-2" />
                Proceed to Checkout
              </Link>
              {/* Additional Cart Benefits */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-yellow-600" />
                  Secure Checkout
                </div>
                <div className="flex items-center">
                  <FaTruck className="mr-2 text-yellow-600" />
                  Free 30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

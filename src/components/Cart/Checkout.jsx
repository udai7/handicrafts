import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  FaShoppingBag, 
  FaTruck, 
  FaCreditCard,
  FaGift,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Checkout = () => {
  const location = useLocation();
  // Get cart data from location state (passed from Cart component)
  const {
    cartItems = [],
    subtotal = 0,
    discount = 0,
    gst = 0,
    total = 0,
  } = location.state || {};

  return (
    <div className="container mx-auto pt-24 px-4 md:px-8 pb-16 max-w-6xl min-h-screen bg-yellow-50">
      <div className="bg-yellow-50 absolute top-0 left-0 right-0 h-40 -z-10"></div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
        <FaShoppingBag className="mr-3 text-yellow-600" />
        Checkout
      </h1>
      <p className="text-gray-600 mb-8">
        Review your order and complete your purchase.
      </p>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaShoppingBag />
            </div>
            <span className="text-sm font-medium text-gray-700">Cart</span>
          </div>
          <div className="h-1 bg-yellow-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaTruck />
            </div>
            <span className="text-sm font-medium text-yellow-600">
              Shipping
            </span>
          </div>
          <div className="h-1 bg-yellow-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaCreditCard />
            </div>
            <span className="text-sm font-medium text-yellow-600">Payment</span>
          </div>
          <div className="h-1 bg-yellow-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2">
              <FaGift />
            </div>
            <span className="text-sm font-medium text-yellow-600">
              Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="font-semibold text-gray-700 text-xl flex items-center">
                <span className="bg-yellow-600 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                Order Items
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                  No items in cart.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-100 pb-4"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            By {item.artisan}
                          </p>
                        </div>
                        <p className="text-gray-800 font-medium">
                          ₹{item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                </div>
              </div>
                ))
              )}
              </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaGift className="mr-3 text-yellow-600" />
                Order Summary
              </h2>
            <div className="space-y-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center">Discount</span>
                  <span className="font-medium">-₹{discount.toFixed(2)}</span>
                </div>
              )}
                <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
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
            <div className="mt-8 flex flex-col gap-4">
              <Link
                to="/"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-full flex items-center justify-center transition text-lg font-semibold"
              >
                <FaGift className="mr-2" />
                Place Order (Demo)
              </Link>
              <Link
                to="/cart"
                className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-200 justify-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

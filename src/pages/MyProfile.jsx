import React, { useContext } from "react";
import { UserContext } from "../utils/user_context";
import { User, Mail, BadgeCheck, ShoppingBag, Heart, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  // Dummy stats for now
  const orderCount = 5;
  const wishlistCount = 3;
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative shapes */}
      <div
        className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full opacity-30 blur-2xl -z-10"
        style={{ filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-2xl -z-10"
        style={{ filter: "blur(100px)" }}
      />
      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-amber-100">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-pink-400 to-orange-400 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-white">
              {initials}
            </div>
            <span className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
              <User className="text-amber-500" size={24} />
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">
            {user?.fullName || "Your Name"}
          </h1>
          <p className="text-gray-500 flex items-center mb-1 text-lg">
            <Mail className="mr-2 text-amber-400" size={20} />{" "}
            {user?.email || "your@email.com"}
          </p>
          <p className="text-gray-500 flex items-center text-lg">
            <BadgeCheck className="mr-2 text-green-500" size={20} />{" "}
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : "Customer"}
          </p>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-500 to-pink-400 hover:from-pink-400 hover:to-amber-500 text-white rounded-full flex items-center font-semibold shadow-lg transition-all text-lg">
            <Edit className="mr-2" size={20} /> Edit Profile
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
          <div className="bg-white/80 rounded-2xl p-6 flex flex-col items-center shadow-md border border-amber-100 min-w-[140px]">
            <ShoppingBag className="text-amber-500 mb-2" size={36} />
            <div className="text-3xl font-extrabold">{orderCount}</div>
            <div className="text-gray-700 font-medium">Orders</div>
            <Link
              to="/my-orders"
              className="mt-2 text-amber-600 hover:underline text-sm font-semibold"
            >
              View Orders
            </Link>
          </div>
          <div className="bg-white/80 rounded-2xl p-6 flex flex-col items-center shadow-md border border-pink-100 min-w-[140px]">
            <Heart className="text-pink-500 mb-2" size={36} />
            <div className="text-3xl font-extrabold">{wishlistCount}</div>
            <div className="text-gray-700 font-medium">Wishlist</div>
            <Link
              to="/wishlist"
              className="mt-2 text-pink-600 hover:underline text-sm font-semibold"
            >
              View Wishlist
            </Link>
          </div>
        </div>
        <div className="border-t border-amber-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <User className="mr-2 text-amber-500" size={24} /> Account Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center bg-amber-50 rounded-xl p-4">
              <Mail className="text-amber-400 mr-3" size={20} />
              <span className="text-gray-700 font-medium">
                {user?.email || "your@email.com"}
              </span>
            </div>
            <div className="flex items-center bg-pink-50 rounded-xl p-4">
              <BadgeCheck className="text-green-500 mr-3" size={20} />
              <span className="text-gray-700 font-medium">
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "Customer"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

import React from "react";
import {
  Calendar,
  Package,
  CheckCircle,
  Clock,
  CreditCard,
  Truck,
  ShoppingBag,
} from "lucide-react";

const orders = [
  {
    id: "#1234",
    date: "2024-03-15",
    status: "Delivered",
    items: 3,
    total: 95.0,
    payment: "Credit Card",
    delivery: "Standard Shipping",
  },
  {
    id: "#1235",
    date: "2024-04-02",
    status: "Pending",
    items: 2,
    total: 49.99,
    payment: "UPI",
    delivery: "Express",
  },
  {
    id: "#1236",
    date: "2024-05-10",
    status: "Cancelled",
    items: 1,
    total: 19.99,
    payment: "Credit Card",
    delivery: "Standard Shipping",
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  Delivered: <CheckCircle className="inline mr-1 text-green-500" size={18} />,
  Pending: <Clock className="inline mr-1 text-amber-500" size={18} />,
  Cancelled: <Clock className="inline mr-1 text-red-500" size={18} />,
};

const MyOrders = () => (
  <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 py-0 px-4 flex flex-col items-center relative overflow-hidden">
    {/* Decorative shapes */}
    <div
      className="absolute top-0 left-0 w-72 h-72 bg-amber-200 rounded-full opacity-30 blur-2xl -z-10"
      style={{ filter: "blur(80px)" }}
    />
    <div
      className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-2xl -z-10"
      style={{ filter: "blur(100px)" }}
    />
    {/* Hero Header */}
    <div className="w-full max-w-3xl mx-auto pt-24 pb-10 text-center">
      <div className="inline-flex items-center justify-center bg-white/80 backdrop-blur-xl rounded-full shadow-lg px-8 py-4 border border-amber-100 mb-6">
        <ShoppingBag className="text-amber-500 mr-3" size={32} />
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          My Orders
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        Track your recent purchases, see order status, and view details of your
        artisan treasures.
      </p>
    </div>
    <div className="w-full max-w-3xl mx-auto pb-16">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
          <Package size={48} />
          <p className="mt-2 text-lg">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className={`bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-amber-100 transition-transform duration-300 hover:scale-[1.01] ${
                idx % 2 === 0 ? "animate-fade-in-up" : "animate-fade-in-down"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center space-x-4">
                  <Package size={28} className="text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Order {order.id}</h3>
                    <p className="text-gray-600 text-sm flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-base font-semibold flex items-center shadow-sm ${
                    statusStyles[order.status]
                  }`}
                >
                  {statusIcons[order.status]}
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-base mb-4">
                <div>
                  <p className="text-gray-500">Items</p>
                  <p className="font-bold text-gray-800">{order.items}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-bold text-amber-600">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center">
                    <CreditCard className="mr-1 text-blue-500" size={16} />{" "}
                    Payment
                  </p>
                  <p className="font-bold text-gray-800">{order.payment}</p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center">
                    <Truck className="mr-1 text-amber-500" size={16} /> Delivery
                  </p>
                  <p className="font-bold text-gray-800">{order.delivery}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-pink-400 hover:from-pink-400 hover:to-amber-500 text-white rounded-full font-semibold shadow-md transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {/* Animations */}
    <style>{`
      @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fade-in-down { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
      .animate-fade-in-down { animation: fade-in-down 0.7s cubic-bezier(.4,0,.2,1) both; }
    `}</style>
  </div>
);

export default MyOrders;

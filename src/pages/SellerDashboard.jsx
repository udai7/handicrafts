import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const overviewStats = [
  {
    label: "Products",
    value: 24,
    color: "text-blue-600",
    bg: "bg-blue-50",
    sub: "Active listings",
  },
  {
    label: "Orders",
    value: 132,
    color: "text-green-600",
    bg: "bg-green-50",
    sub: "Completed this year",
  },
  {
    label: "Pending",
    value: 7,
    color: "text-red-600",
    bg: "bg-red-50",
    sub: "Awaiting action",
  },
  {
    label: "Earnings",
    value: "₹12,400",
    color: "text-amber-600",
    bg: "bg-amber-50",
    sub: "Total revenue",
  },
];

const salesData = [
  { month: "Jan", sales: 12, orders: 20 },
  { month: "Feb", sales: 18, orders: 28 },
  { month: "Mar", sales: 22, orders: 35 },
  { month: "Apr", sales: 30, orders: 40 },
  { month: "May", sales: 25, orders: 32 },
  { month: "Jun", sales: 35, orders: 50 },
];

const orderStatusData = [
  { name: "Delivered", value: 80 },
  { name: "Pending", value: 30 },
  { name: "Cancelled", value: 22 },
];
const orderStatusColors = ["#10b981", "#f59e0b", "#ef4444"];

const products = [
  {
    id: 1,
    name: "Handwoven Scarf",
    stock: 12,
    price: "₹500",
    status: "Active",
  },
  { id: 2, name: "Clay Pot", stock: 5, price: "₹350", status: "Active" },
  {
    id: 3,
    name: "Bamboo Basket",
    stock: 0,
    price: "₹200",
    status: "Out of Stock",
  },
  { id: 4, name: "Textile Bag", stock: 3, price: "₹700", status: "Active" },
];

const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 3);

const orders = [
  {
    id: 101,
    product: "Handwoven Scarf",
    date: "2024-06-01",
    status: "Shipped",
    amount: "₹500",
  },
  {
    id: 102,
    product: "Clay Pot",
    date: "2024-06-02",
    status: "Pending",
    amount: "₹350",
  },
  {
    id: 103,
    product: "Bamboo Basket",
    date: "2024-06-03",
    status: "Delivered",
    amount: "₹200",
  },
];

const recentUploads = [
  {
    id: 11,
    name: "New Pottery Vase",
    date: "2024-06-10",
    status: "Pending Approval",
  },
  { id: 12, name: "Eco Bamboo Tray", date: "2024-06-09", status: "Active" },
];

const trainingVideos = [
  {
    title: "How to List Products",
    url: "https://www.youtube.com/embed/1Q8fG0TtVAY",
  },
  {
    title: "Best Packaging Practices",
    url: "https://www.youtube.com/embed/2Vv-BfVoq4g",
  },
];

const events = [
  { name: "Handicraft Fair", date: "2024-07-10", location: "Delhi" },
  { name: "Artisan Expo", date: "2024-08-05", location: "Mumbai" },
  { name: "Weaver's Meet", date: "2024-09-15", location: "Kolkata" },
  { name: "Pottery Showcase", date: "2024-10-20", location: "Jaipur" },
  { name: "Bamboo Fest", date: "2024-11-12", location: "Guwahati" },
];

const categories = ["Weaving", "Pottery", "Bamboo", "Textiles", "Jewelry"];

const sellerPages = [
  "Overview",
  "Inventory Management",
  "Orders Management",
  "Advertising Panel",
  "Analytics",
  "Payment Summary",
  "Buyer Messages",
];

function SellerSidebar({ current, setCurrent }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col py-8 px-4">
      <h2 className="text-xl font-bold text-amber-600 mb-8">Seller Panel</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {sellerPages.map((page) => (
            <li key={page}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:bg-amber-50 hover:text-amber-600 ${
                  current === page ? "bg-amber-100 text-amber-700" : ""
                }`}
                onClick={() => setCurrent(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function OverviewPage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: categories[0],
    price: "",
    stock: "",
    image: null,
  });
  const [productPreview, setProductPreview] = useState(null);
  const [productList, setProductList] = useState(products);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // Helper to get days in current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  // Map events by date string
  const eventMap = events.reduce((acc, ev) => {
    const d = new Date(ev.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});
  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  // Selected day events
  let selectedEvents = [];
  if (selectedDate) {
    const key = `${year}-${month}-${selectedDate}`;
    selectedEvents = eventMap[key] || [];
  }

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct((prev) => ({ ...prev, image: files[0] }));
      setProductPreview(URL.createObjectURL(files[0]));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setProductList((prev) => [
      ...prev,
      { ...newProduct, id: Date.now(), status: "Pending Approval" },
    ]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setNewProduct({
      name: "",
      description: "",
      category: categories[0],
      price: "",
      stock: "",
      image: null,
    });
    setProductPreview(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Overview</h1>
      {/* Modern Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[120px] transition-all`}
          >
            <div className={`text-3xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Low Stock Notifications */}
      {lowStockProducts.length > 0 && (
        <div className="mb-8">
          <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-xl flex items-center gap-4 shadow-sm">
            <span className="font-semibold text-sm">Low Stock:</span>
            {lowStockProducts.map((p) => (
              <span
                key={p.id}
                className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold ml-1"
              >
                {p.name} ({p.stock} left)
              </span>
            ))}
          </div>
        </div>
      )}
      {/* List New Product Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          List New Product
        </h2>
        {showSuccess && (
          <div className="mb-4 text-green-600 font-semibold bg-green-50 rounded-lg px-4 py-2">
            Product submitted for approval!
          </div>
        )}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleProductSubmit}
        >
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleProductChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-gray-50 focus:bg-white"
              required
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleProductChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-gray-50 focus:bg-white"
              rows={3}
              required
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleProductChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-gray-50 focus:bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleProductChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-gray-50 focus:bg-white"
              required
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleProductChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 bg-gray-50 focus:bg-white"
              required
            />
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleProductChange}
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {productPreview ? (
              <img
                src={productPreview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg mb-4 border border-gray-200"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center bg-gray-50 rounded-lg mb-4 text-gray-300 border border-gray-200">
                Image Preview
              </div>
            )}
            <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition mx-auto mt-2 text-sm font-semibold shadow-sm"
              style={{ width: "auto", minWidth: "140px" }}
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
      {/* Order Status Pie Chart & Recent Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Order Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={32}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                stroke="#fff"
                strokeWidth={2}
              >
                {orderStatusData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={orderStatusColors[idx % orderStatusColors.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "13px", color: "#888" }}
              />
              <Tooltip
                formatter={(value, name) => [`${value}`, `${name}`]}
                contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Recent Product Uploads
          </h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b text-xs">
                <th className="py-2 px-4 font-medium">Name</th>
                <th className="py-2 px-4 font-medium">Date</th>
                <th className="py-2 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((u) => (
                <tr key={u.id} className="border-b hover:bg-amber-50">
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {u.name}
                  </td>
                  <td className="py-2 px-4 text-gray-500">{u.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        u.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Sales & Orders Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Sales & Orders (Last 6 Months)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={salesData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f59e0b"
              name="Sales"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#6366f1"
              name="Orders"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Product Management Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Your Products
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium">{p.name}</td>
                <td className="py-2 px-4">{p.stock}</td>
                <td className="py-2 px-4">{p.price}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      p.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button className="text-amber-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Order Tracking Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Orders
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium">{o.id}</td>
                <td className="py-2 px-4">{o.product}</td>
                <td className="py-2 px-4">{o.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      o.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : o.status === "Shipped"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-2 px-4">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Training Videos */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Government Training Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingVideos.map((vid, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow">
              <iframe
                width="100%"
                height="200"
                src={vid.url}
                title={vid.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-2 text-center text-gray-700 font-medium">
                {vid.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Event Notifications as Pretty Event Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Upcoming Fairs & Events
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {events.map((event, idx) => {
            const d = new Date(event.date);
            const day = d.getDate();
            const month = d.toLocaleString("default", { month: "short" });
            return (
              <div
                key={idx}
                className="min-w-[220px] max-w-xs bg-amber-50 border border-amber-200 rounded-2xl shadow-md flex flex-col items-center p-5 relative hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-amber-500 text-white font-bold text-xl shadow">
                    <span>{day}</span>
                    <span className="text-xs font-normal uppercase tracking-wider">
                      {month}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="font-semibold text-gray-800 text-base leading-tight mb-1">
                      {event.name}
                    </div>
                    <div className="flex items-center text-amber-700 text-xs font-medium">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-gray-400">(Overview content goes here...)</div>
    </div>
  );
}

function InventoryPage() {
  // Mock data
  const inventoryStats = [
    {
      label: "Total Products",
      value: 24,
      color: "text-blue-600",
      bg: "bg-blue-50",
      sub: "Active listings",
    },
    {
      label: "Low Stock",
      value: 3,
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Below threshold",
    },
    {
      label: "Out of Stock",
      value: 1,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Needs restock",
    },
  ];
  const inventoryByMonth = [
    { month: "Jan", added: 2 },
    { month: "Feb", added: 3 },
    { month: "Mar", added: 4 },
    { month: "Apr", added: 2 },
    { month: "May", added: 5 },
    { month: "Jun", added: 3 },
    { month: "Jul", added: 2 },
    { month: "Aug", added: 1 },
    { month: "Sep", added: 2 },
    { month: "Oct", added: 1 },
    { month: "Nov", added: 2 },
    { month: "Dec", added: 1 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Inventory Management
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {inventoryStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[100px] transition-all`}
          >
            <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Inventory by month chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Products Added by Month
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={inventoryByMonth}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="added" fill="#6366f1" name="Added" barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Inventory table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Product Inventory
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Stock</th>
              <th className="py-2 px-4 font-medium">Price</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-blue-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {p.name}
                </td>
                <td className="py-2 px-4 text-gray-500">{p.stock}</td>
                <td className="py-2 px-4 text-gray-500">{p.price}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    p.status === "Active"
                      ? "text-green-600"
                      : p.status === "Out of Stock"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  {p.status}
                </td>
                <td className="py-2 px-4">
                  <button className="text-indigo-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* CSV upload form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Bulk Upload via CSV
        </h2>
        <form className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="file"
            accept=".csv"
            className="border rounded px-3 py-2"
          />
          <button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

function OrdersPage() {
  // Mock data
  const orderStats = [
    {
      label: "Total Orders",
      value: 132,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "All time",
    },
    {
      label: "Delivered",
      value: 80,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Completed",
    },
    {
      label: "Pending",
      value: 30,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Awaiting action",
    },
    {
      label: "Cancelled",
      value: 22,
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Refunded/failed",
    },
  ];
  const returns = [
    {
      id: 201,
      product: "Clay Pot",
      reason: "Damaged",
      status: "Resolved",
      date: "2024-06-10",
    },
    {
      id: 202,
      product: "Bamboo Basket",
      reason: "Wrong item",
      status: "Pending",
      date: "2024-06-09",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Orders Management
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[100px] transition-all`}
          >
            <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Order status pie chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Order Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={32}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              stroke="#fff"
              strokeWidth={2}
            >
              {orderStatusData.map((entry, idx) => (
                <Cell
                  key={`cell-order-${idx}`}
                  fill={orderStatusColors[idx % orderStatusColors.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: "13px", color: "#888" }}
            />
            <Tooltip
              formatter={(value, name) => [`${value}`, `${name}`]}
              contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Orders</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Order ID</th>
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4 font-medium text-gray-800">{o.id}</td>
                <td className="py-2 px-4 text-gray-500">{o.product}</td>
                <td className="py-2 px-4 text-gray-500">{o.date}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    o.status === "Delivered"
                      ? "text-green-600"
                      : o.status === "Shipped"
                      ? "text-indigo-600"
                      : o.status === "Pending"
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {o.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{o.amount}</td>
                <td className="py-2 px-4">
                  <button className="text-indigo-600 hover:underline mr-2">
                    View
                  </button>
                  <button className="text-green-600 hover:underline">
                    Print Label
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Returns & Refunds */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Returns & Refunds
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Return ID</th>
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Reason</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium text-gray-800">{r.id}</td>
                <td className="py-2 px-4 text-gray-500">{r.product}</td>
                <td className="py-2 px-4 text-gray-500">{r.reason}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    r.status === "Resolved"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {r.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{r.date}</td>
                <td className="py-2 px-4">
                  <button className="text-indigo-600 hover:underline mr-2">
                    View
                  </button>
                  <button className="text-green-600 hover:underline">
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdvertisingPage() {
  // Mock data
  const adStats = [
    {
      label: "Active Campaigns",
      value: 2,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "Running now",
    },
    {
      label: "Total Clicks",
      value: 320,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "This month",
    },
    {
      label: "Impressions",
      value: 1200,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "This month",
    },
  ];
  const adPerformance = [
    { day: "Mon", clicks: 30, impressions: 120 },
    { day: "Tue", clicks: 40, impressions: 150 },
    { day: "Wed", clicks: 50, impressions: 200 },
    { day: "Thu", clicks: 60, impressions: 220 },
    { day: "Fri", clicks: 70, impressions: 250 },
    { day: "Sat", clicks: 40, impressions: 180 },
    { day: "Sun", clicks: 30, impressions: 80 },
  ];
  const campaigns = [
    {
      id: 1,
      name: "Summer Sale",
      status: "Active",
      budget: "₹2000",
      spent: "₹1200",
    },
    {
      id: 2,
      name: "New Arrivals",
      status: "Paused",
      budget: "₹1500",
      spent: "₹800",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Advertising Panel
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {adStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[100px] transition-all`}
          >
            <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Ad performance chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Ad Performance This Week
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={adPerformance}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#6366f1"
              name="Clicks"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#f59e0b"
              name="Impressions"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Campaigns table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Ad Campaigns</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Campaign</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Budget</th>
              <th className="py-2 px-4 font-medium">Spent</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {c.name}
                </td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    c.status === "Active" ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{c.budget}</td>
                <td className="py-2 px-4 text-gray-500">{c.spent}</td>
                <td className="py-2 px-4">
                  <button className="text-indigo-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Pause
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Ad campaign setup form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Create New Campaign
        </h2>
        <form className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Campaign Name"
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Budget (₹)"
            className="border rounded px-3 py-2"
          />
          <button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  // Mock data
  const analyticsStats = [
    {
      label: "Total Sales",
      value: "₹12,400",
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "This year",
    },
    {
      label: "Total Orders",
      value: 132,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "All time",
    },
    {
      label: "Conversion Rate",
      value: "4.2%",
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Site-wide",
    },
  ];
  const trafficData = [
    { month: "Jan", visits: 120, sales: 12 },
    { month: "Feb", visits: 180, sales: 18 },
    { month: "Mar", visits: 220, sales: 22 },
    { month: "Apr", visits: 300, sales: 30 },
    { month: "May", visits: 250, sales: 25 },
    { month: "Jun", visits: 350, sales: 35 },
  ];
  const topProducts = [
    { id: 1, name: "Handwoven Scarf", sales: 120 },
    { id: 2, name: "Clay Pot", sales: 98 },
    { id: 3, name: "Bamboo Basket", sales: 75 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics</h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {analyticsStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[100px] transition-all`}
          >
            <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Traffic & sales chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Traffic & Sales
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={trafficData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#6366f1"
              name="Visits"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              name="Sales"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Top products table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Top Products</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Sales</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.id} className="border-b hover:bg-green-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {p.name}
                </td>
                <td className="py-2 px-4 text-gray-500">{p.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentPage() {
  // Mock data
  const paymentStats = [
    {
      label: "Next Payout",
      value: "₹2,000",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "Scheduled 2024-06-15",
    },
    {
      label: "Total Earned",
      value: "₹12,400",
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "All time",
    },
    {
      label: "Fees Paid",
      value: "₹400",
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Platform fees",
    },
  ];
  const payoutHistory = [
    { id: 1, amount: "₹2,000", date: "2024-06-01", status: "Completed" },
    { id: 2, amount: "₹1,800", date: "2024-05-15", status: "Completed" },
    { id: 3, amount: "₹2,200", date: "2024-05-01", status: "Completed" },
  ];
  const earningsBreakdown = [
    { name: "Product Sales", value: 10000 },
    { name: "Shipping", value: 1800 },
    { name: "Other", value: 600 },
  ];
  const earningsColors = ["#6366f1", "#f59e0b", "#10b981"];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Summary</h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {paymentStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col items-center min-h-[100px] transition-all`}
          >
            <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-base font-semibold text-gray-800 mb-0.5">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400">{stat.sub}</div>
          </div>
        ))}
      </div>
      {/* Earnings breakdown pie chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Earnings Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={earningsBreakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={32}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              stroke="#fff"
              strokeWidth={2}
            >
              {earningsBreakdown.map((entry, idx) => (
                <Cell
                  key={`cell-earnings-${idx}`}
                  fill={earningsColors[idx % earningsColors.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: "13px", color: "#888" }}
            />
            <Tooltip
              formatter={(value, name) => [`₹${value}`, `${name}`]}
              contentStyle={{ borderRadius: "8px", fontSize: "13px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Payout history table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Payout History</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Payout ID</th>
              <th className="py-2 px-4 font-medium">Amount</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payoutHistory.map((p) => (
              <tr key={p.id} className="border-b hover:bg-green-50">
                <td className="py-2 px-4 font-medium text-gray-800">{p.id}</td>
                <td className="py-2 px-4 text-gray-500">{p.amount}</td>
                <td className="py-2 px-4 text-gray-500">{p.date}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    p.status === "Completed"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesPage() {
  // Mock data for mails
  const mails = [
    {
      id: 1,
      buyer: "Rahul Singh",
      subject: "Order delay",
      date: "2024-06-10",
      status: "Unread",
      message: "Hi, my order is delayed. Can you update me?",
    },
    {
      id: 2,
      buyer: "Anjali Verma",
      subject: "Product query",
      date: "2024-06-09",
      status: "Read",
      message: "Is the scarf available in blue?",
    },
  ];
  // Mock data for comments
  const comments = [
    {
      id: 1,
      buyer: "Suman Joshi",
      product: "Clay Pot",
      comment: "Great quality!",
      date: "2024-06-08",
    },
    {
      id: 2,
      buyer: "Vikas Patel",
      product: "Bamboo Basket",
      comment: "Received damaged item.",
      date: "2024-06-07",
    },
  ];
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "Order",
      text: "Order #1234 has been shipped.",
      date: "2024-06-10",
    },
    {
      id: 2,
      type: "Message",
      text: "You have a new message from Anjali Verma.",
      date: "2024-06-09",
    },
    {
      id: 3,
      type: "Comment",
      text: "New comment on your product: Clay Pot.",
      date: "2024-06-08",
    },
  ];
  const [selectedMail, setSelectedMail] = useState(null);
  const [mailReply, setMailReply] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentReply, setCommentReply] = useState("");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Buyer Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Mails Section */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Inbox</h2>
          <ul>
            {mails.map((m) => (
              <li
                key={m.id}
                className={`mb-3 p-3 rounded cursor-pointer border ${
                  selectedMail && selectedMail.id === m.id
                    ? "bg-amber-50 border-amber-400"
                    : "bg-white border-gray-100"
                } transition`}
                onClick={() => setSelectedMail(m)}
              >
                <div className="font-semibold text-gray-800">{m.buyer}</div>
                <div className="text-xs text-gray-500">{m.subject}</div>
                <div className="text-xs text-gray-400">{m.date}</div>
                <div
                  className={`text-xs font-semibold ${
                    m.status === "Unread" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {m.status}
                </div>
              </li>
            ))}
          </ul>
          {/* Mail details and reply */}
          <div className="mt-6">
            {selectedMail ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {selectedMail.subject}
                </h3>
                <div className="mb-2 text-gray-700">
                  From: {selectedMail.buyer}
                </div>
                <div className="mb-4 text-gray-600">{selectedMail.message}</div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMailReply("");
                  }}
                  className="flex flex-col gap-2"
                >
                  <textarea
                    className="border rounded px-3 py-2"
                    rows={3}
                    placeholder="Type your reply..."
                    value={mailReply}
                    onChange={(e) => setMailReply(e.target.value)}
                  />
                  <button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition self-end">
                    Send Reply
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-gray-400">
                Select a mail to view and reply.
              </div>
            )}
          </div>
        </div>
        {/* Comments Section */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Product Comments
          </h2>
          <ul>
            {comments.map((c) => (
              <li
                key={c.id}
                className={`mb-3 p-3 rounded cursor-pointer border ${
                  selectedComment && selectedComment.id === c.id
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-gray-100"
                } transition`}
                onClick={() => setSelectedComment(c)}
              >
                <div className="font-semibold text-gray-800">{c.buyer}</div>
                <div className="text-xs text-gray-500">{c.product}</div>
                <div className="text-xs text-gray-400">{c.date}</div>
                <div className="text-gray-700 mt-1">{c.comment}</div>
              </li>
            ))}
          </ul>
          {/* Comment details and reply */}
          <div className="mt-6">
            {selectedComment ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  Comment on {selectedComment.product}
                </h3>
                <div className="mb-2 text-gray-700">
                  From: {selectedComment.buyer}
                </div>
                <div className="mb-4 text-gray-600">
                  {selectedComment.comment}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCommentReply("");
                  }}
                  className="flex flex-col gap-2"
                >
                  <textarea
                    className="border rounded px-3 py-2"
                    rows={2}
                    placeholder="Type your reply..."
                    value={commentReply}
                    onChange={(e) => setCommentReply(e.target.value)}
                  />
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition self-end">
                    Reply
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-gray-400">
                Select a comment to view and reply.
              </div>
            )}
          </div>
        </div>
        {/* Notifications Section */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Notifications
          </h2>
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className="mb-3 p-3 rounded border bg-white border-gray-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-gray-800">{n.type}</div>
                  <div className="text-gray-700">{n.text}</div>
                </div>
                <div className="text-xs text-gray-400">{n.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const pageComponents = {
  Overview: OverviewPage,
  "Inventory Management": InventoryPage,
  "Orders Management": OrdersPage,
  "Advertising Panel": AdvertisingPage,
  Analytics: AnalyticsPage,
  "Payment Summary": PaymentPage,
  "Buyer Messages": MessagesPage,
};

export default function SellerDashboard() {
  const [currentPage, setCurrentPage] = useState("Overview");
  const PageComponent = pageComponents[currentPage];
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar current={currentPage} setCurrent={setCurrentPage} />
      <main className="flex-1 bg-gray-50">
        <PageComponent />
      </main>
    </div>
  );
}

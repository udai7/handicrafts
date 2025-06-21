import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

const overviewStats = [
  {
    label: "Active Artisans",
    value: 120,
    color: "text-blue-600",
    bg: "bg-blue-50",
    sub: "Currently registered",
  },
  {
    label: "Total Sales",
    value: "₹2,40,000",
    color: "text-green-600",
    bg: "bg-green-50",
    sub: "This year",
  },
  {
    label: "Schemes Uploaded",
    value: 8,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    sub: "Available for artisans",
  },
  {
    label: "Reports Downloaded",
    value: 15,
    color: "text-red-600",
    bg: "bg-red-50",
    sub: "Analytics & logs",
  },
];

const artisanRegionData = [
  { name: "North", value: 40 },
  { name: "South", value: 30 },
  { name: "East", value: 25 },
  { name: "West", value: 25 },
];
const regionColors = ["#f59e0b", "#6366f1", "#ec4899", "#10b981"];

const signupData = [
  { month: "Jan", signups: 10 },
  { month: "Feb", signups: 15 },
  { month: "Mar", signups: 20 },
  { month: "Apr", signups: 18 },
  { month: "May", signups: 25 },
  { month: "Jun", signups: 32 },
];

const schemes = [
  { id: 1, name: "Handloom Subsidy", views: 120, downloads: 30 },
  { id: 2, name: "Skill Training", views: 90, downloads: 22 },
];

const supplyChain = [
  { stage: "Raw Material", status: "Available" },
  { stage: "Production", status: "In Progress" },
  { stage: "Shipping", status: "On Time" },
];

const trainingContent = [
  {
    title: "How to Apply for Schemes",
    url: "https://www.youtube.com/embed/1Q8fG0TtVAY",
  },
  {
    title: "Export Guidelines",
    url: "https://www.youtube.com/embed/2Vv-BfVoq4g",
  },
];

const reports = [
  { name: "Monthly Sales Report", date: "2024-06-01" },
  { name: "Artisan Activity Log", date: "2024-06-02" },
];

const topProducts = [
  { id: 1, name: "Handwoven Scarf", sales: 120 },
  { id: 2, name: "Clay Pot", sales: 98 },
  { id: 3, name: "Bamboo Basket", sales: 75 },
];
const activeSellers = [
  { id: 1, name: "Amit Kumar", products: 15, orders: 120 },
  { id: 2, name: "Priya Singh", products: 12, orders: 98 },
];
const recentArtisans = [
  { id: 1, name: "Ravi Sharma", date: "2024-06-10" },
  { id: 2, name: "Sunita Devi", date: "2024-06-09" },
];
const orderStatusData = [
  { name: "Delivered", value: 180 },
  { name: "Pending", value: 40 },
  { name: "Cancelled", value: 12 },
];
const orderStatusColors = ["#10b981", "#f59e0b", "#ef4444"];
const flaggedOrders = [
  {
    id: 201,
    product: "Clay Pot",
    issue: "Damaged in transit",
    date: "2024-06-08",
  },
  {
    id: 202,
    product: "Bamboo Basket",
    issue: "Payment issue",
    date: "2024-06-07",
  },
];

const adminPages = [
  "Overview",
  "Seller Management",
  "Order Monitoring",
  "Listing Moderation",
  "Fraud Detection Tools",
  "Customer Complaints & Claims",
];

function AdminSidebar({ current, setCurrent }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col py-8 px-4">
      <h2 className="text-xl font-bold text-amber-600 mb-8">Admin Panel</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {adminPages.map((page) => (
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Overview</h1>
      {/* Overview cards */}
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
      {/* Artisan Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Artisan Distribution by Region
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={artisanRegionData}
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
                {artisanRegionData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={regionColors[idx % regionColors.length]}
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Artisan Signups Over Time
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={signupData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="signups"
                stroke="#f59e0b"
                name="Signups"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Scheme Management Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Schemes & Analytics
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Scheme Name</th>
              <th className="py-2 px-4 font-medium">Views</th>
              <th className="py-2 px-4 font-medium">Downloads</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((s) => (
              <tr key={s.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {s.name}
                </td>
                <td className="py-2 px-4 text-gray-500">{s.views}</td>
                <td className="py-2 px-4 text-gray-500">{s.downloads}</td>
                <td className="py-2 px-4">
                  <button className="text-amber-600 hover:underline mr-2">
                    View
                  </button>
                  <button className="text-indigo-600 hover:underline">
                    Analytics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Supply Chain Monitoring */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Supply Chain Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supplyChain.map((stage, idx) => (
            <div
              key={idx}
              className="rounded-lg p-4 bg-amber-50 flex flex-col items-center"
            >
              <div className="text-lg font-bold text-amber-600 mb-1">
                {stage.stage}
              </div>
              <div
                className={`text-sm font-semibold ${
                  stage.status === "Available" || stage.status === "On Time"
                    ? "text-emerald-600"
                    : "text-indigo-600"
                }`}
              >
                {stage.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Training Content Management */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Training Content for Sellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingContent.map((vid, idx) => (
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
      {/* Reports */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Download Reports
        </h2>
        <ul>
          {reports.map((r, idx) => (
            <li key={idx} className="mb-3 flex items-center">
              <span className="font-semibold text-gray-800 mr-2">{r.name}</span>
              <span className="text-gray-500 text-sm mr-2">{r.date}</span>
              <button className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 transition text-xs">
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SellerManagementPage() {
  // Mock data for sellers
  const sellerStats = [
    {
      label: "Total Sellers",
      value: 42,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "Registered on platform",
    },
    {
      label: "Active Sellers",
      value: 28,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Logged in last 30 days",
    },
    {
      label: "Top Products",
      value: 12,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "With >50 sales",
    },
    {
      label: "New Signups",
      value: 5,
      color: "text-blue-600",
      bg: "bg-blue-50",
      sub: "This week",
    },
  ];
  const sellerPerformance = [
    { name: "Jan", sellers: 10 },
    { name: "Feb", sellers: 12 },
    { name: "Mar", sellers: 15 },
    { name: "Apr", sellers: 18 },
    { name: "May", sellers: 20 },
    { name: "Jun", sellers: 25 },
    { name: "Jul", sellers: 22 },
    { name: "Aug", sellers: 24 },
    { name: "Sep", sellers: 28 },
    { name: "Oct", sellers: 30 },
    { name: "Nov", sellers: 32 },
    { name: "Dec", sellers: 35 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Seller Management
      </h1>
      {/* Seller stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {sellerStats.map((stat) => (
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
      {/* Seller performance chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Seller Growth Over Time
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={sellerPerformance}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sellers" fill="#6366f1" name="Sellers" barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Top sellers table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Top Sellers</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Name</th>
              <th className="py-2 px-4 font-medium">Products</th>
              <th className="py-2 px-4 font-medium">Orders</th>
            </tr>
          </thead>
          <tbody>
            {activeSellers.map((s) => (
              <tr key={s.id} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {s.name}
                </td>
                <td className="py-2 px-4 text-gray-500">{s.products}</td>
                <td className="py-2 px-4 text-gray-500">{s.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Recent signups */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Recent Seller Signups
        </h2>
        <ul>
          {recentArtisans.map((a) => (
            <li key={a.id} className="mb-3 flex items-center">
              <span className="font-semibold text-gray-800 mr-2">{a.name}</span>
              <span className="text-gray-500 text-sm mr-2">{a.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OrderMonitoringPage() {
  // Mock data for orders
  const orderStats = [
    {
      label: "Total Orders",
      value: 232,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "All time",
    },
    {
      label: "Delivered",
      value: 180,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Completed",
    },
    {
      label: "Pending",
      value: 40,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Awaiting action",
    },
    {
      label: "Cancelled",
      value: 12,
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Refunded/failed",
    },
  ];
  const recentOrders = [
    {
      id: 301,
      product: "Handwoven Scarf",
      status: "Delivered",
      date: "2024-06-10",
    },
    { id: 302, product: "Clay Pot", status: "Pending", date: "2024-06-09" },
    {
      id: 303,
      product: "Bamboo Basket",
      status: "Delivered",
      date: "2024-06-08",
    },
    {
      id: 304,
      product: "Jewelry Set",
      status: "Cancelled",
      date: "2024-06-07",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Order Monitoring
      </h1>
      {/* Order stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat) => (
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
      {/* Flagged orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Flagged Orders</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Order ID</th>
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Issue</th>
              <th className="py-2 px-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {flaggedOrders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-red-50">
                <td className="py-2 px-4 font-medium text-gray-800">{o.id}</td>
                <td className="py-2 px-4 text-gray-500">{o.product}</td>
                <td className="py-2 px-4 text-red-600">{o.issue}</td>
                <td className="py-2 px-4 text-gray-500">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Recent orders table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Recent Orders</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Order ID</th>
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium text-gray-800">{o.id}</td>
                <td className="py-2 px-4 text-gray-500">{o.product}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    o.status === "Delivered"
                      ? "text-green-600"
                      : o.status === "Pending"
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {o.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListingModerationPage() {
  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Clay Pot",
      seller: "Amit Kumar",
      flagged: true,
      reason: "Inappropriate description",
    },
    {
      id: 2,
      name: "Handwoven Scarf",
      seller: "Priya Singh",
      flagged: false,
      reason: "",
    },
    {
      id: 3,
      name: "Bamboo Basket",
      seller: "Ravi Sharma",
      flagged: true,
      reason: "Copyright violation",
    },
    {
      id: 4,
      name: "Pottery Vase",
      seller: "Sunita Devi",
      flagged: true,
      reason: "Counterfeit",
    },
    {
      id: 5,
      name: "Jewelry Set",
      seller: "Rita Das",
      flagged: false,
      reason: "",
    },
  ];
  const listingStats = [
    {
      label: "Flagged Listings",
      value: 12,
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Require review",
    },
    {
      label: "Pending Review",
      value: 5,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Awaiting action",
    },
    {
      label: "Resolved",
      value: 20,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Actioned",
    },
  ];
  const flaggedByMonth = [
    { month: "Jan", flagged: 2 },
    { month: "Feb", flagged: 1 },
    { month: "Mar", flagged: 3 },
    { month: "Apr", flagged: 2 },
    { month: "May", flagged: 4 },
    { month: "Jun", flagged: 5 },
    { month: "Jul", flagged: 3 },
    { month: "Aug", flagged: 2 },
    { month: "Sep", flagged: 1 },
    { month: "Oct", flagged: 2 },
    { month: "Nov", flagged: 1 },
    { month: "Dec", flagged: 2 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Listing Moderation
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {listingStats.map((stat) => (
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
      {/* Flagged listings by month chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Flagged Listings by Month
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={flaggedByMonth}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="flagged" fill="#ef4444" name="Flagged" barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Flagged product listings table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Flagged Product Listings
        </h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Product</th>
              <th className="py-2 px-4 font-medium">Seller</th>
              <th className="py-2 px-4 font-medium">Flagged</th>
              <th className="py-2 px-4 font-medium">Reason</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium text-gray-800">
                  {p.name}
                </td>
                <td className="py-2 px-4 text-gray-500">{p.seller}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    p.flagged ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {p.flagged ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 text-gray-500">{p.reason}</td>
                <td className="py-2 px-4">
                  <button className="text-red-600 hover:underline mr-2">
                    Flag
                  </button>
                  <button className="text-indigo-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Delete
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

function FraudDetectionToolsPage() {
  // Mock data for fraud detection
  const fraudStats = [
    {
      label: "Flagged Users",
      value: 7,
      color: "text-red-600",
      bg: "bg-red-50",
      sub: "Potential fraud",
    },
    {
      label: "Flagged Orders",
      value: 5,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Suspicious activity",
    },
    {
      label: "Resolved Cases",
      value: 12,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Closed",
    },
  ];
  const flaggedUsers = [
    {
      id: 1,
      name: "Sunil Mehra",
      type: "Seller",
      flags: 3,
      lastFlag: "2024-06-10",
    },
    {
      id: 2,
      name: "Rita Das",
      type: "Customer",
      flags: 2,
      lastFlag: "2024-06-09",
    },
    {
      id: 3,
      name: "Amit Kumar",
      type: "Seller",
      flags: 1,
      lastFlag: "2024-06-08",
    },
  ];
  const flaggedOrders = [
    {
      id: 401,
      product: "Jewelry Set",
      reason: "Suspicious payment",
      date: "2024-06-08",
    },
    {
      id: 402,
      product: "Clay Pot",
      reason: "Multiple returns",
      date: "2024-06-07",
    },
    {
      id: 403,
      product: "Bamboo Basket",
      reason: "Fake address",
      date: "2024-06-06",
    },
  ];
  const fraudReports = [
    { month: "Jan", reports: 1 },
    { month: "Feb", reports: 2 },
    { month: "Mar", reports: 1 },
    { month: "Apr", reports: 3 },
    { month: "May", reports: 2 },
    { month: "Jun", reports: 4 },
    { month: "Jul", reports: 2 },
    { month: "Aug", reports: 1 },
    { month: "Sep", reports: 2 },
    { month: "Oct", reports: 1 },
    { month: "Nov", reports: 1 },
    { month: "Dec", reports: 2 },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Fraud Detection Tools
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {fraudStats.map((stat) => (
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
      {/* Fraud reports over time chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Fraud Reports Over Time
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={fraudReports}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reports"
              stroke="#ef4444"
              name="Reports"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Flagged Users
          </h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b text-xs">
                <th className="py-2 px-4 font-medium">Name</th>
                <th className="py-2 px-4 font-medium">Type</th>
                <th className="py-2 px-4 font-medium">Flags</th>
                <th className="py-2 px-4 font-medium">Last Flag</th>
              </tr>
            </thead>
            <tbody>
              {flaggedUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-red-50">
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {u.name}
                  </td>
                  <td className="py-2 px-4 text-gray-500">{u.type}</td>
                  <td className="py-2 px-4 text-red-600">{u.flags}</td>
                  <td className="py-2 px-4 text-gray-500">{u.lastFlag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Flagged Orders
          </h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b text-xs">
                <th className="py-2 px-4 font-medium">Order ID</th>
                <th className="py-2 px-4 font-medium">Product</th>
                <th className="py-2 px-4 font-medium">Reason</th>
                <th className="py-2 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {flaggedOrders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-amber-50">
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {o.id}
                  </td>
                  <td className="py-2 px-4 text-gray-500">{o.product}</td>
                  <td className="py-2 px-4 text-red-600">{o.reason}</td>
                  <td className="py-2 px-4 text-gray-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomerComplaintsClaimsPage() {
  // Mock data for complaints and claims
  const complaintStats = [
    {
      label: "Open Complaints",
      value: 8,
      color: "text-amber-600",
      bg: "bg-amber-50",
      sub: "Pending resolution",
    },
    {
      label: "Resolved Complaints",
      value: 15,
      color: "text-green-600",
      bg: "bg-green-50",
      sub: "Closed",
    },
    {
      label: "A-to-Z Claims",
      value: 6,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      sub: "Active claims",
    },
  ];
  const complaints = [
    {
      id: 501,
      customer: "Anjali Verma",
      issue: "Late delivery",
      status: "Open",
      date: "2024-06-10",
    },
    {
      id: 502,
      customer: "Rahul Singh",
      issue: "Damaged product",
      status: "Resolved",
      date: "2024-06-09",
    },
    {
      id: 503,
      customer: "Suman Joshi",
      issue: "Wrong item",
      status: "Open",
      date: "2024-06-08",
    },
    {
      id: 504,
      customer: "Vikas Patel",
      issue: "Missing parts",
      status: "Resolved",
      date: "2024-06-07",
    },
  ];
  const claims = [
    {
      id: 601,
      customer: "Priya Das",
      claim: "Refund requested",
      status: "In Progress",
      date: "2024-06-08",
    },
    {
      id: 602,
      customer: "Amit Kumar",
      claim: "Replacement requested",
      status: "Closed",
      date: "2024-06-07",
    },
    {
      id: 603,
      customer: "Rita Das",
      claim: "Refund requested",
      status: "Closed",
      date: "2024-06-06",
    },
  ];
  const complaintStatusData = [
    { name: "Open", value: 8 },
    { name: "Resolved", value: 15 },
  ];
  const complaintStatusColors = ["#f59e0b", "#10b981"];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Complaints & A-to-Z Claims
      </h1>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {complaintStats.map((stat) => (
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
      {/* Complaint status pie chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Complaint Status Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={complaintStatusData}
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
              {complaintStatusData.map((entry, idx) => (
                <Cell
                  key={`cell-complaint-${idx}`}
                  fill={
                    complaintStatusColors[idx % complaintStatusColors.length]
                  }
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Customer Complaints
        </h2>
        <table className="min-w-full text-left mb-8">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Complaint ID</th>
              <th className="py-2 px-4 font-medium">Customer</th>
              <th className="py-2 px-4 font-medium">Issue</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id} className="border-b hover:bg-amber-50">
                <td className="py-2 px-4 font-medium text-gray-800">{c.id}</td>
                <td className="py-2 px-4 text-gray-500">{c.customer}</td>
                <td className="py-2 px-4 text-gray-500">{c.issue}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    c.status === "Resolved"
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{c.date}</td>
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
        <h2 className="text-lg font-bold mb-4 text-gray-800">A-to-Z Claims</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs">
              <th className="py-2 px-4 font-medium">Claim ID</th>
              <th className="py-2 px-4 font-medium">Customer</th>
              <th className="py-2 px-4 font-medium">Claim</th>
              <th className="py-2 px-4 font-medium">Status</th>
              <th className="py-2 px-4 font-medium">Date</th>
              <th className="py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} className="border-b hover:bg-green-50">
                <td className="py-2 px-4 font-medium text-gray-800">{c.id}</td>
                <td className="py-2 px-4 text-gray-500">{c.customer}</td>
                <td className="py-2 px-4 text-gray-500">{c.claim}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    c.status === "Closed" ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="py-2 px-4 text-gray-500">{c.date}</td>
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

const pageComponents = {
  Overview: OverviewPage,
  "Seller Management": SellerManagementPage,
  "Order Monitoring": OrderMonitoringPage,
  "Listing Moderation": ListingModerationPage,
  "Fraud Detection Tools": FraudDetectionToolsPage,
  "Customer Complaints & Claims": CustomerComplaintsClaimsPage,
};

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("Overview");
  const PageComponent = pageComponents[currentPage];
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar current={currentPage} setCurrent={setCurrentPage} />
      <main className="flex-1 bg-gray-50">
        <PageComponent />
      </main>
    </div>
  );
}

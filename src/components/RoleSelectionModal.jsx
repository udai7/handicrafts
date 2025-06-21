import React from "react";

const roles = [
  {
    key: "customer",
    label: "Customer",
    desc: "Shop and explore artisan products.",
  },
  {
    key: "seller",
    label: "Seller",
    desc: "Upload products, track orders, and access training.",
  },
  {
    key: "admin",
    label: "Admin",
    desc: "Manage artisans, schemes, analytics, and content.",
  },
];

export default function RoleSelectionModal({ onSelectRole }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-amber-600">
          Select Your Role
        </h2>
        <p className="mb-6 text-gray-600">
          How would you like to use ArtisanKart?
        </p>
        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => onSelectRole(role.key)}
              className="w-full py-3 rounded-lg border border-amber-200 hover:bg-amber-50 text-lg font-semibold text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <div className="font-bold text-amber-600">{role.label}</div>
              <div className="text-sm text-gray-500">{role.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

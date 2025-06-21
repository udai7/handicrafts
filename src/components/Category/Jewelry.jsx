import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";

const EnhancedProductCard = ({
  product,
  hoveredProduct,
  setHoveredProduct,
}) => {
  const isHovered = hoveredProduct === product.id;
  return (
    <div
      className="flex flex-col h-full"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        <div
          className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-amber-600 text-xs font-medium mb-2">
          {product.tag}
        </div>
        <h3 className="text-gray-800 font-bold text-lg mb-1 hover:text-amber-600 transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="text-gray-500 text-sm mb-2">
          by{" "}
          <Link
            to={`/artisan/${product.artisanId}`}
            className="hover:text-amber-600 transition-colors"
          >
            {product.artisan}
          </Link>
        </div>
        <div className="flex items-center mb-3">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-500"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-2">
            ({product.reviewCount} reviews)
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-gray-900 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const Jewelry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jewelryProducts] = useState([
    {
      id: 1,
      name: "Silver Filigree Earrings",
      price: 44.99,
      artisan: "Giulia Bianchi",
      artisanId: 1,
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=600&auto=format",
      rating: 5.0,
      reviewCount: 25,
      badge: "Top Rated",
      tag: "Filigree",
    },
    {
      id: 2,
      name: "Gemstone Pendant Necklace",
      price: 59.99,
      artisan: "Rajesh Mehta",
      artisanId: 2,
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format",
      rating: 4.9,
      reviewCount: 19,
      badge: "New",
      tag: "Gemstone",
    },
    {
      id: 3,
      name: "Beaded Heritage Bracelet",
      price: 34.99,
      artisan: "Marisol Rivera",
      artisanId: 3,
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=600&auto=format",
      rating: 4.8,
      reviewCount: 16,
      badge: "Handmade",
      tag: "Beaded",
    },
    {
      id: 4,
      name: "Classic Gold Bangle",
      price: 89.99,
      artisan: "Aisha Khan",
      artisanId: 4,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format",
      rating: 4.7,
      reviewCount: 12,
      badge: "Classic",
      tag: "Gold",
    },
  ]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    setFeaturedArtisans([
      {
        id: 1,
        name: "Silver Craft Studio",
        image:
          "https://images.unsplash.com/photo-1609245340309-ce5f56782b5a?q=80&w=600&auto=format&fit=crop",
        location: "Florence, Italy",
        specialty: "Traditional silver filigree",
        bio: "Family-owned workshop with three generations of silver artisans creating intricate filigree designs using ancient techniques.",
        productCount: 22,
      },
      {
        id: 2,
        name: "Gem Artisans",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwNWPVj6oAoXcEM7EXWFG6DRtWk1JuxZxtw&s",
        location: "Jaipur, India",
        specialty: "Gemstone setting and cutting",
        bio: "Expert gemologists and jewelry craftspeople who specialize in ethically sourced gemstones and traditional setting techniques.",
        productCount: 16,
      },
      {
        id: 3,
        name: "Heritage Jewels",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-M5YYbBubzYTrQ6JL2pBRX_jHU8ChduS-A&s",
        location: "Oaxaca, Mexico",
        specialty: "Indigenous beadwork and metalsmithing",
        bio: "Cooperative of indigenous artisans preserving ancestral jewelry-making traditions while supporting local communities.",
        productCount: 18,
      },
    ]);
    setIsLoading(false);
  }, []);

  const jewelryTechniques = [
    {
      name: "Filigree",
      description:
        "Delicate metalwork using fine threads and beads to create intricate designs, dating back to ancient civilizations.",
      image:
        "https://media.istockphoto.com/id/2148023974/photo/western-belt-buckles-and-tooled-leather-frame.jpg?s=2048x2048&w=is&k=20&c=_4qmTfYK6ZTlvVlhIH_rZ22vTV2hr9XTnKjGkPAmXT0=",
    },
    {
      name: "Lost Wax Casting",
      description:
        "An ancient technique where a wax model is created, surrounded by molding material, then melted away to leave a cavity for molten metal.",
      image:
        "https://plus.unsplash.com/premium_photo-1714675739391-7843b99b0d98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9zdCUyMGNhc3QlMjB3YXhpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Wire Wrapping",
      description:
        "A technique where wire is manipulated with hand tools to create intricate designs without soldering.",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-purple-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-purple-200/30 rounded-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-80 shadow-sm"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1920&auto=format&fit=crop"
            alt="Jewelry background"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-purple-100/20 border border-purple-100/30 text-purple-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Timeless Elegance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-purple-100">Jewelry</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-purple-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handcrafted jewelry from master artisans around
            the world, each piece embodying generations of tradition, skill, and
            cultural heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a
              href="#jewelry-products"
              className="bg-gradient-to-r from-purple-200 to-purple-100 text-purple-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=jewelry"
              className="bg-white/20 border border-purple-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
            >
              Meet Artisans
            </Link>
          </motion.div>

          {/* Featured Techniques Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {jewelryTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white/20 border border-purple-100/30 text-purple-50 px-4 py-1 rounded-full text-sm hover:bg-purple-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="jewelry-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-900">
              Featured Jewelry Pieces
            </h2>
            <Link
              to="/shop?category=jewelry"
              className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jewelryProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <EnhancedProductCard
                  product={product}
                  hoveredProduct={hoveredProduct}
                  setHoveredProduct={setHoveredProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jewelry Techniques */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-purple-500/10 border border-purple-500/20 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Traditional Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Jewelry Crafting Techniques
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From ancient filigree to innovative casting methods,
              jewelry-making encompasses a rich array of techniques. Learn about
              the methods our artisans use to transform raw materials into
              wearable art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jewelryTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    {technique.name}
                  </h3>
                  <p className="text-gray-700">{technique.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-purple-900">
              Meet Our Jewelry Artisans
            </h2>
            <Link
              to="/artisans?craft=jewelry"
              className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-purple-100"
              >
                <div className="relative h-56">
                  <img
                    src={
                      "https://media.istockphoto.com/id/183770358/photo/home-made-bead-jewelry-making-as-a-hobby.jpg?s=612x612&w=0&k=20&c=iSgIfL9HpxjkKg2ebIIJES5RcvyOyaycWP--FQWdZvs="
                    }
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-1">
                    {artisan.name}
                  </h3>
                  <p className="text-purple-600 mb-3">{artisan.location}</p>
                  <p className="text-gray-700 font-medium text-sm mb-2">
                    Specialty: {artisan.specialty}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {artisan.bio}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {artisan.productCount} products
                    </span>
                    <Link
                      to={`/artisans/${artisan.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Box */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-purple-100 rounded-xl p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-purple-100/20 p-4 rounded-lg w-full md:w-auto">
                <img
                  src="https://images.unsplash.com/photo-1594970176634-7dba9b0ab499?q=80&w=200&auto=format&fit=crop"
                  alt="Jewelry craftsmanship"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  Preserving Jewelry Heritage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Each jewelry piece embodies centuries of craftsmanship.
                      Our artisans employ techniques passed down through
                      generations, ensuring traditional metal and gemstone work
                      thrives in the modern era.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Ethically sourced materials</li>
                      <li>Traditional hand-finishing techniques</li>
                      <li>Authentic cultural design patterns</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We maintain strict quality standards while encouraging
                      artistic innovation. Every purchase supports artisanal
                      communities and helps preserve endangered jewelry-making
                      traditions from around the world.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/sustainability"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Our Ethical Sourcing Promise
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-8 border-t border-purple-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Artisan Workshops", value: "15+" },
                  { label: "Years of Tradition", value: "200+" },
                  { label: "Unique Techniques", value: "12" },
                  { label: "Community Members", value: "320+" },
                ].map((stat, index) => (
                  <div key={index} className="p-4 bg-purple-50/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Jewelry;

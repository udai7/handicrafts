import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/productCard1";

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

const Textiles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textileProducts, setTextileProducts] = useState([
    {
      id: 1,
      title: "Handwoven Alpaca Scarf",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format",
      price: 49.99,
      featured: true,
      rating: 4.9,
      reviews: 22,
      artisan: "Lucia Quispe",
      category: "Textiles",
    },
    {
      id: 2,
      title: "Indigo Dyed Shawl",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=600&auto=format",
      price: 34.99,
      featured: true,
      rating: 4.8,
      reviews: 17,
      artisan: "Kenji Sato",
      category: "Textiles",
    },
    {
      id: 3,
      title: "Traditional Ikat Table Runner",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format",
      price: 29.99,
      featured: true,
      rating: 4.7,
      reviews: 13,
      artisan: "Amina Karimova",
      category: "Textiles",
    },
  ]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    setFeaturedArtisans([
      {
        id: 1,
        name: "Mountain Weaver Studio",
        image:
          "https://media.istockphoto.com/id/2149577605/photo/indigenous-woman-weaver-from-the-peruvian-town-of-chinchero-selecting-colored-threads-made.jpg?s=612x612&w=0&k=20&c=HZzwFiEIR2gMsCn5QEf7EiWyjCkLmxdhG_vDMfLDCmw=",
        location: "Cusco, Peru",
        specialty: "Traditional Andean weaving",
        bio: "Family-owned cooperative that preserves ancient Andean weaving techniques using naturally dyed alpaca and sheep wool from their own herds.",
        productCount: 18,
      },
      {
        id: 2,
        name: "Blue Hands Collective",
        image:
          "https://media.istockphoto.com/id/1322306556/photo/man-chooses-socks-on-sale-in-department-store.jpg?s=612x612&w=0&k=20&c=10i8hKkreyiCouhFz0iPRmARvbJujQGbh7xc_IAMBYs=",
        location: "Kyoto, Japan",
        specialty: "Natural indigo dyeing",
        bio: "Artisan collective dedicated to preserving traditional Japanese indigo dyeing techniques using plants grown in their own gardens.",
        productCount: 24,
      },
      {
        id: 3,
        name: "Silk Road Textiles",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XcCq20sH7MCxRchzknoH_iPlLYWqf0iIuQ&s",
        location: "Samarkand, Uzbekistan",
        specialty: "Silk ikat weaving",
        bio: "Multi-generational workshop continuing the ancient art of Uzbek ikat, producing vibrant silk textiles using traditional looms and dyeing methods.",
        productCount: 15,
      },
    ]);
  }, []);

  const textileTechniques = [
    {
      name: "Ikat",
      description:
        "A dyeing technique where threads are bound and dyed before weaving, creating patterns with characteristic blurred edges.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Vku6ZvSvghEzl5FXK7pnXAkcRe-Mgoybgg&s",
    },
    {
      name: "Block Printing",
      description:
        "Traditional method of printing patterns on textiles using carved wooden blocks dipped in natural dyes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeCdIxt8jIKU-ZU3EpAIzWJjAX9nqwxA8KPA&s",
    },
    {
      name: "Backstrap Weaving",
      description:
        "Ancient portable loom technique where one end is attached to a tree or post and the other to the weaver's body.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZNGmNDF3XJKKxzPsLqUCoAri8EA3z8zFyQ&s",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-indigo-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-indigo-200/30 rounded-md"></div>
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
    <div className="min-h-screen bg-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700"></div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-indigo-100/20 border border-indigo-100/30 text-indigo-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Woven Traditions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-indigo-100">Textiles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handcrafted textiles from master artisans around
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
              href="#textile-products"
              className="bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=textiles"
              className="bg-white/20 border border-indigo-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
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
            {textileTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white/20 border border-indigo-100/30 text-indigo-50 px-4 py-1 rounded-full text-sm hover:bg-indigo-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="textile-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-900">
              Featured Textile Pieces
            </h2>
            <Link
              to="/shop?category=textiles"
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textileProducts.map((product) => (
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

      {/* Textile Techniques */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Traditional Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Textile Crafting Techniques
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From ancient weaving to innovative dyeing methods, textile-making
              encompasses a rich array of techniques. Learn about the methods
              our artisans use to transform raw fibers into wearable and
              decorative art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {textileTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
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
            <h2 className="text-3xl font-bold text-indigo-900">
              Meet Our Textile Artisans
            </h2>
            <Link
              to="/artisans?craft=textiles"
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
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
                className="bg-indigo-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-indigo-100"
              >
                <div className="relative h-56">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-1">
                    {artisan.name}
                  </h3>
                  <p className="text-indigo-600 mb-3">{artisan.location}</p>
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
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      Visit Profile <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Textile Care Guide */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <Info size={20} className="text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-indigo-900">
                    Textile Care Guide
                  </h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Proper care extends the life of your handcrafted textiles and
                  preserves their beauty. Our artisans recommend these simple
                  steps to maintain your treasured pieces.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Star size={16} className="text-indigo-600 mr-2 mt-1" />
                    <p className="text-gray-700">
                      Always check individual care instructions for each piece
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Star size={16} className="text-indigo-600 mr-2 mt-1" />
                    <p className="text-gray-700">
                      Hand wash delicate items in cold water with mild soap
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Star size={16} className="text-indigo-600 mr-2 mt-1" />
                    <p className="text-gray-700">
                      Lay flat to dry, avoiding direct sunlight
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Star size={16} className="text-indigo-600 mr-2 mt-1" />
                    <p className="text-gray-700">
                      Store textiles in a cool, dry place away from moisture
                    </p>
                  </li>
                </ul>
                <Link
                  to="/care-guide/textiles"
                  className="mt-8 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Read Full Care Guide{" "}
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="bg-indigo-100 hidden md:block">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6s7BchM1zpYOc5uaRv4KxpszvxVUGIfxaHA&s"
                  alt="Textile care illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter for exclusive access to new textile
              collections, artisan stories, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-grow max-w-md"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer would be imported from a separate component */}
    </div>
  );
};

export default Textiles;

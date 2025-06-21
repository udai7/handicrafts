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

const Pottery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [potteryProducts, setPotteryProducts] = useState([
    {
      id: 1,
      title: "Classic Terracotta Vase",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format",
      price: 39.99,
      featured: true,
      rating: 4.7,
      reviews: 27,
      artisan: "Aiko Yamamoto",
      category: "Pottery",
    },
    {
      id: 2,
      title: "Hand-Painted Ceramic Plate",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format",
      price: 24.99,
      featured: true,
      rating: 4.8,
      reviews: 19,
      artisan: "Miguel Sanchez",
      category: "Pottery",
    },
    {
      id: 3,
      title: "Rustic Clay Mug",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600&auto=format",
      price: 12.99,
      featured: true,
      rating: 4.6,
      reviews: 15,
      artisan: "Elena Rossi",
      category: "Pottery",
    },
  ]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    setFeaturedArtisans([
      {
        id: 1,
        name: "Terra Ceramics",
        image: "https://www.goodnet.org/photos/620x0/42756_hd.jpg",
        location: "Kyoto, Japan",
        specialty: "Traditional Japanese pottery",
        bio: "Master ceramicists with over five generations of experience crafting traditional Japanese stoneware.",
        productCount: 18,
      },
      {
        id: 2,
        name: "Clay Studio",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFFrCeNNH5798vaKNiAFT-THikqN6iP_79w&s",
        location: "Portland, USA",
        specialty: "Contemporary functional pottery",
        bio: "Artist collective specializing in modern designs that balance aesthetic beauty and everyday functionality.",
        productCount: 12,
      },
      {
        id: 3,
        name: "Garden Pottery",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjy1yq23uMfsJUZObYc-OBNH-gQpg9ZnO4Cg&s",
        location: "Valencia, Spain",
        specialty: "Terracotta garden accessories",
        bio: "Family workshop using traditional Mediterranean techniques to create durable and beautiful terracotta pieces.",
        productCount: 15,
      },
    ]);
    setIsLoading(false);
  }, []);

  const potteryTechniques = [
    {
      name: "Wheel Throwing",
      description:
        "Creating symmetrical forms by shaping clay on a potters wheel, a technique dating back thousands of years.",
      image:
        "https://media.istockphoto.com/id/1147402081/photo/top-view-of-hands-with-clay-making-of-a-ceramic-pot-on-the-pottery-wheel-hobby-and-leisure.jpg?s=612x612&w=0&k=20&c=vh5HDGUN0Xr7UAtz4yrNyPEMaeArZQswp26iJuaXZDg=",
    },
    {
      name: "Hand Building",
      description:
        "Constructing pottery by hand using techniques such as pinching, coiling, and slab building.",
      image:
        "https://media.istockphoto.com/id/1144440788/photo/woman-hand-working-on-pot.jpg?s=612x612&w=0&k=20&c=0Cj4nIlKumIINr_jz-ORWoHf5XczCTktjx5RH4cE3Ak=",
    },
    {
      name: "Raku Firing",
      description:
        "A Japanese firing technique creating distinctive crackle patterns and metallic finishes.",
      image:
        "https://media.istockphoto.com/id/1171178824/photo/glassblower-in-the-work.jpg?s=612x612&w=0&k=20&c=9PmmZetkx_Ra1xZHiThzFgl09Um9Yoi3H3vF6-GrVyM=",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-amber-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-amber-200/30 rounded-md"></div>
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
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600"></div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-amber-100/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ancient Craftsmanship
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-amber-100">Pottery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-amber-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handcrafted ceramics from master artisans around
            the world, each piece reflecting centuries of tradition, creativity,
            and cultural heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a
              href="#pottery-products"
              className="bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=pottery"
              className="bg-white/20 border border-amber-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
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
            {potteryTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm hover:bg-amber-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="pottery-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900">
              Featured Ceramic Pieces
            </h2>
            <Link
              to="/shop?category=pottery"
              className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potteryProducts.map((product) => (
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

      {/* Pottery Techniques */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Traditional Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Pottery Creation Techniques
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From ancient hand-building to refined wheel-throwing, pottery
              encompasses a rich array of techniques. Learn about the methods
              our artisans use to transform clay into beautiful vessels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {potteryTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
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
            <h2 className="text-3xl font-bold text-amber-900">
              Meet Our Ceramic Artisans
            </h2>
            <Link
              to="/artisans?craft=pottery"
              className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
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
                className="bg-amber-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-amber-100"
              >
                <div className="relative h-56">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">
                    {artisan.name}
                  </h3>
                  <p className="text-amber-600 mb-3">{artisan.location}</p>
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
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm"
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
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-amber-100 rounded-xl p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-amber-100/20 p-4 rounded-lg w-full md:w-auto">
                <Info className="w-12 h-12 text-amber-600" strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Preserving Pottery Heritage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Each ceramic piece tells a story of cultural heritage. Our
                      artisans employ time-honored techniques passed down
                      through generations, ensuring traditional craftsmanship
                      thrives in the modern world.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>100% natural clay materials</li>
                      <li>Hand-processed mineral glazes</li>
                      <li>Low-fire traditional kilns</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We maintain strict quality standards while encouraging
                      artistic innovation. Every purchase supports artisanal
                      communities and helps preserve endangered pottery
                      traditions.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/sustainability"
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Our Sustainability Promise
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
              className="mt-8 pt-8 border-t border-amber-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Artisan Workshops", value: "12+" },
                  { label: "Years of Tradition", value: "100+" },
                  { label: "Unique Techniques", value: "8" },
                  { label: "Community Members", value: "240+" },
                ].map((stat, index) => (
                  <div key={index} className="p-4 bg-amber-50/50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-900 mb-1">
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

export default Pottery;

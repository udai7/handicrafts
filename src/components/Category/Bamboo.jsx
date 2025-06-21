import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Info, Leaf } from "lucide-react";
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

const Bamboo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bambooProducts, setBambooProducts] = useState([
    {
      id: 1,
      title: "Handwoven Bamboo Basket",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format",
      price: 29.99,
      featured: true,
      rating: 4.8,
      reviews: 32,
      artisan: "Niran Prasert",
      category: "Bamboo",
    },
    {
      id: 2,
      title: "Eco-Friendly Bamboo Tray",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600&auto=format",
      price: 19.99,
      featured: true,
      rating: 4.7,
      reviews: 21,
      artisan: "Liu Wei",
      category: "Bamboo",
    },
    {
      id: 3,
      title: "Bamboo Cutlery Set",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=600&auto=format",
      price: 14.99,
      featured: true,
      rating: 4.9,
      reviews: 18,
      artisan: "Hiroshi Tanaka",
      category: "Bamboo",
    },
  ]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    setFeaturedArtisans([
      {
        id: 1,
        name: "Bamboo Weavers",
        image:
          "https://media.istockphoto.com/id/824299522/photo/weaving-traditional-bamboo-basket.jpg?s=612x612&w=0&k=20&c=qM_tHxSnB2BcX2_H09PvF6Kr22jbrmkjTAbByr-hIhI=",
        location: "Chiang Mai, Thailand",
        specialty: "Traditional basket weaving",
        bio: "Multi-generational family of artisans preserving ancient Thai bamboo weaving techniques from the northern highlands. Led by master weaver Niran Prasert who has over 40 years of experience.",
        productCount: 24,
        established: 1978,
        rating: 4.8,
        reviews: 89,
      },
      {
        id: 2,
        name: "Green Forest Crafts",
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51",
        location: "Hangzhou, China",
        specialty: "Bamboo furniture and home decor",
        bio: "Cooperative of skilled craftspeople combining traditional Chinese bamboo techniques with contemporary design principles. Founded by Liu Wei and now includes 12 master artisans.",
        productCount: 18,
        established: 2005,
        rating: 4.9,
        reviews: 67,
      },
      {
        id: 3,
        name: "Eco Artisans",
        image:
          "https://media.istockphoto.com/id/2178322876/photo/close-up-of-wooden-pipe.jpg?s=612x612&w=0&k=20&c=IuMyf8K9B0pxGkmb1xXffXTsY-ctPmBzvUOEXxkMMuU=",
        location: "Kyoto, Japan",
        specialty: "Bamboo kitchenware and vessels",
        bio: "Japanese artisans with expertise in traditional bamboo processing for functional and durable everyday items. Led by third-generation bamboo master Hiroshi Tanaka.",
        productCount: 20,
        established: 1996,
        rating: 4.7,
        reviews: 54,
      },
    ]);
  }, []);

  const bambooTechniques = [
    {
      name: "Split Weaving",
      description:
        "Bamboo is split into thin strips and woven together to create intricate patterns and durable structures.",
      image:
        "https://media.istockphoto.com/id/1453245838/photo/skilled-craftsman-working-manually-a-detailed-bamboo-wood-armchair-with-his-fingers-and-tools.jpg?s=612x612&w=0&k=20&c=qX_7yM8EAMWSOAi_0OK2jm_HQaUP4xljg5Tzi1oibuI=",
    },
    {
      name: "Node Carving",
      description:
        "Artisans work with bamboo nodes and joints to create unique decorative elements and functional features.",
      image:
        "https://media.istockphoto.com/id/482186532/photo/beautiful-woven-bamboo.jpg?s=612x612&w=0&k=20&c=tjDqf-fwuJQLoddgt84nUywbNH2wqQAJjhKS3E3JQnQ=",
    },
    {
      name: "Steam Bending",
      description:
        "Bamboo is heated with steam to make it pliable, then shaped into graceful curves and forms.",
      image:
        "https://media.istockphoto.com/id/1202419556/photo/selective-focus-on-traditional-stairs-made-of-fresh-cut-green-long-bamboo-handcrafted-closeup.jpg?s=612x612&w=0&k=20&c=ai_CFJWE90gGA-GCZygaoMB31nv1t09XjKN8zaN4ZaM=",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-80 bg-green-200/30 rounded-xl"></div>
            <div className="h-10 w-1/4 bg-green-200/30 rounded-md"></div>
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
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Static Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-600"></div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Sustainable Label */}
          <motion.div
            className="bg-green-100/20 border border-green-100/30 text-green-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sustainable Craftsmanship
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-green-100">Bamboo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-green-50/90 max-w-2xl mb-10"
          >
            Explore the beauty of sustainable bamboo crafts, handmade by skilled
            artisans using traditional techniques passed down through
            generations. Environmentally friendly, durable, and exquisitely
            crafted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a
              href="#bamboo-products"
              className="bg-gradient-to-r from-green-200 to-green-100 text-green-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=bamboo"
              className="bg-white/20 border border-green-100/30 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-sm transition-all duration-200 hover:bg-white/30"
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
            {bambooTechniques.map((technique) => (
              <Link
                key={technique.name}
                to={`/techniques/${technique.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-white/20 border border-green-100/30 text-green-50 px-4 py-1 rounded-full text-sm hover:bg-green-100/30 transition-colors"
              >
                {technique.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="bamboo-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-900">
              Featured Bamboo Pieces
            </h2>
            <Link
              to="/shop?category=bamboo"
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bambooProducts.map((product) => (
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

      {/* Bamboo Techniques */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-green-500/10 border border-green-500/20 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Artisanal Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Bamboo Crafting Techniques
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From intricate weaving to precision carving, bamboo craftsmanship
              requires patience, skill, and deep understanding of the material.
              Discover the techniques our artisans use to transform bamboo into
              functional art.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bambooTechniques.map((technique, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
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
            <h2 className="text-3xl font-bold text-green-900">
              Meet Our Bamboo Artisans
            </h2>
            <Link
              to="/artisans?craft=bamboo"
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
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
                className="bg-green-50/50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-green-100"
              >
                <div className="relative h-56">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-1">
                    {artisan.name}
                  </h3>
                  <p className="text-green-600 mb-3">{artisan.location}</p>
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
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
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

      {/* Sustainability Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-green-500/10 border border-green-500/20 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-flex items-center">
                <Leaf size={16} className="mr-2" />
                Eco-Friendly Material
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Sustainability at the Core
              </h2>
              <p className="text-gray-700 mb-6">
                Bamboo is one of the most sustainable materials on earth. It
                grows incredibly fast - up to 91 cm per day - and requires no
                pesticides or fertilizers. Unlike hardwood trees that take
                decades to mature, bamboo can be harvested in just 3-5 years.
              </p>
              <p className="text-gray-700 mb-6">
                By choosing bamboo products, you're supporting a renewable
                resource that helps reduce deforestation and carbon emissions.
                Our artisans work with bamboo sourced from managed forests where
                sustainable harvesting practices are followed.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center border border-green-100">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Leaf size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">Renewable</h3>
                    <p className="text-sm text-gray-600">
                      Fastest growing plant on Earth
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center border border-green-100">
                  <div className="mr-3 bg-green-100 p-2 rounded-full">
                    <Info size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-900">
                      Carbon Negative
                    </h3>
                    <p className="text-sm text-gray-600">
                      Absorbs more CO2 than it releases
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/sustainability"
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                Learn more about our sustainability practices{" "}
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://media.istockphoto.com/id/1252966289/photo/giant-bamboo.jpg?s=612x612&w=0&k=20&c=5x0jn0KgVmiVRp_aNIdq_t9uX1buCsEctYK3Di4coIA="
                alt="Sustainable bamboo harvesting"
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-xs border border-green-100">
                <div className="flex items-center mb-2">
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500 mr-1" />
                  <Star size={16} className="text-green-500" />
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Our bamboo products are not just beautiful, they're a
                  testament to nature's resilience and our commitment to
                  preserving it."
                </p>
                <p className="text-green-700 font-medium text-sm mt-2">
                  — Lin Wei, Green Forest Crafts
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Join the Bamboo Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-green-50/90 max-w-2xl mx-auto mb-8"
          >
            Subscribe to our newsletter for exclusive offers, artisan stories,
            and early access to new bamboo collections.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-full flex-grow border-2 border-green-700 bg-green-700/50 text-white placeholder:text-green-50/70 focus:outline-none focus:border-green-100"
            />
            <button className="bg-green-100 text-green-900 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Bamboo;

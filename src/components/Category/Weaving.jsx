import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import fetch_products from "../../utils/products";

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

const Weaving = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weavingProducts] = useState([
    {
      id: 1,
      name: "Zapotec Wool Rug",
      price: 99.99,
      artisan: "Ana Ruiz",
      artisanId: 1,
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600&auto=format",
      rating: 4.9,
      reviewCount: 14,
      badge: "Traditional",
      tag: "Handwoven",
    },
    {
      id: 2,
      name: "Berber Wall Tapestry",
      price: 79.99,
      artisan: "Fatima Zahra",
      artisanId: 2,
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=600&auto=format",
      rating: 4.8,
      reviewCount: 11,
      badge: "Eco",
      tag: "Sustainable",
    },
    {
      id: 3,
      name: "Indonesian Ikat Shawl",
      price: 59.99,
      artisan: "Putri Dewi",
      artisanId: 3,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format",
      rating: 4.7,
      reviewCount: 9,
      badge: "Limited",
      tag: "Ikat",
    },
    {
      id: 4,
      name: "Peruvian Alpaca Throw",
      price: 120.0,
      artisan: "Lucia Quispe",
      artisanId: 4,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format",
      rating: 4.8,
      reviewCount: 7,
      badge: "Bestseller",
      tag: "Alpaca",
    },
  ]);
  const [featuredArtisans, setFeaturedArtisans] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
      setFeaturedArtisans([
        {
          id: 1,
        name: "Mountain Weavers",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvG-M6HZNh9KT-KkYR4XHpi7dH-H3obwTbQ&s",
        location: "Oaxaca, Mexico",
        specialty: "Traditional Zapotec weaving",
        bio: "A cooperative of indigenous weavers using natural dyes and ancient techniques passed down through generations.",
        productCount: 14,
        },
        {
          id: 2,
        name: "Textile Traditions",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf_X0CCA_zHdP3fOXEsEHuonT9u8hfvsg82Q&s",
        location: "Marrakech, Morocco",
        specialty: "Berber weaving patterns",
        bio: "Family-run studio preserving centuries-old techniques while creating contemporary designs.",
        productCount: 9,
        },
        {
          id: 3,
        name: "Fiber Arts Collective",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR839t5Khdp6lHTPVLJIDz9MIY4YZcmURtEnQ&s",
        location: "Bali, Indonesia",
        specialty: "Ikat and batik textiles",
        bio: "Artist collective combining traditional Indonesian weaving with modern sustainable practices.",
        productCount: 11,
      },
      ]);
     setIsLoading(false);
  }, []);

  const weavingTechniques = [
    {
      name: "Tapestry Weaving",
      description:
        "Creating pictorial designs by interlacing weft threads through the warp to completely cover it.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjGQvZw89WLqH6nYXpz_PhY8LKvszhje8LXw&s",
    },
    {
      name: "Ikat",
      description:
        "A resist-dyeing technique where threads are bound and dyed before weaving to create patterns.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXWyc-oeqI0Pedu8627xIoQG45Bdi-jr7jQ&s",
    },
    {
      name: "Backstrap Weaving",
      description:
        "Ancient technique using a simple loom attached to the weavers body to create intricate textiles.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pAMrGAHpVtyphjT2lmBa-wDOhoAL51rEdQ&s",
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          {/* Handcrafted Label */}
          <motion.div
            className="bg-amber-100/20 border border-amber-100/30 text-amber-50 px-4 py-1 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Traditional Craftsmanship
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white"
          >
            The Art of <span className="text-amber-100">Weaving</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-amber-50/90 max-w-2xl mb-10"
          >
            Discover exquisite handwoven textiles from master artisans around
            the world, each piece reflecting centuries of tradition, skill, and
            cultural heritage.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a 
              href="#weaving-products" 
              className="bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900 px-8 py-4 text-lg font-semibold rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Explore Collection
            </a>
            <Link
              to="/artisans?craft=weaving"
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
            {weavingTechniques.map((technique) => (
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
      <section id="weaving-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900">
              Featured Woven Pieces
            </h2>
            <Link
              to="/shop?category=weaving"
              className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weavingProducts.map((product) => (
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

      {/* Weaving Techniques */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              className="bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-6 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ancient Methods
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Traditional Weaving Techniques
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Weaving is among the oldest human crafts, with diverse techniques
              developed across cultures. Learn about the methods our artisans
              use to create their beautiful textiles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weavingTechniques.map((technique, index) => (
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
              Meet Our Weaving Artisans
            </h2>
            <Link
              to="/artisans?craft=weaving"
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
          <div className="bg-white border border-amber-100 rounded-xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-full text-amber-700">
                <Info size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  About Handwoven Textiles
                </h3>
                <p className="text-gray-700 mb-4">
                  Handwoven textiles are created using traditional looms and
                  techniques that have been passed down through generations.
                  Each piece is unique and tells a story of cultural heritage,
                  with patterns that often have symbolic meaning.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">
                      Sustainable
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Traditional weaving uses natural fibers and dyes with
                      minimal environmental impact.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Durable</h4>
                    <p className="text-gray-600 text-sm">
                      Hand-woven textiles are often stronger and longer-lasting
                      than machine-made alternatives.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-1">Unique</h4>
                    <p className="text-gray-600 text-sm">
                      Each piece has subtle variations that make it
                      one-of-a-kind and impossible to replicate exactly.
                    </p>
                  </div>
                </div>
                <Link 
                  to="/learn/weaving-process" 
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                >
                  Learn more about the weaving process
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover how our handwoven pieces have brought joy and beauty to
              homes around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Mitchell",
                location: "Portland, OR",
                text: "The wool blanket I purchased is absolutely stunning. The craftsmanship is exceptional, and it's become the focal point of my living room. Worth every penny!",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Chicago, IL",
                text: "I've been collecting handwoven textiles for years, and the pieces from Mountain Weavers are among the finest I've seen. The colors and patterns are exquisite.",
                rating: 5,
              },
              {
                name: "Amara Johnson",
                location: "Austin, TX",
                text: "The table runner I ordered exceeded my expectations. The attention to detail is remarkable, and I love knowing the story behind who made it.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-amber-50/50 rounded-xl p-6 border border-amber-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-medium text-amber-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-amber-100 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive updates on new arrivals,
            artisan stories, and exclusive offers.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-800"
              />
              <button className="bg-amber-800 hover:bg-amber-900 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-amber-200 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Weaving;

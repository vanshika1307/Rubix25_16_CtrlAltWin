import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 py-24">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20 animate-pulse"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Our Journey to Sustainability
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-50 max-w-3xl mx-auto"
          >
            Empowering conscious consumers with eco-friendly choices for a better tomorrow
          </motion.p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-gradient-to-br from-green-100 via-white to-green-50 relative">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
          <div className="bg-green/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100">
            <p className="text-lg text-gray-700 leading-relaxed">
            We are an e-commerce store dedicated to advocating for sustainability and eco-conscious living. Our mission is to create a platform where consumers can easily access a wide range of eco-friendly products while being inspired to make greener choices. Through the use of Amazon-affiliated links, we provide a curated selection of items that align with our vision for a sustainable future. 

Our approach goes beyond mere transactions; we aim to cultivate a community driven by the shared goal of environmental preservation. By promoting alternatives to conventional products, we hope to encourage small, actionable steps that collectively result in a significant positive impact. From reusable household essentials to innovative energy-saving gadgets, our catalog is designed to meet the needs of a modern lifestyle while prioritizing the planet.

At Essence, we understand that true change begins with awareness. That’s why we emphasize education alongside our product offerings. Through blogs, campaigns, and interactive forums, we provide insights into sustainable practices and the importance of reducing one's ecological footprint. Our customers are not just buyers but collaborators in our mission to redefine consumer behavior and bring about a cultural shift toward sustainability.

Our partnerships with eco-conscious brands and organizations allow us to extend our reach and amplify our impact. 

            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-gradient-to-br from-green-100 via-white to-green-50 relative">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 rotate-180"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-green/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:bg-blue"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-green-700 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-green-100 via-white to-green-50 relative">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:bg-white"
              >
                <h3 className="text-3xl font-bold text-green-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
       {/* Footer Section */}
       <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 text-center">
        <p className="text-lg font-medium hover:scale-105 transition-transform duration-300 inline-block">
          Made with 💚 by Ctrl Alt Win
        </p>
      </footer>
    </div>
  );
};
    

const features = [
    {
      title: "Eco-Friendly Products",
      description: "Carefully curated selection of sustainable and environmentally conscious products.",
      icon: <FaLeaf className="w-8 h-8 text-green-600" />
    },
    {
      title: "Sustainable Practices",
      description: "Promoting recycling and renewable materials in everyday choices.",
      icon: <FaRecycle className="w-8 h-8 text-green-600" />
    },
    {
      title: "Quality Assurance",
      description: "Rigorous standards for product selection and verification.",
      icon: <FaShieldAlt className="w-8 h-8 text-green-600" />
    },
    {
      title: "Global Impact",
      description: "Making a difference in communities worldwide through sustainable choices.",
      icon: <FaGlobeAmericas className="w-8 h-8 text-green-600" />
    }
  ];

const stats = [
  { value: "90%", label: "Happy Customers" },
  { value: "200+", label: "Eco-friendly Alternatives" },
  { value: "10K+", label: "Products Promoted" },
  { value: "50+", label: "Countries Reached" }
];





export default AboutUs;
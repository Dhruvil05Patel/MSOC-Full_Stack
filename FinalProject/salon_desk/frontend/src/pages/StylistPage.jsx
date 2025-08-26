import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/pageWrapper";
import { fadeInUp } from "../animations/motionVariants";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function StylistPage() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, male, female

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/stylists");
      setStylists(res.data);
    } catch (err) {
      console.error("Failed to fetch stylists:", err);
      toast.error("Failed to load stylists");
    } finally {
      setLoading(false);
    }
  };

  const filteredStylists = stylists.filter((stylist) => {
    if (filter === "all") return true;
    return stylist.gender === filter;
  });

  const maleStylists = stylists.filter((stylist) => stylist.gender === "male");
  const femaleStylists = stylists.filter(
    (stylist) => stylist.gender === "female",
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderColor = (gender) => {
    return gender === "male"
      ? "bg-blue-100 text-blue-600"
      : "bg-purple-100 text-purple-600";
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
        >
          Our Expert Stylists
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex justify-center space-x-4 mb-8"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${filter === "all"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            All Stylists ({stylists.length})
          </button>
          <button
            onClick={() => setFilter("male")}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${filter === "male"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Male ({maleStylists.length})
          </button>
          <button
            onClick={() => setFilter("female")}
            className={`px-6 py-2 rounded-full transition-colors duration-300 font-medium ${filter === "female"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Female ({femaleStylists.length})
          </button>
        </motion.div>

        {/* Show All Stylists */}
        {filter === "all" && (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredStylists.map((stylist, index) => (
              <motion.div
                key={stylist._id}
                {...fadeInUp}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-pink-600">
                  {getInitials(stylist.name)}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {stylist.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {stylist.specialty || "Hair & Beauty Expert"}
                </p>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className="text-gray-700 font-semibold">
                    {stylist.rating || "New"}
                  </span>
                </div>
                <div className="flex items-center justify-center mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getGenderColor(stylist.gender)}`}
                  >
                    {stylist.gender === "male"
                      ? "Male Stylist"
                      : "Female Stylist"}
                  </span>
                </div>
                {stylist.experience && (
                  <p className="text-sm text-gray-500 mb-2">
                    {stylist.experience} years experience
                  </p>
                )}
                {stylist.experience && (
                    <p className="text-sm text-gray-500 mb-2">
                      "{stylist.bio}"
                    </p>
                  )}
                {stylist.branch?.name && (
                  <p className="text-sm text-pink-600 font-medium">
                    {stylist.branch.name}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Show Male Stylists */}
        {filter === "male" && maleStylists.length > 0 && (
          <>
            <motion.h2
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center"
            >
              For Him
            </motion.h2>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {maleStylists.map((stylist, index) => (
                <motion.div
                  key={stylist._id}
                  {...fadeInUp}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-blue-600">
                    {getInitials(stylist.name)}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {stylist.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {stylist.specialty || "Hair & Beauty Expert"}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-gray-700 font-semibold">
                      {stylist.rating || "New"}
                    </span>
                  </div>
                  {stylist.experience && (
                    <p className="text-sm text-gray-500 mb-2">
                      {stylist.experience} years experience
                    </p>
                  )}
                  {stylist.experience && (
                    <p className="text-sm text-gray-500 mb-2">
                      "{stylist.bio}"
                    </p>
                  )}
                  {stylist.branch?.name && (
                    <p className="text-sm text-blue-600 font-medium">
                      {stylist.branch.name}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Show Female Stylists */}
        {filter === "female" && femaleStylists.length > 0 && (
          <>
            <motion.h2
              {...fadeInUp}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold text-purple-600 mb-6 text-center"
            >
              For Her
            </motion.h2>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {femaleStylists.map((stylist, index) => (
                <motion.div
                  key={stylist._id}
                  {...fadeInUp}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  className="bg-white shadow-lg p-6 rounded-xl text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-purple-600">
                    {getInitials(stylist.name)}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {stylist.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {stylist.specialty || "Hair & Beauty Expert"}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-gray-700 font-semibold">
                      {stylist.rating || "New"}
                    </span>
                  </div>
                  {stylist.experience && (
                    <p className="text-sm text-gray-500 mb-2">
                      {stylist.experience} years experience
                    </p>
                  )}
                  {stylist.experience && (
                    <p className="text-sm text-gray-500 mb-2">
                      "{stylist.bio}"
                    </p>
                  )}
                  {stylist.branch?.name && (
                    <p className="text-sm text-purple-600 font-medium">
                      {stylist.branch.name}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* No Stylists Found */}
        {filteredStylists.length === 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No stylists found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}

export default StylistPage;

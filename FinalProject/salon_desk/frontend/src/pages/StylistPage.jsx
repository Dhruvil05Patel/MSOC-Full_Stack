// src/pages/StylistPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/pageWrapper";
import { fadeInUp } from "../animations/motionVariants";
import axios from "../utils/axios";
import toast from "react-hot-toast";

function StylistPage() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/stylists");
      setStylists(res.data);
    } catch (err) {
      toast.error("Failed to load specialists");
    } finally {
      setLoading(false);
    }
  };

  const filteredStylists = stylists.filter((stylist) => {
    if (filter === "all") return true;
    return stylist.gender === filter;
  });

  const getInitials = (name) => {
    return name?.split(" ").map((w) => w.charAt(0)).join("").toUpperCase().slice(0, 2) || "S";
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-[80vh] bg-[#FAF9F6] text-[#1A1A1A]">
          <div className="text-xl font-sans font-light tracking-widest uppercase animate-pulse">Curating Specialists...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="bg-[#FAF9F6] min-h-screen py-16 md:py-24 px-6 md:px-16 text-[#1A1A1A]">

        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A1A1A] leading-tight mb-6"
          >
            Creative <span className="italic text-[#DDA7A5]">Directors</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-[#1A1A1A]/60 font-sans font-light max-w-xl mx-auto"
          >
            Meet our collective of master stylists, estheticians, and colorists dedicated to your personal refinement.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-6xl mx-auto flex justify-center gap-8 mb-20 border-b elegant-border-b pb-6"
        >
          <button
            onClick={() => setFilter('all')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'all'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            All <span className="text-[10px] ml-1 opacity-60">[{stylists.length}]</span>
          </button>
          <button
            onClick={() => setFilter('female')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'female'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Female Specialists
          </button>
          <button
            onClick={() => setFilter('male')}
            className={`font-sans text-xs uppercase tracking-widest transition-colors ${filter === 'male'
              ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 font-medium'
              : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'
              }`}
          >
            Male Specialists
          </button>
        </motion.div>

        {/* Specialists Grid */}
        <div className="max-w-6xl mx-auto">
          {filteredStylists.length > 0 ? (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
            >
              {filteredStylists.map((stylist, index) => (
                <motion.div
                  key={stylist._id}
                  {...fadeInUp}
                  transition={{ delay: 0.5 + Math.min(index * 0.1, 0.5) }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-56 h-72 bg-[#ebe8e1] mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#DDA7A5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    {stylist.imageUrl ? (
                      <img src={stylist.imageUrl} alt={stylist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-5xl text-[#1A1A1A]/20">
                        {getInitials(stylist.name)}
                      </div>
                    )}
                  </div>

                  <h3 className="text-3xl font-serif text-[#1A1A1A] mb-2">{stylist.name}</h3>
                  <p className="font-sans font-medium text-xs uppercase tracking-widest text-[#DDA7A5] mb-4">
                    {stylist.specialty || "Master Stylist"}
                  </p>

                  <p className="text-[#1A1A1A]/70 font-sans font-light text-sm leading-relaxed mb-6 max-w-xs">
                    {stylist.bio || "A dedicated professional with a passion for creative vision and absolute perfection in every detail."}
                  </p>

                  <div className="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-4">
                    {stylist.experience && <span>{stylist.experience} YRS EXP</span>}
                    {stylist.rating && <span>• {stylist.rating} STR</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div {...fadeInUp} className="text-center py-24">
              <p className="text-[#1A1A1A]/40 text-lg font-serif italic">No specialists match your refinement.</p>
            </motion.div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
}

export default StylistPage;

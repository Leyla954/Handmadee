"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FloatButton } from "antd"; 
import { ArrowLeftOutlined } from "@ant-design/icons";
import Drawermenu from "../drawermenu/Drawermenu";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  // Menyunu beynəlxalq standartlara uyğunlaşdırdıq
  const pages = [
    { id: 1, title: "Shop", href: "/shop" },
    { id: 2, title: "Collections", href: "/dressing" },
    { id: 3, title: "About Us", href: "/about" },
    { id: 4, title: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-white p-6 overflow-x-hidden">
      
      {/* Drawer Menu */}
      <Drawermenu open={drawerOpen} setOpen={setDrawerOpen} />

      {/* Overlay: Drawer açılanda arxa fonu yumşaq qaraldır */}
      {drawerOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-[55] transition-opacity duration-500 backdrop-blur-sm" 
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Floating Trigger Button */}
      {!drawerOpen && (
        <div className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-gradient-to-tr from-black to-gray-700 text-white px-5 py-4 rounded-l-full shadow-2xl flex items-center transition-all hover:pr-10 hover:scale-105 active:scale-95"
          >
            <ArrowLeftOutlined className="text-2xl animate-pulse" />
          </button>
        </div>
      )}

      {/* Visual Image Section */}
      <div
        className="absolute top-0 left-0 h-full w-[45%] mt-[5%] md:mt-[10%] z-0 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/png-cartoon-adult-black-woman_53876-924726.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
          opacity: drawerOpen ? 0.1 : 1,
          filter: drawerOpen ? "grayscale(100%)" : "none",
        }}
      />

      {/* Right Blank Space */}
      <div
        className="absolute top-0 right-0 h-full w-[35%] bg-white z-0 transition-opacity duration-500"
        style={{ opacity: drawerOpen ? 0.2 : 1 }}
      />

      {/* Menu Cards Section */}
      <div className="relative z-10 flex flex-col items-end w-full pr-6 md:pr-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-lg mt-10 md:mt-24">
          {pages.map((page) => (
            <Link key={page.id} href={page.href}>
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#434343] text-white p-12 md:p-16 rounded-3xl shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group overflow-hidden">
                {/* Number Background */}
                <span className="absolute top-2 left-4 text-6xl font-black text-white/10 group-hover:text-white/20 transition-all duration-500 group-hover:scale-150">
                  {page.id}
                </span>
                <h2 className="text-2xl font-bold tracking-widest uppercase italic">{page.title}</h2>
                <div className="w-0 group-hover:w-full h-1 bg-white/50 mt-2 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Top */}
      {showBackTop && (
        <FloatButton.BackTop 
          duration={600}
          style={{ left: 30, bottom: 30 }} 
          className="hover:scale-110 transition-transform"
        />
      )}
    </main>
  );
};

export default Home;
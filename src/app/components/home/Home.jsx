"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FloatButton } from "antd"; 
import { ArrowLeftOutlined, ExperimentOutlined, FireOutlined } from "@ant-design/icons";
import Drawermenu from "../drawermenu/Drawermenu";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  // Sənin biznes planına uyğun qlobal AI bölmələri
  const aiPages = [
    { id: 1, title: "Business Card AI", href: "/design-center/business-card", desc: "Digital Identity", icon: "🗂️" },
    { id: 2, title: "Logo Master AI", href: "/design-center/logo-maker", desc: "Brand Creator", icon: "🎨" },
    { id: 3, title: "Interior Render", href: "/design-center/interior-architect", desc: "Dream Home AI", icon: "🏠" },
    { id: 4, title: "Fashion Lab", href: "/design-center/fashion-studio", desc: "AI Wear Design", icon: "👕" },
    { id: 5, title: "PDF Architect", href: "/design-center/pdf-pro", desc: "Document Expert", icon: "📄" },
    { id: 6, title: "Social Media Kit", href: "/design-center/social-kit", desc: "Viral Content", icon: "📱" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-[#f8f9fa] p-6 overflow-x-hidden">
      
      <Drawermenu open={drawerOpen} setOpen={setDrawerOpen} />

      {/* Overlay */}
      {drawerOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/40 z-[55] transition-opacity duration-500 backdrop-blur-md" 
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Floating Menu Trigger */}
      {!drawerOpen && (
        <div className="fixed top-1/2 right-0 z-50 transform -translate-y-1/2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-black text-white px-6 py-5 rounded-l-full shadow-2xl flex items-center transition-all hover:pr-12 hover:bg-gray-800 group"
          >
            <ArrowLeftOutlined className="text-2xl group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Hero Section Background (Leyla və s. üçün vizual yer) */}
      <div
        className="absolute top-0 left-0 h-full w-[40%] mt-[5%] z-0 pointer-events-none transition-all duration-700 hidden lg:block"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-photo/png-cartoon-adult-black-woman_53876-924726.jpg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          opacity: drawerOpen ? 0.05 : 0.8,
        }}
      />

      {/* Content Header */}
      <div className="relative z-10 w-full max-w-7xl mt-12 md:mt-20 px-4 md:px-10">
        <div className="flex flex-col items-start md:items-end mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-2 uppercase tracking-tighter">
                Dreams <span className="text-gray-400">AI</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs md:text-sm">
                Global Creative Ecosystem <FireOutlined className="text-orange-500" />
            </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:ml-auto lg:w-2/3">
          {aiPages.map((page) => (
            <Link key={page.id} href={page.href}>
              <div className="group relative bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden">
                
                {/* Hover-da görünən arxa fon parıltısı */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                    <div className="text-4xl mb-4 bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-500">
                        {page.icon}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-black transition-colors">
                        {page.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">
                        {page.desc}
                    </p>

                    <div className="flex items-center text-xs font-bold text-black group-hover:gap-2 transition-all">
                        EXPLORE AI <ArrowLeftOutlined className="rotate-180 ml-2" />
                    </div>
                </div>

                {/* Arxa planda böyük nömrə */}
                <span className="absolute bottom-[-10%] right-[-5%] text-9xl font-black text-gray-50 group-hover:text-gray-100 transition-colors duration-500 z-0 select-none">
                  {page.id}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to Top */}
      {showBackTop && (
        <FloatButton.BackTop 
          duration={800}
          style={{ right: 30, bottom: 30 }} 
          className="bg-black text-white hover:bg-gray-800"
        />
      )}
    </main>
  );
};

export default Home;
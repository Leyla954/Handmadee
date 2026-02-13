"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { 
  HeartOutlined, 
  ShoppingCartOutlined, 
  UserAddOutlined, 
  LoginOutlined, 
  CloseOutlined 
} from "@ant-design/icons";
import Signup from "../../(auth)/signup/Signup";
import Login from "../../(auth)/login/Login";
import Logout from "../../(auth)/logout/Logout";

const Drawermenu = ({ open, setOpen }) => {
  const drawerRef = useRef(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  
  // Xətanı düzəltmək üçün əlavə olunan state
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  const drawerBgImage = !isAuthenticated
    ? "url('https://www.transparenttextures.com/patterns/cubes.png')"
    : user?.gender === "female"
      ? "url('https://freepngimg.com/download/flower/30411-8-colorful-flowers-transparent-image.png')"
      : "url('https://toppng.com/uploads/preview/football-goal-futsal-mrm-kr-alkdm-11563128540f8f4xlrit9.png')";

  useEffect(() => {
    // Komponent mount olduqda mounted-i true et
    setMounted(true);

    const handleClickOutside = (event) => {
      if (signupOpen || loginOpen) return;
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, signupOpen, loginOpen]);

  // Əgər komponent hələ brauzerdə tam yüklənməyibsə, heç nə render etmə (Hydration-u qoruyur)
  if (!mounted) return null;

  const openLogin = () => {
    setSignupOpen(false);
    setTimeout(() => setLoginOpen(true), 300);
  };

  const openSignup = () => {
    setLoginOpen(false);
    setTimeout(() => setSignupOpen(true), 300);
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-[90] backdrop-blur-sm transition-opacity" />}

      <div
        ref={drawerRef}
        className={`fixed top-1/2 right-0 z-[100] transform -translate-y-1/2 transition-all duration-500 ease-in-out ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 shadow-none"
        }`}
        style={{
          width: "min(400px, 90vw)",
          height: "85vh",
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), ${drawerBgImage}`,
          backgroundSize: isAuthenticated ? "contain" : "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "40px 0 0 40px",
          boxShadow: open ? "-20px 0 60px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <button 
          onClick={() => setOpen(false)} 
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300"
        >
          <CloseOutlined />
        </button>

        <div className="flex-1 flex flex-col justify-center gap-6">
          {isAuthenticated ? (
            <div className="flex flex-col gap-6">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <span className="text-xs text-gray-400 uppercase tracking-[0.2em] block mb-2">Welcome back</span>
                <h2 className="text-4xl font-bold text-black italic" style={{ fontFamily: "cursive" }}>
                  {user?.nickname || user?.firstName || "Dreamer"}
                </h2>
              </div>
              
              <Link href="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-gray-700 hover:text-black hover:translate-x-2 transition-all">
                <HeartOutlined className="text-2xl text-red-400" /> Wishlist
              </Link>
              
              <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-4 text-xl text-gray-700 hover:text-black hover:translate-x-2 transition-all">
                <ShoppingCartOutlined className="text-2xl text-blue-400" /> Shopping Cart
              </Link>
              
              <div className="mt-10 pt-6 border-t border-gray-100">
                <Logout onLogoutSuccess={() => setOpen(false)} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl font-black tracking-tighter italic border-l-4 border-black pl-4 mb-4 uppercase">
                DREAMS MENU
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-xl font-medium text-gray-300 cursor-not-allowed">
                  <HeartOutlined className="text-2xl" /> Wishlist
                </div>
                <div className="flex items-center gap-4 text-xl font-medium text-gray-300 cursor-not-allowed">
                  <ShoppingCartOutlined className="text-2xl" /> Shopping Cart
                </div>
              </div>
              
              <div className="mt-8 flex flex-col gap-4">
                <button
                  onClick={() => { setOpen(false); setTimeout(() => setLoginOpen(true), 300); }}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                  <LoginOutlined /> Login
                </button>

                <button
                  onClick={() => { setOpen(false); setTimeout(() => setSignupOpen(true), 300); }}
                  className="flex items-center justify-center gap-3 w-full py-4 border-2 border-black text-black rounded-xl font-bold hover:bg-black hover:text-white transition-all active:scale-95"
                >
                  <UserAddOutlined /> Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Signup 
        open={signupOpen} 
        onClose={() => setSignupOpen(false)} 
        onLoginClick={openLogin} 
      />
      <Login 
        open={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onSignUpClick={openSignup} 
      />
    </>
  );
};

export default Drawermenu;
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, MailOutlined, CrownOutlined, CloudOutlined, HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import Logout from "../../(auth)/logout/Logout";
import { Spin } from "antd";

const User = () => {
  const dispatch = useDispatch();
  
  // Redux-dan həm user məlumatlarını, həm də loading state-ini çəkirik
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Əgər loading state-i varsa (məlumat API-dan hələ gəlməyibsə) spinner göstərək
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#000' }} spin />} />
      </div>
    );
  }

  // Giriş edilməyibsə göstərilən hissə
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4 animate-in fade-in duration-700">
        <div className="text-center p-12 border-2 border-dashed border-gray-100 rounded-[3rem] bg-white/50 backdrop-blur-sm">
          <UserOutlined className="text-6xl text-gray-200 mb-6" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Private Space</h3>
          <p className="text-gray-400 text-base max-w-[250px] mx-auto">
            Please sign in to view your dream profile and saved wishes.
          </p>
        </div>
      </div>
    );
  }

  // API-dan gələn gender məlumatına görə avatar təyini
  const avatarUrl = user.gender === "female" 
    ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png" 
    : "https://cdn-icons-png.flaticon.com/512/4128/4128176.png";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[50px] p-10 w-full max-w-md border border-gray-50 relative overflow-hidden">
        
        {/* Artistic Background Header */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-0" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Profile Image with Ring Effect */}
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-white">
              <img 
                src={user.avatar || avatarUrl} // Əgər API-da özəl avatar varsa onu işlət
                alt="Profile" 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-yellow-400 p-2 rounded-full border-4 border-white shadow-sm">
              <CrownOutlined className="text-white text-lg" />
            </div>
          </div>

          {/* User Details - API-dan gələn real datalar */}
          <h2 className="text-4xl font-black text-gray-800 mb-1 tracking-tight" style={{ fontFamily: "cursive" }}>
            {user.nickname || user.firstName || "Dreamer"}
          </h2>
          
          <p className="text-gray-400 flex items-center gap-2 mb-8 font-medium">
            <MailOutlined className="text-purple-400" /> {user.email}
          </p>

          {/* Stats Section - Bunları da gələcəkdə API-dan gələn user.dreams.length kimi yaza bilərsən */}
          <div className="grid grid-cols-2 gap-6 w-full mb-10">
            <div className="bg-gray-50/50 p-5 rounded-[2rem] text-center border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <CloudOutlined className="text-2xl text-blue-400 mb-2" />
              <span className="block text-2xl font-black text-gray-800">12</span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[2px]">Dreams</span>
            </div>
            <div className="bg-gray-50/50 p-5 rounded-[2rem] text-center border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <HeartOutlined className="text-2xl text-pink-400 mb-2" />
              <span className="block text-2xl font-black text-gray-800">5</span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[2px]">Wishes</span>
            </div>
          </div>

          {/* Logout Component */}
          <div className="w-full">
            <Logout />
          </div>
        </div>
      </div>

      <p className="mt-10 text-gray-300 italic text-sm tracking-wide">
        "Your dreams are the blueprints of your ultimate achievements."
      </p>
    </div>
  );
};

export default User;
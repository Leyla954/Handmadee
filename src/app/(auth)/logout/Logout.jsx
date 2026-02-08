"use client";

import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
// Slice-dakı adın 'logout' olduğunu fərz edirəm
import { logout } from "@/app/redux/features/authSlice"; 
import { message } from "antd";
import { useEffect, useState } from "react";
import { logoutSchema } from "@/app/schema/logoutSchema";

const Logout = ({ onLogoutSuccess }) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    // 1. Redux logout çağırılır (LocalStorage artıq slice içində təmizlənir)
    dispatch(logout());

    // 2. Bildiriş
    message.success(logoutSchema.successMsg);

    // 3. Callback (Drawer-i bağlamaq üçün)
    onLogoutSuccess?.();
  };

  if (!mounted) return null;

  return (
    <div
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 cursor-pointer font-bold text-white rounded-lg px-6 py-3 transition-all duration-300"
      style={{ 
        background: "linear-gradient(90deg, #1a1a1a, #434343)",
        width: "100%",
        marginTop: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      <LogoutOutlined style={{ fontSize: "18px" }} />
      <span style={{ letterSpacing: "0.5px" }}>{logoutSchema.buttonText}</span>
    </div>
  );
};

export default Logout;
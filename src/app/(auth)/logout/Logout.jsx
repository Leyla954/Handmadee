"use client";

import { LogoutOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "@/app/redux/features/authSlice"; 
import { App } from "antd"; // message və modal üçün ən yaxşı yol App-dir
import { useEffect, useState } from "react";
import { logoutSchema } from "@/app/schema/logoutSchema";

const Logout = ({ onLogoutSuccess }) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  
  // Antd App context-indən istifadə edirik (Providers-də quraşdırdığımız üçün)
  const { message, modal } = App.useApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    modal.confirm({
      title: logoutSchema.confirmQuestion,
      icon: <ExclamationCircleFilled />,
      okText: logoutSchema.confirmOk,
      okType: 'danger',
      cancelText: logoutSchema.confirmCancel,
      centered: true,
      onOk() {
        // 1. Redux state-ini təmizləyirik
        dispatch(logout());

        // 2. LocalStorage təmizlənməsi (Adətən bu slice daxilində edilir, amma burada da qeyd etmək olar)
        localStorage.removeItem("user");

        // 3. Bildiriş
        message.success(logoutSchema.successMsg);

        // 4. Callback (məsələn: Drawer-i bağlamaq)
        onLogoutSuccess?.();
      },
    });
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        userSelect: "none"
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
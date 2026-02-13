"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { 
  AppstoreOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  ThunderboltOutlined 
} from "@ant-design/icons";

export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  const avatars = {
    female: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
    male: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg"
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col p-8 sticky top-0 h-screen">
        <div className="mb-12">
          <Link href="/" className="text-2xl font-black tracking-tighter">DREAMS</Link>
          <div className="text-[10px] font-bold text-gray-400 tracking-widest mt-1">CREATIVE CONSOLE</div>
        </div>

        {/* Dynamic Profile Card based on Gender */}
        <div className="p-6 rounded-[2.5rem] bg-gray-50 border border-gray-100 mb-8 flex flex-col items-center text-center">
          <img 
            src={user?.gender === "female" ? avatars.female : avatars.male} 
            alt="User Avatar" 
            className="w-24 h-24 rounded-[2rem] object-cover mb-4 shadow-xl border-4 border-white"
          />
          <h3 className="font-black text-gray-900 text-lg uppercase leading-tight">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">{user?.email}</p>
          <div className="mt-4 px-4 py-1.5 bg-black text-white text-[9px] font-black rounded-full">
            {user?.gender?.toUpperCase() || 'USER'} ACCOUNT
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-4 p-4 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl transition-all font-bold text-sm">
            <AppstoreOutlined className="text-lg" /> MY PROJECTS
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-4 p-4 text-gray-500 hover:text-black hover:bg-gray-50 rounded-2xl transition-all font-bold text-sm">
            <SettingOutlined className="text-lg" /> ACCOUNT SETTINGS
          </Link>
        </nav>

        {/* Upgrade Card */}
        <div className="bg-black p-5 rounded-3xl text-white mt-auto relative overflow-hidden group">
          <ThunderboltOutlined className="absolute right-[-10px] top-[-10px] text-6xl opacity-10 group-hover:rotate-12 transition-transform" />
          <p className="text-[10px] font-bold text-gray-400 mb-1">PRO PLAN</p>
          <p className="text-xs font-bold leading-tight">Unlock Unlimited AI Generations</p>
          <button className="mt-3 text-[10px] font-black bg-white text-black px-4 py-2 rounded-full w-full">UPGRADE NOW</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyActivities, deleteSingleActivity } from "@/app/redux/features/activitySlice";
import { Empty, Skeleton, Tag, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.activities);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchMyActivities(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-16">
        <div>
          <h1 className="text-5xl font-black text-black uppercase tracking-tighter">My Library</h1>
          <p className="text-gray-400 font-medium mt-2 uppercase text-xs tracking-[0.2em]">Manage your creative workspace</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[10px] font-black text-gray-400 uppercase">Total Designs</div>
            <div className="text-2xl font-black">{items.length}</div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <Skeleton.Button key={i} active className="!w-full !h-64 rounded-3xl" />)}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((act) => (
            <div key={act.id} className="group bg-white rounded-[2.5rem] border border-gray-100 p-2 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 w-full bg-gray-50 rounded-[2rem] overflow-hidden">
                <img 
                  src={act.previewImage || "https://placehold.co/600x400?text=AI+Design+Preview"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Design"
                />
                <div className="absolute top-4 left-4">
                  <Tag className="bg-black/80 backdrop-blur-md text-white border-none px-3 py-1 rounded-full text-[10px] font-bold">
                    {act.type?.toUpperCase()}
                  </Tag>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{act.title}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">Created: {new Date(act.createdAt).toLocaleDateString()}</p>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <div className="flex gap-2">
                    <Tooltip title="Delete Permanently">
                      <button 
                        onClick={() => dispatch(deleteSingleActivity(act.id))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <DeleteOutlined />
                      </button>
                    </Tooltip>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-black hover:text-white transition-all">
                      <EyeOutlined />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider group-hover:mr-2 transition-all">
                    Edit <ArrowRightOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <Empty description={<span className="text-gray-400 font-bold uppercase text-xs tracking-widest">No projects found in your library</span>} />
          <Link href="/" className="mt-8 inline-block bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Start Designing
          </Link>
        </div>
      )}
    </div>
  );
}
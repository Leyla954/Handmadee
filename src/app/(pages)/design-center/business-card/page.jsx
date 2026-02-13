"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, ColorPicker, message, Spin, Slider, Select, Segmented, Upload, Button } from "antd";
import { 
  SaveOutlined, 
  DownloadOutlined, 
  BorderOutlined, 
  BgColorsOutlined,
  LayoutOutlined,
  PictureOutlined,
  UploadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { saveNewActivity } from "@/app/redux/features/activitySlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BusinessCardAI() {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [design, setDesign] = useState({
    title: "Luxury Business Card",
    name: "John Doe",
    role: "Global Strategist",
    email: "contact@dreams.ai",
    phone: "+1 000 000 00",
    color: "#000000",
    textColor: "#ffffff",
    borderRadius: 32,
    layout: "split", 
    pattern: "none",
    cardSize: "standard",
    // Yeni Əlavələr:
    graphicTheme: "none", 
    customImage: null, 
    graphicOpacity: 0.4
  });

  // Hazır Mövzu Şəkilləri (Transparent PNG-lər)
  const themeImages = {
    flowers: "https://www.transparentpng.com/download/floral/nature-floral-transparent-background-4.png",
    gaming: "https://i.ibb.co/688r9P9/gaming-controller.png", // Örnək linklər
    fitness: "https://i.ibb.co/3Wf4rWv/fitness.png",
    abstract: "https://i.ibb.co/mBfL3Z0/abstract-shape.png"
  };

  // Şəkil Yükləmə Funksiyası
  const handleImageUpload = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => setDesign({ ...design, customImage: e.target.result });
    reader.readAsDataURL(info.file.originFileObj);
    return false; // Avtomatik serverə göndərməni dayandırır
  };

  const handleDownload = async () => {
    setDownloading(true);
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");
    
    const dimensions = { standard: [90, 50], square: [65, 65], vertical: [50, 90] };
    const size = dimensions[design.cardSize];
    const pdf = new jsPDF(size[0] > size[1] ? "l" : "p", "mm", size);
    pdf.addImage(imgData, "PNG", 0, 0, size[0], size[1]);
    pdf.save(`${design.title}.pdf`);
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col md:flex-row font-sans">
      {/* LEFT: Editor Panel */}
      <aside className="w-full md:w-[450px] bg-white border-r border-gray-200 p-8 flex flex-col gap-6 overflow-y-auto h-screen sticky top-0 custom-scrollbar">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-black">Studio <span className="text-blue-600">AI</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Personalized Brand Architect</p>
        </div>

        {/* 1. Theme & Graphics (YENİ) */}
        <section className="space-y-4 bg-blue-50/50 p-5 rounded-3xl border border-blue-100">
          <h3 className="text-xs font-black uppercase text-blue-600 flex items-center gap-2">
            <PictureOutlined /> Visual Themes & Elements
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold mb-2">SELECT DECOR THEME</p>
              <Select 
                className="w-full"
                value={design.graphicTheme}
                onChange={(v) => setDesign({...design, graphicTheme: v})}
                options={[
                  { label: 'None', value: 'none' },
                  { label: '🌸 Floral / Nature', value: 'flowers' },
                  { label: '🎮 Gaming / Tech', value: 'gaming' },
                  { label: '🏋️ Fitness / Sports', value: 'fitness' },
                  { label: '🎨 Abstract Shapes', value: 'abstract' }
                ]}
              />
            </div>
            
            <div className="pt-2">
              <p className="text-[10px] font-bold mb-2">UPLOAD OWN LOGO/IMAGE</p>
              <Upload showUploadList={false} beforeUpload={handleImageUpload}>
                <Button icon={<UploadOutlined />} className="w-full rounded-xl border-dashed">Click to Upload</Button>
              </Upload>
              {design.customImage && (
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => setDesign({...design, customImage: null})}
                  className="w-full mt-2 text-[10px] font-bold"
                > REMOVE IMAGE </Button>
              )}
            </div>

            <div>
              <p className="text-[10px] font-bold mb-1">GRAPHIC OPACITY</p>
              <Slider min={0.1} max={1} step={0.1} value={design.graphicOpacity} onChange={(v) => setDesign({...design, graphicOpacity: v})} />
            </div>
          </div>
        </section>

        {/* 2. Shape & Layout */}
        <section className="space-y-4 bg-gray-50 p-5 rounded-3xl">
          <h3 className="text-xs font-black uppercase text-gray-500 flex items-center gap-2">
            <LayoutOutlined /> Layout & Structure
          </h3>
          <Segmented
            block
            options={[{ label: 'Std', value: 'standard' }, { label: 'Sq', value: 'square' }, { label: 'Vert', value: 'vertical' }]}
            value={design.cardSize}
            onChange={(v) => setDesign({...design, cardSize: v})}
          />
          <Select 
            className="w-full"
            value={design.layout}
            onChange={(v) => setDesign({...design, layout: v})}
            options={[{ label: 'Centered', value: 'centered' }, { label: 'Split View', value: 'split' }, { label: 'Minimal', value: 'minimal' }]}
          />
          <div className="flex gap-4">
            <div className="flex-1 p-2 bg-white rounded-xl shadow-sm flex justify-between items-center">
              <span className="text-[9px] font-bold">BG</span>
              <ColorPicker value={design.color} onChange={(c) => setDesign({...design, color: c.toHexString()})} />
            </div>
            <div className="flex-1 p-2 bg-white rounded-xl shadow-sm flex justify-between items-center">
              <span className="text-[9px] font-bold">TEXT</span>
              <ColorPicker value={design.textColor} onChange={(c) => setDesign({...design, textColor: c.toHexString()})} />
            </div>
          </div>
        </section>

        {/* 3. Identity Data */}
        <section className="space-y-3">
          <Input placeholder="Full Name" value={design.name} onChange={(e) => setDesign({...design, name: e.target.value})} className="rounded-xl p-3 font-bold" />
          <Input placeholder="Professional Role" value={design.role} onChange={(e) => setDesign({...design, role: e.target.value})} className="rounded-xl p-3 font-bold text-xs" />
        </section>

        <div className="mt-auto pt-6 space-y-3">
          <button onClick={handleDownload} className="w-full py-4 border-2 border-black text-black rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            {downloading ? "Generating..." : <><DownloadOutlined /> Download PDF</>}
          </button>
          <button onClick={() => message.info("Saving...")} className="w-full py-4 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2">
            <SaveOutlined /> Save to Library
          </button>
        </div>
      </aside>

      {/* RIGHT: Dynamic Canvas Preview */}
      <main className="flex-1 flex items-center justify-center p-10 bg-[#F0F2F5]">
        <div 
          ref={cardRef}
          className={`shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col border border-white/10
            ${design.cardSize === 'standard' ? 'w-[630px] h-[360px]' : ''}
            ${design.cardSize === 'square' ? 'w-[450px] h-[450px]' : ''}
            ${design.cardSize === 'vertical' ? 'w-[360px] h-[630px]' : ''}
          `}
          style={{ 
            backgroundColor: design.color, 
            color: design.textColor,
            borderRadius: `${design.borderRadius}px`
          }}
        >
          {/* THEME DECOR IMAGE (AI Themes) */}
          {design.graphicTheme !== "none" && (
            <img 
              src={themeImages[design.graphicTheme]} 
              className="absolute top-0 right-0 h-full w-full object-cover pointer-events-none transition-all duration-700"
              style={{ opacity: design.graphicOpacity, mixBlendMode: 'screen' }} 
              alt="theme-bg"
            />
          )}

          {/* CUSTOM LOGO / IMAGE LAYER */}
          {design.customImage && (
            <div className="absolute top-10 right-10 w-24 h-24 z-20 group">
               <img src={design.customImage} className="w-full h-full object-contain drop-shadow-lg" alt="custom-logo" />
            </div>
          )}

          {/* TEXT CONTENT LAYER */}
          <div className={`relative z-10 w-full h-full p-12 flex flex-col justify-between 
            ${design.layout === 'centered' ? 'items-center text-center' : ''}
            ${design.layout === 'split' ? 'items-start text-left' : ''}
            ${design.layout === 'minimal' ? 'items-end text-right' : ''}
          `}>
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">{design.name}</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 bg-white/10 px-2 py-1 inline-block rounded-md">{design.role}</p>
            </div>

            <div className="space-y-1 backdrop-blur-sm bg-black/5 p-4 rounded-2xl inline-block">
               <p className="text-sm font-bold opacity-80">{design.email}</p>
               <p className="text-sm font-bold opacity-80">{design.phone}</p>
            </div>
          </div>

          {/* Luxury Decors */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-8 right-8 opacity-30 font-black text-2xl tracking-tighter italic border-t border-white/20 pt-2">DREAMS AI</div>
        </div>
      </main>
    </div>
  );
}
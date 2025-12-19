
import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const Metrics: React.FC = () => {
  const data = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      name: i.toString(),
      liquidity: 90 + Math.random() * 10,
      encryption: 100,
    }));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass p-6 rounded-lg border-t-2 border-blue-600 relative overflow-hidden group">
        <div className="absolute right-2 top-2 text-[8px] text-blue-500 font-bold uppercase">ความลื่นไหล: ปรับแต่งแล้ว</div>
        <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-widest">กระแสสภาพคล่องข้อมูล</div>
        <div className="text-3xl font-black text-white tracking-tighter">4.8 <span className="text-xs text-blue-600">TB/วินาที</span></div>
        <div className="h-16 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="monotone" dataKey="liquidity" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass p-6 rounded-lg border-t-2 border-red-600 relative overflow-hidden group">
        <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-widest">ความหนาแน่นโล่อธิปไตย</div>
        <div className="text-3xl font-black text-white tracking-tighter">1024 <span className="text-xs text-red-600">BIT_Q</span></div>
        <div className="h-16 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="step" dataKey="encryption" stroke="#dc2626" fill="#dc2626" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-6 rounded-lg border-t-2 border-green-600 relative overflow-hidden flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-widest">สถานะสุขภาพท่อส่งตรง</div>
        <div className="text-3xl font-black text-green-500 tracking-widest text-center uppercase">สมบูรณ์แบบ</div>
        <div className="mt-4 flex justify-between items-center text-[9px] text-gray-600 px-2 bg-black/40 py-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 
            เสริมพลังโดย CISCO
          </span>
          <span className="text-white font-bold tracking-tighter">ไร้ความหน่วง</span>
        </div>
      </div>
    </div>
  );
};

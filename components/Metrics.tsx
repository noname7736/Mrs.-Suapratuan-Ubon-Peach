
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const Metrics: React.FC = () => {
  const data = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      name: i.toString(),
      throughput: 85 + Math.random() * 15,
      saturation: 90 + Math.random() * 10,
      stability: 100,
    }));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Pro Metrics Card 1 */}
      <div className="glass p-6 rounded-lg border-t-2 border-red-600 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-24 h-24 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
        </div>
        <div className="text-[10px] text-gray-500 mono uppercase mb-1 tracking-widest">Logic Engine Velocity</div>
        <div className="text-3xl font-black text-white mono tracking-tighter">18.42 <span className="text-xs text-red-600">PFLOPS</span></div>
        <div className="h-16 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="step" dataKey="throughput" stroke="#dc2626" fill="#dc2626" fillOpacity={0.05} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Pro Metrics Card 2 */}
      <div className="glass p-6 rounded-lg border-t-2 border-blue-600 relative overflow-hidden group">
        <div className="text-[10px] text-gray-500 mono uppercase mb-1 tracking-widest">Global Signal Mirror</div>
        <div className="text-3xl font-black text-white mono tracking-tighter">99.9% <span className="text-xs text-blue-600">SYNC</span></div>
        <div className="h-16 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="monotone" dataKey="saturation" stroke="#2563eb" fill="#2563eb" fillOpacity={0.05} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pro Metrics Card 3 */}
      <div className="glass p-6 rounded-lg border-t-2 border-green-600 relative overflow-hidden flex flex-col justify-center">
        <div className="text-[10px] text-gray-500 mono uppercase mb-1 tracking-widest">Buffer Integrity</div>
        <div className="text-3xl font-black text-green-500 mono tracking-widest text-center">ZERO_BUG</div>
        <div className="mt-4 flex justify-between items-center text-[9px] mono text-gray-600 px-2">
          <span>ALGO: FORMAL_VERIFIED</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

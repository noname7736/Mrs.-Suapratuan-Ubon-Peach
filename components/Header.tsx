
import React from 'react';
import { SystemStatus } from '../types';

interface HeaderProps {
  status: SystemStatus;
  lastUpdate: string;
}

export const Header: React.FC<HeaderProps> = ({ status, lastUpdate }) => {
  return (
    <header className="h-24 border-b border-red-600/20 flex items-center justify-between px-10 glass z-20 shadow-[0_4px_30px_rgba(255,0,0,0.1)]">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-5 h-5 rounded-full bg-red-600 animate-pulse-intense glow-red-strong shadow-[0_0_20px_#f00]"></div>
          <div className="absolute top-0 left-0 w-5 h-5 rounded-full border-2 border-red-500 animate-ping"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter mono uppercase text-white leading-none">
            OMNIVISION <span className="text-red-600">3MAX</span> PRO
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] mono text-red-500/90 font-bold tracking-[0.4em] bg-red-600/10 px-2 py-0.5 rounded border border-red-600/20">
              FIGURES MODE'S PLUS
            </span>
            <span className="text-[9px] mono text-gray-500 font-bold uppercase animate-pulse">
              [ COLD LOGIC ACTIVE ]
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-16 text-xs mono">
        <div className="flex flex-col items-end">
          <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">แกนการประมวลผลอิสระ</span>
          <span className="text-green-500 font-black tracking-widest shadow-green-500/20 drop-shadow-md">IBM z16 / HPE FLEX</span>
        </div>
        <div className="flex flex-col items-end border-l border-white/10 pl-10">
          <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">สถานะบงการข้อมูล</span>
          <span className="text-white font-black bg-white/5 px-2 rounded">TOTAL DOMINATION</span>
        </div>
        <div className="flex flex-col items-end border-l border-white/10 pl-10">
          <span className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">การประสานเวลาอธิปไตย</span>
          <span className="text-red-600 font-black text-sm">{lastUpdate}</span>
        </div>
      </div>
    </header>
  );
};

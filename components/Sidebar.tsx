
import React, { useState } from 'react';
import { ViewType } from '../App';

const NavItem: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`px-4 py-3 cursor-pointer transition-all border-l-2 flex items-center justify-between group ${active ? 'bg-blue-950/20 border-blue-600 text-white shadow-[inset_10px_0_15px_-5px_rgba(37,99,235,0.2)]' : 'border-transparent hover:bg-white/5 text-gray-500 hover:text-gray-300'}`}
  >
    <span className="text-[11px] font-bold uppercase tracking-tighter">{label}</span>
    {active && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_#00f]"></div>}
  </div>
);

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onCommand: (cmd: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onCommand }) => {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommand('');
    }
  };

  return (
    <aside className="w-64 border-r border-red-600/10 flex flex-col bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600/40 to-transparent"></div>
      
      <div className="p-6">
        <div className="p-4 border border-blue-600/30 bg-blue-950/10 rounded relative group overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-600/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
          <div className="text-[9px] text-blue-500 mb-1 font-black tracking-widest uppercase relative z-10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            ยืนยันตัวตนผู้บงการ
          </div>
          <div className="text-sm font-black text-white relative z-10">บี เซอร์เวย์ (B SURVEY)</div>
          <div className="text-[8px] text-gray-500 mt-1 uppercase relative z-10">ระดับ: อธิปไตยเบ็ดเสร็จ</div>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 space-y-1">
        <div className="px-6 mb-3 text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">ศูนย์บัญชาการเบ็ดเสร็จ</div>
        <NavItem label="ภาพรวมเครือข่ายประสาท" active={activeView === 'OVERVIEW'} onClick={() => onViewChange('OVERVIEW')} />
        <NavItem label="บริหารพนักงานดิจิทัล" active={activeView === 'WORKFORCE'} onClick={() => onViewChange('WORKFORCE')} />
        <NavItem label="โหนดเครือข่ายสารสนเทศ" active={activeView === 'NODES'} onClick={() => onViewChange('NODES')} />
        <NavItem label="การวิเคราะห์สัญญาณ" active={activeView === 'SIGNALS'} onClick={() => onViewChange('SIGNALS')} />
        <NavItem label="ลำดับตรรกะอิสระ" active={activeView === 'LOGIC'} onClick={() => onViewChange('LOGIC')} />
      </nav>

      <div className="p-6 border-t border-red-600/10 space-y-4 bg-black/40">
        <div className="space-y-2">
          <label className="text-[10px] mono text-gray-600 uppercase tracking-widest font-bold">คอนโซลคำสั่งทางทหาร</label>
          <form onSubmit={handleCommandSubmit}>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="ป้อนคำสั่งลับ..."
              className="w-full bg-black border border-red-900/30 rounded px-3 py-2.5 text-[11px] text-red-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all placeholder:text-gray-800 mono font-bold"
            />
          </form>
        </div>
        
        <button 
          onClick={() => onCommand("AGENT_FULL_AUTONOMY_OVERRIDE")}
          className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white text-[11px] font-black uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 border border-blue-400/20"
        >
          เปิดโหมดอิสระเต็มพิกัด
        </button>
      </div>
    </aside>
  );
};

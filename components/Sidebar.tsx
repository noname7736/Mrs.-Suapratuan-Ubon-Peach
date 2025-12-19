
import React, { useState } from 'react';

const NavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div className={`px-4 py-3 cursor-pointer transition-colors border-l-2 ${active ? 'bg-red-950/20 border-red-600 text-white' : 'border-transparent hover:bg-white/5 text-gray-500'}`}>
    <span className="text-[11px] font-bold uppercase tracking-tighter">{label}</span>
  </div>
);

interface SidebarProps {
  onCommand: (cmd: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCommand }) => {
  const [command, setCommand] = useState('');

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommand('');
    }
  };

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0a0a0a]">
      <div className="p-6">
        <div className="p-4 border border-red-900/50 bg-red-950/10 rounded">
          <div className="text-[10px] text-red-500 mb-1 font-bold tracking-widest uppercase">การยืนยันตัวตนผู้บงการ</div>
          <div className="text-sm font-bold text-white">คุณ บี เซอร์เวย์ (B SURVEY)</div>
        </div>
      </div>
      
      <nav className="flex-1 mt-4">
        <div className="px-6 mb-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">ศูนย์บัญชาการเบ็ดเสร็จ</div>
        <NavItem label="ภาพรวมเครือข่ายประสาท" active />
        <NavItem label="โหนดเครือข่ายสารสนเทศ" />
        <NavItem label="การวิเคราะห์สัญญาณ" />
        <NavItem label="ลำดับตรรกะอิสระ" />
        <NavItem label="โปรโตคอลคลังข้อมูล" />
      </nav>

      <div className="p-6 border-t border-white/10 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] mono text-gray-500 uppercase tracking-widest">คอนโซลคำสั่ง</label>
          <form onSubmit={handleCommandSubmit}>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="ป้อนคำสั่ง..."
              className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[11px] text-red-500 focus:outline-none focus:border-red-600 placeholder:text-gray-800"
            />
          </form>
        </div>
        
        <button 
          onClick={() => onCommand("SYSTEM_WIDE_OVERRIDE_INITIATED")}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase transition-all glow-red"
        >
          ควบคุมเบ็ดเสร็จทั้งหมด
        </button>
      </div>
    </aside>
  );
};


import React, { useState } from 'react';

const NavItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div className={`px-4 py-3 cursor-pointer transition-colors border-l-2 ${active ? 'bg-red-950/20 border-red-600 text-white' : 'border-transparent hover:bg-white/5 text-gray-500'}`}>
    <span className="mono text-xs uppercase tracking-tighter">{label}</span>
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
          <div className="text-[10px] text-red-500 mb-1 font-bold tracking-widest uppercase">Operator Auth</div>
          <div className="text-sm font-bold text-white mono">B_SURVEY_MASTER</div>
        </div>
      </div>
      
      <nav className="flex-1 mt-4">
        <div className="px-6 mb-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">Control Center</div>
        <NavItem label="Neural Overview" active />
        <NavItem label="Network Nodes" />
        <NavItem label="Signal Analysis" />
        <NavItem label="Logic Sequence" />
        <NavItem label="Archive Protocol" />
      </nav>

      <div className="p-6 border-t border-white/10 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] mono text-gray-500 uppercase tracking-widest">Command Console</label>
          <form onSubmit={handleCommandSubmit}>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="ENTER COMMAND..."
              className="w-full bg-black border border-white/10 rounded px-3 py-2 text-[10px] mono text-red-500 focus:outline-none focus:border-red-600 placeholder:text-gray-800"
            />
          </form>
        </div>
        
        <button 
          onClick={() => onCommand("SYSTEM_WIDE_OVERRIDE_INITIATED")}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold mono uppercase transition-all glow-red"
        >
          Override All
        </button>
      </div>
    </aside>
  );
};

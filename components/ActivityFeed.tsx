
import React from 'react';
import { AuditEntry } from '../types';

interface ActivityFeedProps { logs: AuditEntry[]; }

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ logs }) => {
  const getSeverityColor = (severity: AuditEntry['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-900/20 shadow-[0_0_10px_rgba(255,0,0,0.2)]';
      case 'high': return 'text-orange-500 bg-orange-950/10';
      case 'medium': return 'text-yellow-500 bg-yellow-950/10';
      default: return 'text-blue-500 bg-blue-950/10';
    }
  };

  const getCategoryPrefix = (category: AuditEntry['category']) => {
    switch (category) {
      case 'AGENT_ACTION': return 'เอเจนต์>';
      case 'OPERATOR_CMD': return 'คำสั่ง>';
      case 'SYSTEM_ALERT': return 'ระบบ!';
      case 'NETWORK_EVENT': return 'เครือข่าย~';
      case 'SOVEREIGN_PIPE': return 'ท่อส่ง|';
      default: return 'บันทึก|';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    const ms = String(date.getMilliseconds()).padStart(3, '0');
    return `${h}:${m}:${s}.${ms}`;
  };

  return (
    <div className="flex-1 flex flex-col glass rounded-lg border border-red-900/10 overflow-hidden relative">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/60 backdrop-blur-xl">
        <div className="flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-[0.1em] text-white">บันทึกการตรวจสอบอธิปไตย</h3>
          <span className="text-[9px] text-red-500/50 uppercase tracking-widest font-bold">ตรวจสอบสภาพคล่องและการป้องกันแล้ว</span>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
             <span className="text-[10px] text-white font-black uppercase">ลื่นไหล</span>
           </div>
           <span className="text-[9px] text-gray-600">การป้องกัน: 100.00%</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px]">
        {logs.map((log) => (
          <div key={log.id} className="flex flex-col gap-1.5 border-l-2 border-red-900/20 pl-4 py-2 hover:bg-white/5 transition-all rounded-r group relative border-b border-white/5 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-bold shrink-0 text-[9px]">
                  [{formatTimestamp(log.timestamp)}]
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter ${getSeverityColor(log.severity)}`}>
                  {getCategoryPrefix(log.category)}
                </span>
                <span className="text-white font-bold tracking-tight">{log.actor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-blue-500/40 font-bold">ยืนยันการไหล</span>
                <span className="text-gray-700 text-[8px] mono opacity-0 group-hover:opacity-100">#{log.id}</span>
              </div>
            </div>
            
            <div className="text-gray-400 pl-4 relative">
              <span className={`absolute left-0 font-black ${log.category === 'SOVEREIGN_PIPE' ? 'text-blue-500' : 'text-red-600'}`}>»</span>
              <span className="text-gray-100 font-bold uppercase">{log.action}:</span>
              <span className="ml-2 text-gray-500 leading-relaxed font-sans text-[11px]">{log.details}</span>
            </div>
          </div>
        ))}
        
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-800 mono space-y-6">
            <div className="w-16 h-16 border-4 border-dashed border-blue-950 rounded-full animate-[spin_4s_linear_infinite]"></div>
            <div className="animate-pulse uppercase tracking-[0.5em] text-[10px]">กำลังฉีดสภาพคล่อง...</div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/5 bg-black/40 text-[9px] mono text-gray-500 flex justify-between items-center">
        <span>จำนวนบันทึก: {logs.length.toString().padStart(4, '0')}</span>
        <div className="flex items-center gap-2">
           <span className="text-blue-900 uppercase">ตรวจสอบการไหล:</span>
           <span className="text-green-600 font-bold">สมบูรณ์</span>
        </div>
      </div>
    </div>
  );
};

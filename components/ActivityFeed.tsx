
import React from 'react';
import { AuditEntry } from '../types';

interface ActivityFeedProps {
  logs: AuditEntry[];
}

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
      case 'AGENT_ACTION': return 'AGT_MAX>';
      case 'OPERATOR_CMD': return 'PRO_CMD>';
      case 'SYSTEM_ALERT': return 'SYS_PRO!';
      case 'NETWORK_EVENT': return 'NET_FLX~';
      default: return 'PRO_LOG|';
    }
  };

  return (
    <div className="flex-1 flex flex-col glass rounded-lg border border-red-900/10 overflow-hidden relative">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/60 backdrop-blur-xl">
        <div className="flex flex-col">
          <h3 className="text-xs font-black mono uppercase tracking-[0.2em] text-white">PRO AUDIT TRAIL</h3>
          <span className="text-[8px] text-red-500/50 mono uppercase tracking-widest">SUPER 3MAX PRO VERIFIED RECORDS</span>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>
             <span className="text-[10px] text-white mono font-black">STABLE</span>
           </div>
           <span className="text-[8px] text-gray-600 mono">BUGS: 0.00%</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px]">
        {logs.map((log) => (
          <div key={log.id} className="flex flex-col gap-1.5 border-l-2 border-red-900/20 pl-4 py-2 hover:bg-white/5 transition-all rounded-r group relative border-b border-white/5 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-bold shrink-0 text-[9px]">
                  [{new Date(log.timestamp).toLocaleTimeString('en-GB', { hour12: false, minute: '2-digit', second: '2-digit' })}]
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-tighter ${getSeverityColor(log.severity)}`}>
                  {getCategoryPrefix(log.category)}
                </span>
                <span className="text-white font-bold tracking-tight">{log.actor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-green-500/40 font-bold">VERIFIED_SECURE</span>
                <span className="text-gray-700 text-[8px] mono opacity-0 group-hover:opacity-100">#{log.id}</span>
              </div>
            </div>
            
            <div className="text-gray-400 pl-4 relative">
              <span className="absolute left-0 text-red-600 font-black">»</span>
              <span className="text-gray-100 font-bold uppercase">{log.action}:</span>
              <span className="ml-2 text-gray-500 leading-relaxed">{log.details}</span>
            </div>
          </div>
        ))}
        
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-800 mono space-y-6">
            <div className="w-16 h-16 border-4 border-dashed border-red-950 rounded-full animate-[spin_4s_linear_infinite]"></div>
            <div className="animate-pulse uppercase tracking-[0.5em] text-[10px]">SYNCING WITH LOGIC CORE...</div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/5 bg-black/40 text-[9px] mono text-gray-500 flex justify-between items-center">
        <span>LOG_COUNT: {logs.length.toString().padStart(4, '0')}</span>
        <div className="flex items-center gap-2">
           <span className="text-red-900">INTEGRITY_CHECK:</span>
           <span className="text-green-600 font-bold">OPTIMAL</span>
        </div>
      </div>
    </div>
  );
};

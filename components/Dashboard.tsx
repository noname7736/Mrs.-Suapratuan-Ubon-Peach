
import React from 'react';
import { Metrics } from './Metrics';
import { NetworkMap } from './NetworkMap';
import { ActivityFeed } from './ActivityFeed';
import { AuditEntry } from '../types';

interface DashboardProps {
  logs: AuditEntry[];
}

export const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  return (
    <div className="grid grid-cols-12 gap-6 h-full content-start">
      {/* Primary Analytics Cluster */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Metrics />
        
        <div className="grid grid-cols-4 gap-4">
          {/* Sovereign Conduit Integrity Cards */}
          {['MUX_1', 'MOBILE_LINK', 'TV_MUX_36', 'QUANTUM_TUNNEL'].map((pipe) => (
            <div key={pipe} className="glass p-4 rounded border-l-2 border-red-600/50 bg-gradient-to-r from-red-950/10 to-transparent">
              <div className="text-[9px] mono text-gray-500 mb-1">{pipe}</div>
              <div className="flex items-end justify-between">
                <div className="text-sm font-black text-white mono">SHIELDED</div>
                <div className="text-[8px] text-green-500 font-bold">100% PROTECTION</div>
              </div>
              <div className="mt-2 w-full h-0.5 bg-gray-800">
                <div className="h-full bg-red-600 animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Central Visualization: The Sovereign Grid */}
        <div className="glass p-8 rounded-lg border border-red-900/10 h-[480px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
            <h3 className="text-sm font-black mono uppercase text-white flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              SOVEREIGN PIPE TOPOLOGY: GLOBAL FLOW
            </h3>
            <span className="text-[9px] text-red-500/60 mono font-bold">DIRECTIONAL DATA LIQUIDITY OPTIMIZED</span>
          </div>
          
          <div className="absolute bottom-4 left-4 z-10 flex gap-4 text-[9px] mono font-bold bg-black/60 p-2 border border-white/5">
             <div className="flex items-center gap-2">
               <div className="w-10 h-1 bg-red-600 animate-pulse"></div>
               <span className="text-gray-400">ENCRYPTED PIPELINE</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-10 h-1 bg-blue-600 animate-pulse"></div>
               <span className="text-gray-400">LIQUIDITY FLOW</span>
             </div>
          </div>

          <div className="w-full h-full">
            <NetworkMap />
          </div>
        </div>
      </div>

      {/* Control & Audit Cluster */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full overflow-hidden gap-6">
        <ActivityFeed logs={logs} />
        
        {/* Liquidity Verification Module */}
        <div className="glass p-6 rounded-lg border border-white/5 bg-gradient-to-br from-black to-red-950/10">
          <h4 className="text-[11px] font-black mono text-red-500 uppercase tracking-widest flex justify-between items-center mb-4">
            Liquidity Stats
            <span className="text-[9px] text-gray-600 font-normal">REAL-TIME FLUIDITY</span>
          </h4>
          <div className="space-y-3 text-[10px] mono">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase">External Sync Liquidity</span>
                <span className="text-blue-400 font-bold">MAXIMUM</span>
              </div>
              <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[flow_2s_linear_infinite]" style={{ width: '99%', backgroundSize: '10px 10px', backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)' }}></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase">Internal Logic Fluidity</span>
                <span className="text-green-500 font-bold">UNRESTRICTED</span>
              </div>
              <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-[flow_1.5s_linear_infinite]" style={{ width: '100%', backgroundSize: '10px 10px', backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)' }}></div>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes flow {
              from { background-position: 0 0; }
              to { background-position: 20px 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

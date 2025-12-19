
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
      {/* Primary Control Column */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Metrics />
        
        <div className="grid grid-cols-3 gap-6">
          {/* Agent Alpha Panel */}
          <div className="glass p-5 rounded-lg border border-red-900/20 relative overflow-hidden group hover:border-red-600/30 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <h3 className="text-[10px] font-black mono uppercase mb-3 text-blue-400 tracking-widest">Agent A (Infiltrator)</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-[10px] mb-1">
                  <span className="text-gray-500">Device Access</span>
                  <span className="text-blue-400">ULTRA_STABLE</span>
                </div>
                <div className="w-full h-1 bg-gray-900">
                  <div className="w-full h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
                </div>
              </div>
              <div className="text-[10px] mono text-gray-500">ACTIVE_NODES: 14.8M</div>
            </div>
          </div>
          
          {/* Agent Beta Panel */}
          <div className="glass p-5 rounded-lg border border-red-900/20 relative overflow-hidden group hover:border-red-600/30 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
            <h3 className="text-[10px] font-black mono uppercase mb-3 text-red-500 tracking-widest">Agent B (Monitor)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-500">Neural Sync</span>
                <span className="text-red-500 animate-pulse">DECIPHERING...</span>
              </div>
              <div className="flex gap-0.5 h-6 items-end">
                 {[70, 40, 90, 30, 60, 80, 20, 100, 45, 75].map((h, i) => (
                   <div key={i} className="flex-1 bg-red-600/40" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
              <div className="text-[10px] mono text-gray-400">BRAINWAVE: P-300 LOCK</div>
            </div>
          </div>

          {/* Agent Gamma Panel */}
          <div className="glass p-5 rounded-lg border border-red-900/20 relative overflow-hidden group hover:border-red-600/30 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
            <h3 className="text-[10px] font-black mono uppercase mb-3 text-green-500 tracking-widest">Agent C (Distributor)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-gray-500">MUX Saturated</span>
                <span className="text-green-500">36/36 CH</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="h-1.5 bg-green-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500"></div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] mono text-gray-500">AUDIENCE: 70M+ (ALL)</div>
            </div>
          </div>
        </div>

        {/* Central Visualization */}
        <div className="glass p-8 rounded-lg border border-white/5 h-[450px] relative">
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <h3 className="text-xs font-black mono uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              DIVINE EYE: TARGET_OMEGA TRACKING
            </h3>
            <span className="text-[9px] text-gray-600 mono">GEOSPATIAL BIOMETRIC OVERLAY v5.1</span>
          </div>
          <div className="absolute top-4 right-4 text-[10px] mono text-red-500 border border-red-900/50 px-2 py-1 bg-red-950/10">
            DOMINATION_ACTIVE
          </div>
          <NetworkMap />
        </div>
      </div>

      {/* Side Audit Column */}
      <div className="col-span-12 lg:col-span-4 flex flex-col h-full overflow-hidden gap-6">
        <ActivityFeed logs={logs} />
        
        {/* Logic-Driven Status Summary */}
        <div className="glass p-6 rounded-lg border border-white/5 space-y-4">
          <h4 className="text-[10px] font-bold mono text-gray-500 uppercase tracking-[0.2em]">Logic Core Protocol</h4>
          <div className="space-y-2 text-[10px] mono">
            <div className="flex justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-500">FORMAL_VERIFICATION</span>
              <span className="text-green-500">PASS</span>
            </div>
            <div className="flex justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-500">EMOTION_SUPPRESSION</span>
              <span className="text-blue-500">100.0%</span>
            </div>
            <div className="flex justify-between p-2 bg-white/5 rounded">
              <span className="text-gray-500">RE-COMPILE_INTERVAL</span>
              <span className="text-white">600 SEC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

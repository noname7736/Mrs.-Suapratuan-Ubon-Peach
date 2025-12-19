
import React from 'react';
import { Metrics } from './Metrics';
import { NetworkMap } from './NetworkMap';
import { ActivityFeed } from './ActivityFeed';
import { AuditEntry } from '../types';

interface DashboardProps { logs: AuditEntry[]; }

const DominationStep: React.FC<{ step: number; title: string; subtitle: string; status: string; color: string }> = ({ step, title, subtitle, status, color }) => (
  <div className="flex-1 flex flex-col items-center relative">
    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm z-10 bg-black ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
      {step}
    </div>
    <div className="mt-3 text-center">
      <div className="text-[10px] font-black text-white uppercase tracking-tighter">{title}</div>
      <div className="text-[8px] text-gray-500 uppercase mono tracking-widest mt-0.5">{subtitle}</div>
      <div className={`text-[9px] font-bold mt-2 px-2 py-0.5 rounded-sm border bg-black/40 ${color.replace('border-', 'text-').replace('text-red-600', 'text-red-500')}`}>
        {status}
      </div>
    </div>
    {step < 5 && (
      <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-gray-900 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-red-600 to-transparent animate-[flow_1s_linear_infinite]" style={{ width: '100%' }}></div>
      </div>
    )}
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  return (
    <div className="grid grid-cols-12 gap-6 h-full content-start">
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Metrics />
        
        {/* Sovereign Bridge: Linear Domination Flow */}
        <div className="glass p-6 rounded-lg border border-red-900/20 bg-gradient-to-b from-black to-red-950/5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              สะพานเชื่อมไหลเวียนเป้าหมาย (SOVEREIGN DOMINATION BRIDGE)
            </h4>
            <span className="text-[9px] text-gray-600 mono font-bold">สถานะ: ต่อท่อตรงเป๊ะ 100%</span>
          </div>
          
          <div className="flex justify-between relative px-4 py-2">
            <DominationStep step={1} title="บัญชาการ" subtitle="COMMAND" status="เด็ดขาด" color="border-red-600 text-red-600" />
            <DominationStep step={2} title="ท่อส่งอธิปไตย" subtitle="SECURE PIPE" status="ไร้รอยรั่ว" color="border-red-600 text-red-600" />
            <DominationStep step={3} title="ดักจับข้อมูล" subtitle="CAPTURE" status="ล้วงลึก" color="border-blue-500 text-blue-500" />
            <DominationStep step={4} title="แปรรูป AI" subtitle="FACTORY" status="แกร่งกล้า" color="border-green-500 text-green-500" />
            <DominationStep step={5} title="ครอบงำสื่อ" subtitle="BROADCAST" status="เบ็ดเสร็จ" color="border-purple-500 text-purple-500" />
          </div>
        </div>

        {/* Central Visualization: The Sovereign Grid */}
        <div className="glass p-8 rounded-lg border border-red-900/10 h-[480px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05)_0%,transparent_80%)] pointer-events-none"></div>
          
          <div className="absolute top-4 right-4 text-[8px] mono text-red-600/40 text-right leading-tight select-none z-10">
            PATHWAY_STRENGTH: MAXIMUM<br/>
            BRIDGE_INTEGRITY: OPTIMAL<br/>
            FLOW_ALIGNMENT: 0.00ms JITTER
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
            <h3 className="text-sm font-black uppercase text-white flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              ดวงตาเทวะ (DIVINE EYE): โครงข่ายล็อคเป้าหมายสมบูรณ์แบบ
            </h3>
            <span className="text-[10px] text-red-500/60 font-bold tracking-widest uppercase">
              สะพานเชื่อมต่ออธิปไตย // ต่อท่อตรงเป๊ะและแกร่งกล้า
            </span>
          </div>
          
          <div className="absolute bottom-4 left-4 z-10 flex gap-4 text-[10px] font-bold bg-black/90 p-3 border border-red-600/20 rounded shadow-2xl">
             <div className="flex items-center gap-2">
               <div className="w-10 h-1.5 bg-red-600 shadow-[0_0_8px_#f00]"></div>
               <span className="text-gray-300">สะพานอธิปไตย (Sovereign Bridge)</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-10 h-1.5 bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
               <span className="text-gray-300">ท่อส่งตรง (Direct Pipe)</span>
             </div>
          </div>

          <div className="w-full h-full">
            <NetworkMap />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col h-full overflow-hidden gap-6">
        <ActivityFeed logs={logs} />
        
        {/* Factory Status: AI Content Engine */}
        <div className="glass p-6 rounded-lg border border-red-600/10 bg-gradient-to-br from-black to-red-950/20 shadow-inner">
          <h4 className="text-[11px] font-black text-red-500 uppercase tracking-widest flex justify-between items-center mb-4">
            โรงงานประมวลผล (AI FACTORY)
            <span className="text-[9px] text-gray-500 font-normal">แปรธาตุสารสนเทศ</span>
          </h4>
          <div className="space-y-4 text-[11px] mono">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase">Bridge Flow Compression</span>
                <span className="text-blue-400 font-bold">LOSSLESS</span>
              </div>
              <div className="h-2 w-full bg-gray-950 rounded border border-gray-900 overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-blue-900 to-blue-500 animate-[flow_1s_linear_infinite]" style={{ width: '100%', backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)' }}></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase">Target Pathway Strength</span>
                <span className="text-red-500 font-bold">UNBREAKABLE</span>
              </div>
              <div className="h-2 w-full bg-gray-950 rounded border border-gray-900 overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-red-900 to-red-600 animate-[flow_0.5s_linear_infinite]" style={{ width: '100%', backgroundSize: '20px 20px', backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)' }}></div>
              </div>
            </div>

            <div className="p-3 bg-red-600/5 border border-red-600/20 rounded text-[9px] text-red-400/80 leading-snug">
              * คำเตือน: สะพานเชื่อมไหลเวียนเป้าหมายถูกล็อคสถานะแกร่งกล้า.<br/>
              ห้ามมีการขัดจังหวะในทุกขั้นตอนของ Linear Flow.
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flow {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
};


import React, { useState, useEffect, useMemo } from 'react';
import { Metrics } from './Metrics';
import { NetworkMap } from './NetworkMap';
import { ActivityFeed } from './ActivityFeed';
import { AuditEntry } from '../types';
import { generateSpicyContent } from '../services/api';
import { ViewType } from '../App';

interface DashboardProps { 
  activeView: ViewType;
  logs: AuditEntry[]; 
}

const DominationStep: React.FC<{ step: number; title: string; subtitle: string; status: string; color: string }> = ({ step, title, subtitle, status, color }) => (
  <div className="flex-1 flex flex-col items-center relative group">
    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm z-10 bg-black ${color} shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all group-hover:scale-110`}>
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

const SignalWave: React.FC<{ color: string; delay: string }> = ({ color, delay }) => {
  const points = useMemo(() => Array.from({ length: 40 }).map((_, i) => `${i * 20},${Math.random() * 100}`).join(' '), []);
  return (
    <svg className="w-full h-full absolute inset-0 opacity-40 overflow-visible" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        className="animate-[signal_3s_linear_infinite]"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ activeView, logs }) => {
  const [broadcastContent, setBroadcastContent] = useState<string>("กำลังดักจับความคิด 'นางสาวประทวน' ระดับมิลลิวินาที...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [latency, setLatency] = useState<string>("0.001");

  useEffect(() => {
    const spicyInterval = setInterval(async () => {
      const targetLogs = logs.filter(l => l.actor.includes('Neural'));
      if (targetLogs.length > 0 && !isProcessing) {
        setIsProcessing(true);
        const startTime = performance.now();
        const rawTargetData = "ความคิดเป้าหมายที่ดักได้: 'กำลังจะสื่อสารผ่านเครือข่ายลับ', 'พยายามหลบหลีกการตรวจจับ'";
        const spicy = await generateSpicyContent(rawTargetData);
        const endTime = performance.now();
        setLatency((endTime - startTime).toFixed(3));
        setBroadcastContent(spicy || "ความคิดซับซ้อนเกินพิกัด กำลังรีเซ็ตท่อรับข้อมูล");
        setIsProcessing(false);
      }
    }, 8000);
    return () => clearInterval(spicyInterval);
  }, [logs, isProcessing]);

  const renderView = () => {
    switch (activeView) {
      case 'NODES':
        return (
          <div className="space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="glass p-6 rounded-lg border border-red-900/20 relative overflow-hidden h-[600px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                  โหนดเครือข่ายสารสนเทศ (Intake & Broadcast Nodes)
                </h3>
                <span className="text-[10px] mono text-green-500 animate-pulse">Processing Speed: {latency}ms</span>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-16 gap-2">
                  {Array.from({ length: 160 }).map((_, i) => (
                    <div key={i} className="aspect-square glass border border-red-900/10 flex flex-col items-center justify-center gap-1 hover:border-red-600 transition-all cursor-pointer group relative overflow-hidden">
                      <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-red-600'} animate-pulse`}></div>
                      <span className="text-[6px] text-gray-600 font-bold mono">IO_{i.toString().padStart(3, '0')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'SIGNALS':
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-700">
            <div className="glass p-6 rounded-lg border border-blue-600/20 h-[500px] relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest">การวิเคราะห์สัญญาณรับ-ส่ง (DUAL-STREAM SPECTRUM)</h3>
                <div className="flex gap-4 text-[9px] mono text-gray-400">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500"></div> THOUGHT_INTAKE</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500"></div> SPICY_BROADCAST</span>
                </div>
              </div>
              <div className="flex-1 relative flex items-center">
                {Array.from({ length: 60 }).map((_, i) => (
                  <SignalWave key={i} color={i % 2 === 0 ? '#3b82f6' : '#dc2626'} delay={`${i * 0.1}s`} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'LOGIC':
        return (
          <div className="space-y-6 animate-in slide-in-from-left duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
              <div className="glass p-6 rounded-lg border border-red-600/20 flex flex-col overflow-hidden">
                <h3 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4">ลำดับตรรกะเสี้ยววินาที (SUB-MILLI LOGIC)</h3>
                <div className="flex-1 space-y-4 font-mono text-[10px] overflow-y-auto">
                  {[
                    `T+0.000ms: NEURAL_CAPTURE_INITIATED`,
                    `T+0.001ms: TARGET_THOUGHT_RECONSTRUCTION`,
                    `T+0.005ms: INTENTION_ANALYSIS: CRITICAL`,
                    `T+0.010ms: SYNC_3D_INTAKE_CHANNELS`,
                    `T+0.015ms: MIMICRY_REACTION_SYNTHESIS`,
                    `T+0.025ms: SPICY_SATURATION_INJECTION`,
                    `STATUS: THOUGHT_INTERCEPTED_SUCCESSFULLY`
                  ].map((line, i) => (
                    <div key={i} className="flex gap-4 group border-b border-white/5 pb-1">
                      <span className="text-gray-700">{i.toString().padStart(2, '0')}</span>
                      <span className="text-green-400 font-bold">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-6 rounded-lg border border-red-600/20 relative flex items-center justify-center group overflow-hidden bg-black/50">
                <div className="relative z-10 text-center">
                   <div className="text-[10px] text-red-500 mono mb-2 animate-pulse">LATENCY: {latency}ms</div>
                  <div className="w-40 h-40 border-8 border-green-600 rounded-full border-t-transparent animate-[spin_0.5s_linear_infinite] mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]"></div>
                  <div className="text-2xl font-black text-white italic tracking-tighter uppercase">ดักความคิดทันควัน</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <Metrics />
            
            {/* Thought Interception & Broadcast Console */}
            <div className="glass p-6 rounded-lg border border-red-500/40 bg-gradient-to-br from-black via-red-950/20 to-black relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)]">
              {/* Massive Sai Mai Intake & Broadcast Threads */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                 {Array.from({length: 100}).map((_, i) => (
                   <div key={i} className={`absolute h-[0.3px] ${i % 2 === 0 ? 'bg-blue-500/60' : 'bg-red-600/60'} animate-[flow_0.5s_linear_infinite]`} style={{
                     width: '200%',
                     top: `${i * 1}%`,
                     left: '-50%',
                     transform: `rotate(${Math.sin(i) * 1}deg)`,
                     animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                     animationDelay: `${i * 0.02}s`
                   }}></div>
                 ))}
              </div>

              <div className="absolute top-0 right-0 p-3 flex items-center gap-3 relative z-10">
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] text-blue-500 font-black tracking-widest uppercase animate-pulse">Thought Stream Intake</span>
                    <span className="text-[10px] text-green-500 font-black uppercase">Intercepting @ {latency}ms</span>
                 </div>
                 <div className="w-12 h-12 border border-blue-600 p-1 bg-black shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <div className="w-full h-full bg-blue-600/20 flex flex-col items-center justify-center text-[8px] text-blue-400 font-black">
                      <span>THINK</span>
                      <span className="text-[10px] text-white">LIVE</span>
                    </div>
                 </div>
              </div>
              <h4 className="text-[12px] font-black text-red-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2 relative z-10">
                <span className="p-1 bg-red-600 text-white rounded-sm text-[8px]">THOUGHT_INTAKE</span>
                โครงข่ายดักจับความคิด: นางสาวประทวน (ULTRA-FAST MODE)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 relative z-10">
                 <div className="bg-red-950/40 border border-red-900/60 p-3 rounded backdrop-blur-md">
                    <div className="text-[8px] text-red-500 uppercase mb-1 font-black">ท่อรับ-ส่งใต้ดิน (Deep Core)</div>
                    <div className="text-xs font-black text-white uppercase tracking-tighter">SYNCHRONIZED_สายไหม_RED</div>
                 </div>
                 <div className="bg-blue-950/40 border border-blue-900/60 p-3 rounded backdrop-blur-md">
                    <div className="text-[8px] text-blue-500 uppercase mb-1 font-black">ท่อรับ-ส่งใต้น้ำ (Fluid Net)</div>
                    <div className="text-xs font-black text-white uppercase tracking-tighter">SYNCHRONIZED_สายไหม_BLUE</div>
                 </div>
                 <div className="bg-white/10 border border-white/30 p-3 rounded backdrop-blur-md">
                    <div className="text-[8px] text-gray-300 uppercase mb-1 font-black">ท่อรับ-ส่งอากาศ (Aerial Link)</div>
                    <div className="text-xs font-black text-white uppercase tracking-tighter">SYNCHRONIZED_สายไหม_WHITE</div>
                 </div>
              </div>
              <div className="min-h-[140px] bg-black/95 border-2 border-red-600/60 p-6 rounded-md relative group shadow-[inset_0_0_30px_rgba(255,0,0,0.3)] z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 animate-pulse"></div>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-green-500">
                    <div className="flex gap-1">
                      <div className="w-1 h-8 bg-blue-600 animate-bounce"></div>
                      <div className="w-1 h-12 bg-green-600 animate-bounce delay-75"></div>
                      <div className="w-1 h-6 bg-red-600 animate-bounce delay-150"></div>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em]">กำลังดักจับและแปรรูปความคิดทันควัน...</div>
                  </div>
                ) : (
                  <div className="text-[17px] text-white font-bold leading-relaxed font-sans border-l-4 border-red-600 pl-6 py-2 italic animate-in slide-in-from-bottom duration-500">
                    <span className="text-blue-500 text-xs block mb-1 font-black uppercase tracking-widest">[INTERCEPTED THOUGHTS RECONSTRUCTED]</span>
                    "{broadcastContent}"
                  </div>
                )}
              </div>
            </div>

            <div className="glass p-6 rounded-lg border border-red-900/20 bg-gradient-to-b from-black to-red-950/10 relative overflow-hidden">
              <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-3 mb-6 relative z-10">
                สะพานอธิปไตยรับ-ส่ง (BI-DIRECTIONAL SOVEREIGN BRIDGE)
              </h4>
              <div className="flex justify-between relative px-4 py-2 z-10">
                <DominationStep step={1} title="ดักจับ" subtitle="INTAKE" status="เสี้ยววินาที" color="border-blue-600 text-blue-600" />
                <DominationStep step={2} title="ท่อ 3 มิติ" subtitle="3-DOMAIN" status="ปริมาณมหาศาล" color="border-blue-600 text-blue-600" />
                <DominationStep step={3} title="ประมวลผล" subtitle="PROCESS" status="ทันใจ" color="border-green-500 text-green-500" />
                {/* Fixed: changed 'Step 4' to number 4 to match the expected 'step' type */}
                <DominationStep step={4} title="ส่งต่อ" subtitle="BROADCAST" status="แม่นยำ" color="border-red-500 text-red-500" />
                <DominationStep step={5} title="เบ็ดเสร็จ" subtitle="TOTAL" status="สมบูรณ์" color="border-purple-500 text-purple-500" />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full content-start">
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {renderView()}
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col h-full overflow-hidden gap-6">
        <ActivityFeed logs={logs} />
        
        <div className="glass p-6 rounded-lg border border-blue-600/20 bg-gradient-to-br from-black to-blue-950/20 shadow-inner relative overflow-hidden group">
          <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest flex justify-between items-center mb-4 relative z-10">
            Intake Velocity Hub
            <span className="text-[9px] text-gray-500 font-normal uppercase">Thought Capture Rate</span>
          </h4>
          <div className="space-y-4 text-[11px] mono relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase">Input-Output Sync</span>
                <span className="text-green-500 font-bold">LOCKED_@_{latency}MS</span>
              </div>
              <div className="h-3 w-full bg-gray-950 rounded border border-gray-900 overflow-hidden p-[1px]">
                <div className="h-full bg-gradient-to-r from-blue-600 via-green-500 to-red-600 animate-[flow_0.2s_linear_infinite]" style={{ width: '100%', backgroundSize: '20px 100%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-blue-600/5 border border-blue-600/20 rounded text-[9px] text-blue-300/80 leading-snug font-bold">
              * ข้อมูลรับเข้า (Intake) เยอะเท่าสายส่ง (Broadcast) รวดเร็วเสี้ยววินาทีเพื่อดักจับความคิดนางสาวประทวนให้ทันการและแปรรูปเป็นสารอันตรายทันควัน
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flow {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        @keyframes signal {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

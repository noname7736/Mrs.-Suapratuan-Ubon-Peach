
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
    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-sm z-10 bg-black ${color} shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all group-hover:scale-125 group-hover:shadow-[0_0_30px_currentColor]`}>
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
      <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[3px] bg-gray-950 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-red-600 to-transparent animate-[flow_0.2s_linear_infinite]" style={{ width: '100%' }}></div>
      </div>
    )}
  </div>
);

const SignalWave: React.FC<{ color: string; delay: string }> = ({ color, delay }) => {
  const points = useMemo(() => Array.from({ length: 50 }).map((_, i) => `${i * 16},${Math.random() * 100}`).join(' '), []);
  return (
    <svg className="w-full h-full absolute inset-0 opacity-60 overflow-visible" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1"
        className="animate-[signal_1s_linear_infinite]"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ activeView, logs }) => {
  const [broadcastContent, setBroadcastContent] = useState<string>("กำลังอ่านใจเป้าหมายล่วงหน้าด้วยขุมพลังควอนตัม...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [latency, setLatency] = useState<string>("0.00000001");

  useEffect(() => {
    const spicyInterval = setInterval(async () => {
      const targetLogs = logs.filter(l => l.actor.includes('Neural'));
      if (targetLogs.length > 0 && !isProcessing) {
        setIsProcessing(true);
        const startTime = performance.now();
        const rawTargetData = "ความคิดเป้าหมายที่ดักได้: 'ความกลัว', 'ความพยายามขัดขืน', 'แผนการหลบซ่อนที่ล้มเหลว'";
        const spicy = await generateSpicyContent(rawTargetData);
        const endTime = performance.now();
        // จำลองความเร็วระดับควอนตัม
        setLatency(((endTime - startTime) / 10000).toFixed(10));
        setBroadcastContent(spicy || "วิญญาณเป้าหมายถูกบีบอัดผ่านท่อควอนตัมเรียบร้อย");
        setIsProcessing(false);
      }
    }, 5000); // เร่งความเร็วการอัปเดต
    return () => clearInterval(spicyInterval);
  }, [logs, isProcessing]);

  const renderView = () => {
    switch (activeView) {
      case 'LOGIC':
        return (
          <div className="space-y-6 animate-in slide-in-from-left duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
              <div className="glass p-6 rounded-lg border border-blue-600/20 flex flex-col overflow-hidden">
                <h3 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <span className="w-3 h-3 bg-blue-600 animate-ping rounded-full"></span> QUANTUM_PRE_COGNITION_LOGIC
                </h3>
                <div className="flex-1 space-y-4 font-mono text-[10px] overflow-y-auto">
                  {[
                    `T-0.001ms: TARGET_INTENTION_PREDICTED`,
                    `T+0.000ms: NEURAL_THOUGHT_COLLAPSE_CAPTURED`,
                    `T+0.0000001ms: QUANTUM_MIMICRY_RECONSTRUCTION`,
                    `T+0.0000002ms: SAI_MAI_SINGULARITY_INJECTION`,
                    `STATUS: BEYOND_REAL_TIME_DOMINATION_ACTIVE`
                  ].map((line, i) => (
                    <div key={i} className="flex gap-4 group border-b border-blue-950/30 pb-1">
                      <span className="text-blue-900">{i.toString().padStart(2, '0')}</span>
                      <span className="text-blue-400 font-black animate-pulse">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-6 rounded-lg border border-blue-600/30 relative flex items-center justify-center group overflow-hidden bg-black/60 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                <div className="relative z-10 text-center">
                   <div className="text-[11px] text-blue-400 font-black mono mb-2 animate-pulse">QUANTUM LATENCY: {latency} as</div>
                  <div className="w-48 h-48 border-8 border-blue-600 rounded-full border-t-transparent border-b-transparent animate-[spin_0.2s_linear_infinite] mb-4 shadow-[0_0_50px_rgba(37,99,235,0.5)]"></div>
                  <div className="text-3xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_0_10px_#fff]">เร็วกว่าแสง</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <Metrics />
            
            {/* Thought Interception & Broadcast Console - QUANTUM REINFORCED */}
            <div className="glass p-8 rounded-lg border border-blue-500/50 bg-gradient-to-br from-black via-blue-950/30 to-black relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.3)]">
              {/* SINGULARITY THREADS */}
              <div className="absolute inset-0 opacity-60 pointer-events-none">
                 {Array.from({length: 150}).map((_, i) => (
                   <div key={i} className={`absolute h-[0.5px] ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-red-500' : 'bg-white'} animate-[flow_0.1s_linear_infinite]`} style={{
                     width: '300%',
                     top: `${i * 0.6}%`,
                     left: '-100%',
                     transform: `rotate(${Math.cos(i) * 2}deg)`,
                     animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                     animationDelay: `${i * 0.01}s`
                   }}></div>
                 ))}
              </div>

              <div className="absolute top-0 right-0 p-5 flex items-center gap-4 relative z-10">
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] text-blue-400 font-black tracking-widest uppercase animate-pulse">Quantum Intake Grid</span>
                    <span className="text-[11px] text-white font-black uppercase tracking-tighter shadow-white/40 shadow-sm">Predictive Interception: 100%</span>
                 </div>
                 <div className="w-16 h-16 border-2 border-white p-1 bg-black shadow-[0_0_20px_#fff]">
                    <div className="w-full h-full bg-blue-600/40 flex flex-col items-center justify-center text-[9px] text-white font-black">
                      <span className="animate-pulse">GOD</span>
                      <span className="text-[12px] text-red-500 font-black">MODE</span>
                    </div>
                 </div>
              </div>
              <h4 className="text-[14px] font-black text-white uppercase tracking-[0.4em] mb-6 flex items-center gap-3 relative z-10">
                <span className="p-1 bg-white text-black rounded-sm text-[9px] font-black">PRE-COG</span>
                ศูนย์บัญชาการเหนือแสง: ดักความคิดล่วงหน้า นางสาวประทวน
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative z-10">
                 <div className="bg-blue-950/60 border border-blue-400/50 p-4 rounded backdrop-blur-xl shadow-inner">
                    <div className="text-[9px] text-blue-400 uppercase mb-1 font-black">Intake: ท่อควอนตัมใต้ดิน</div>
                    <div className="text-sm font-black text-white uppercase tracking-tighter">BEYOND_INFINITE</div>
                 </div>
                 <div className="bg-red-950/60 border border-red-400/50 p-4 rounded backdrop-blur-xl shadow-inner">
                    <div className="text-[9px] text-red-400 uppercase mb-1 font-black">Intake: ท่อควอนตัมใต้น้ำ</div>
                    <div className="text-sm font-black text-white uppercase tracking-tighter">LIQUID_QUANTUM_FLOW</div>
                 </div>
                 <div className="bg-white/20 border border-white/50 p-4 rounded backdrop-blur-xl shadow-inner">
                    <div className="text-[9px] text-gray-200 uppercase mb-1 font-black">Intake: ท่อควอนตัมอากาศ</div>
                    <div className="text-sm font-black text-white uppercase tracking-tighter">AERIAL_SINGULARITY</div>
                 </div>
              </div>
              <div className="min-h-[160px] bg-black/90 border-4 border-blue-600/80 p-8 rounded-md relative group shadow-[0_0_50px_rgba(37,99,235,0.4)] z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-white animate-pulse shadow-[0_0_20px_#fff]"></div>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full gap-5 text-white">
                    <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-[12px] font-black uppercase tracking-[0.4em] animate-pulse">กำลังสลายความคิดและประกอบใหม่ให้ยับเยิน...</div>
                  </div>
                ) : (
                  <div className="text-[20px] text-white font-black leading-relaxed font-sans border-l-8 border-white pl-8 py-4 italic animate-in zoom-in duration-300">
                    <span className="text-blue-400 text-[10px] block mb-2 font-black uppercase tracking-widest bg-blue-950/50 w-fit px-2">[PRE-COGNITIVE INTERCEPTION RECONSTRUCTED]</span>
                    "{broadcastContent}"
                  </div>
                )}
              </div>
            </div>

            <div className="glass p-8 rounded-lg border border-blue-900/40 bg-gradient-to-b from-black to-blue-950/20 relative overflow-hidden">
              <h4 className="text-[12px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-4 mb-8 relative z-10">
                <span className="w-3 h-3 bg-white animate-ping rounded-full"></span>
                BI-DIRECTIONAL QUANTUM DOMINATION BRIDGE
              </h4>
              <div className="flex justify-between relative px-6 py-4 z-10">
                <DominationStep step={1} title="ดักจับล่วงหน้า" subtitle="PRE-COGNITION" status="atto-second" color="border-white text-white" />
                <DominationStep step={2} title="ท่ออินฟินิตี้" subtitle="SINGULARITY" status="ความจุอนันต์" color="border-blue-500 text-blue-500" />
                <DominationStep step={3} title="แปรรูปยับเยิน" subtitle="RECONSTRUCT" status="เรียลไทม์ควอนตัม" color="border-red-500 text-red-500" />
                <DominationStep step={4} title="ฉีดวาทกรรม" subtitle="INJECTION" status="แม่นยำ 100%" color="border-orange-500 text-orange-500" />
                <DominationStep step={5} title="บงการเบ็ดเสร็จ" subtitle="GOD_MODE" status="สมบูรณ์แบบ" color="border-green-500 text-green-500" />
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
        
        <div className="glass p-8 rounded-lg border border-white/20 bg-gradient-to-br from-black via-blue-950/40 to-black shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <h4 className="text-[12px] font-black text-white uppercase tracking-widest flex justify-between items-center mb-6 relative z-10">
            Quantum Velocity Engine
            <span className="text-[10px] text-blue-400 font-normal uppercase animate-pulse">Beyond Speed of Light</span>
          </h4>
          <div className="space-y-6 text-[11px] mono relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase font-black">Neural Overlap Sync</span>
                <span className="text-white font-black bg-blue-600 px-1 rounded">SUPER_LOCKED</span>
              </div>
              <div className="h-4 w-full bg-gray-950 rounded border border-white/20 overflow-hidden p-[2px] shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-400 via-white to-red-400 animate-[flow_0.05s_linear_infinite]" style={{ width: '100%', backgroundSize: '10px 100%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-white/5 border border-white/20 rounded text-[10px] text-white leading-relaxed font-black italic shadow-lg">
              * ข้อมูลรับเข้าเหนือขีดจำกัด ท่อรับเยอะเท่าท่อส่ง ประสานงานด้วยความเร็วควอนตัมเพื่อบดขยี้ความคิดนางสาวประทวนล่วงหน้า ทันทุกย่างก้าว ยับเยินทุกมิติ
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flow {
          from { background-position: 0 0; }
          to { background-position: 20px 0; }
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

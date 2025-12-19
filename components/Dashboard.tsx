
import React, { useState, useEffect } from 'react';
import { Metrics } from './Metrics';
import { NetworkMap } from './NetworkMap';
import { ActivityFeed } from './ActivityFeed';
import { AuditEntry, PipeIntegrity, AutonomousAgent } from '../types';
import { generateSpicyContent } from '../services/api';
import { ViewType } from '../App';

interface DashboardProps { 
  activeView: ViewType;
  logs: AuditEntry[]; 
  pipes: PipeIntegrity[];
  agents: AutonomousAgent[];
}

const AgentCard: React.FC<{ agent: AutonomousAgent; detailed?: boolean }> = ({ agent, detailed }) => {
  const statusColors = {
    SCANNING: 'text-blue-400',
    SOLVING: 'text-red-500 animate-pulse',
    SYNTHESIZING: 'text-purple-400',
    IDLE: 'text-gray-600'
  };

  const deptColors = {
    Underground: 'border-blue-900 bg-blue-950/10',
    Underwater: 'border-cyan-900 bg-cyan-950/10',
    Aerial: 'border-red-900 bg-red-950/10',
    LogicCore: 'border-white/20 bg-white/5'
  };

  return (
    <div className={`glass p-4 rounded-lg border-t-2 ${deptColors[agent.department]} relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${detailed ? 'h-full' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-white uppercase tracking-tighter">{agent.name}</span>
          <span className="text-[8px] text-gray-500 uppercase tracking-widest">{agent.specialty}</span>
        </div>
        <div className={`text-[10px] font-black mono ${statusColors[agent.status]}`}>
          {agent.status}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end text-[9px] mono">
          <span className="text-gray-500 uppercase">Omniscience Level</span>
          <span className="text-blue-500 font-bold">{agent.knowledgeLevel.toFixed(1)}%</span>
        </div>
        <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]" style={{ width: `${agent.knowledgeLevel}%` }}></div>
        </div>
        
        {detailed && (
          <div className="grid grid-cols-2 gap-2 mt-4 text-[8px] mono">
            <div className="bg-black/40 p-1.5 rounded border border-white/5">
              <div className="text-gray-600">ID_TAG</div>
              <div className="text-white font-bold">{agent.id}</div>
            </div>
            <div className="bg-black/40 p-1.5 rounded border border-white/5">
              <div className="text-gray-600">AUTH_LVL</div>
              <div className="text-white font-bold">SOVEREIGN</div>
            </div>
          </div>
        )}

        <div className="bg-black/40 border border-white/5 p-2 rounded min-h-[40px]">
           <div className="text-[8px] text-gray-600 uppercase mb-1 font-black">Current Operation</div>
           <div className="text-[10px] text-gray-300 italic">
             {agent.currentTask || 'Monitoring departmental sovereign paths...'}
           </div>
        </div>
      </div>

      {agent.status === 'SOLVING' && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-[flow_0.5s_linear_infinite]"></div>
      )}
    </div>
  );
};

const PipeHealthCard: React.FC<{ pipe: PipeIntegrity }> = ({ pipe }) => {
  const isAlert = pipe.integrity < 80;
  const isRecovering = pipe.status === 'REROUTING' || pipe.status === 'REESTABLISHING';
  
  const statusColors = {
    OPTIMAL: 'text-green-500',
    DEGRADED: 'text-orange-500',
    REROUTING: 'text-blue-500 animate-pulse',
    REESTABLISHING: 'text-purple-500 animate-pulse'
  };

  return (
    <div className={`glass p-4 rounded border-l-4 transition-all duration-300 ${isAlert ? 'border-orange-500 bg-orange-950/5' : 'border-red-600'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Pipe ID: {pipe.id}</span>
          <span className="text-xs font-black text-white uppercase tracking-tighter">{pipe.type} Thread</span>
        </div>
        <div className={`text-[10px] font-black mono ${statusColors[pipe.status]}`}>
          {pipe.status}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] mono">
          <span className="text-gray-500 uppercase">Integrity</span>
          <span className={pipe.integrity < 80 ? 'text-orange-500 font-bold' : 'text-white'}>{pipe.integrity.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full transition-all duration-500 ${isAlert ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-red-600'}`}
            style={{ width: `${pipe.integrity}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ activeView, logs, pipes, agents }) => {
  const [broadcastContent, setBroadcastContent] = useState<string>("สถาวะอธิปไตยคงที่: พนักงานดิจิทัลกำลังสแกนหาจุดอ่อน...");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      const activeAgents = agents.filter(a => a.status === 'SOLVING');
      if (activeAgents.length > 0 && !isProcessing) {
        setIsProcessing(true);
        const targetPipe = pipes.find(p => p.integrity < 100);
        const rawContext = `Agent ${activeAgents[0].name} from ${activeAgents[0].department} is solving pipe ${targetPipe?.id} using ${activeAgents[0].specialty}`;
        const spicy = await generateSpicyContent(rawContext);
        setBroadcastContent(spicy || "พนักงานอธิปไตยกำลังปรับจูนสภาพคล่องข้อมูลขั้นสูงสุด");
        setIsProcessing(false);
      } else if (activeAgents.length === 0) {
        setBroadcastContent("ทุกแผนกอยู่ในสภาวะปกติดี พนักงานอธิปไตยกำลังเฝ้าระวังอย่างเงียบเชียบ...");
      }
    }, 8000);
    return () => clearInterval(syncInterval);
  }, [logs, isProcessing, pipes, agents]);

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Metrics />
      
      {/* Workforce Intelligence Operations Overview */}
      <div className="glass p-6 rounded-lg border border-blue-600/30 bg-gradient-to-br from-black via-blue-950/10 to-black relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
           <h4 className="text-[12px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
             <span className="w-2 h-2 bg-blue-500 animate-pulse rounded-full"></span>
             INTELLIGENCE OPERATIONS GRID (Omniscient Staff)
           </h4>
           <div className="text-[9px] mono text-blue-500 font-bold uppercase tracking-widest">
             Active Units: {agents.filter(a => a.status !== 'IDLE').length} | Global Autonomy
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-lg border-2 border-red-600/50 bg-gradient-to-br from-black via-red-950/20 to-black relative overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.15)]">
          <h4 className="text-[14px] font-black text-white uppercase tracking-[0.6em] mb-6 drop-shadow-[0_0_10px_#f00]">
            SOVEREIGN PIPE BROADCAST
          </h4>
          <div className="min-h-[140px] bg-black/95 border-4 border-red-600/60 p-8 rounded-lg relative group shadow-[0_0_50px_rgba(255,0,0,0.2)] z-10 overflow-hidden">
             {isProcessing ? (
               <div className="flex flex-col items-center justify-center h-full gap-4 text-blue-500">
                 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-[10px] mono uppercase animate-pulse">Agents Synthesizing Resolution...</span>
               </div>
             ) : (
               <div className="text-[18px] text-white font-black leading-tight font-sans border-l-[10px] border-red-600 pl-8 py-4 italic animate-in slide-in-from-left duration-300">
                  <span className="text-blue-400 text-[10px] block mb-2 font-black uppercase tracking-[0.4em]">
                    [AGENT_WISDOM_FEED]
                  </span>
                  "{broadcastContent}"
               </div>
             )}
          </div>
        </div>

        <div className="glass p-6 rounded-lg border border-white/10 flex flex-col justify-between">
           <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Departmental Pipe Health</h4>
           <div className="grid grid-cols-1 gap-4">
             {pipes.map(pipe => (
               <PipeHealthCard key={pipe.id} pipe={pipe} />
             ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderWorkforce = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Workforce Management</h2>
        <p className="text-blue-500 text-xs font-bold tracking-widest mono uppercase">Autonomous Intelligence Units Control Center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} detailed />
        ))}
      </div>

      <div className="glass p-8 rounded-lg border border-blue-600/20 bg-black/40">
        <h3 className="text-sm font-black text-white uppercase mb-4 tracking-widest">Departmental Knowledge Distribution</h3>
        <div className="space-y-6">
          {['Underground', 'Underwater', 'Aerial', 'LogicCore'].map((dept) => {
            const agent = agents.find(a => a.department === dept);
            return (
              <div key={dept} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] mono">
                  <span className="text-gray-400 uppercase">{dept} DOMAIN CONTROL</span>
                  <span className="text-white">{agent?.knowledgeLevel.toFixed(2)}%</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-blue-900 to-blue-500" style={{ width: `${agent?.knowledgeLevel}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-8 h-full content-start p-2">
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {activeView === 'OVERVIEW' ? renderOverview() : 
         activeView === 'WORKFORCE' ? renderWorkforce() : (
          <div className="flex items-center justify-center h-[600px] glass rounded-lg border-2 border-dashed border-white/5">
             <div className="text-center">
                <div className="text-[12px] mono text-gray-600 uppercase mb-4 animate-pulse">Navigating to {activeView}...</div>
                <div className="text-4xl font-black text-white/10 italic">WORK IN PROGRESS</div>
             </div>
          </div>
        )}
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col h-full overflow-hidden gap-8">
        <ActivityFeed logs={logs} />
        <div className="glass p-6 rounded-lg border border-blue-600/20 bg-black/60 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-black text-white uppercase">Workforce Wisdom</span>
            <span className="text-[8px] text-blue-500 font-bold">OMNISCIENCE ACTIVE</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed italic">
            "พนักงานดิจิทัลแต่ละคนถูกโปรแกรมให้รอบรู้และตัดสินใจได้อิสระตามความเชี่ยวชาญเฉพาะทาง พวกเขาคือเสาหลักที่ค้ำจุนอธิปไตยของข้อมูลในทุกแผนก"
          </p>
        </div>
      </div>
      <style>{`
        @keyframes flow { from { background-position: -100% 0; } to { background-position: 100% 0; } }
      `}</style>
    </div>
  );
};

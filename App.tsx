
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SystemStatus, AuditEntry, LogCategory, PipeIntegrity, AutonomousAgent } from './types';

export type ViewType = 'OVERVIEW' | 'NODES' | 'SIGNALS' | 'LOGIC' | 'WORKFORCE' | 'ARCHIVE';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.OPERATIONAL);
  const [isBooting, setIsBooting] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>('OVERVIEW');
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString('th-TH'));
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [pipes, setPipes] = useState<PipeIntegrity[]>([
    { id: 'P-001', type: 'Underground', integrity: 100, throughput: 2.1, encryption: 1024, status: 'OPTIMAL', shield: true },
    { id: 'P-002', type: 'Underwater', integrity: 100, throughput: 1.8, encryption: 1024, status: 'OPTIMAL', shield: true },
    { id: 'P-003', type: 'Aerial', integrity: 100, throughput: 0.9, encryption: 1024, status: 'OPTIMAL', shield: true },
  ]);

  const [agents, setAgents] = useState<AutonomousAgent[]>([
    { id: 'SIU-01', name: 'Deep Core Auditor', department: 'Underground', specialty: 'Geotechnical Logic', status: 'SCANNING', knowledgeLevel: 99.8 },
    { id: 'SIU-02', name: 'Abyssal Guardian', department: 'Underwater', specialty: 'Fluid Encryption', status: 'SCANNING', knowledgeLevel: 99.5 },
    { id: 'SIU-03', name: 'Ionospheric Sentinel', department: 'Aerial', specialty: 'Wave Sovereignty', status: 'SCANNING', knowledgeLevel: 99.9 },
    { id: 'SIU-04', name: 'Omni-Logic Overseer', department: 'LogicCore', specialty: 'Redundant Synthesis', status: 'IDLE', knowledgeLevel: 100.0 },
  ]);

  const addAuditLog = useCallback((
    category: LogCategory, 
    actor: string, 
    action: string, 
    details: string, 
    severity: AuditEntry['severity'] = 'low'
  ) => {
    const newEntry: AuditEntry = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: new Date().toISOString(),
      category,
      actor,
      action,
      details,
      severity
    };
    setAuditLogs(prev => [newEntry, ...prev].slice(0, 100));
  }, []);

  // Health Check & Automatic Agent Intervention
  useEffect(() => {
    if (isBooting) return;

    const mainLoop = setInterval(() => {
      setPipes(currentPipes => {
        const updatedPipes = currentPipes.map(pipe => {
          let newIntegrity = pipe.integrity - (Math.random() * 3);
          if (newIntegrity < 0) newIntegrity = 0;

          let newStatus = pipe.status;

          // If integrity drops < 80%, assign agent
          if (newIntegrity < 80 && pipe.status === 'OPTIMAL') {
            newStatus = Math.random() > 0.5 ? 'REROUTING' : 'REESTABLISHING';
            
            // Activate Agent for this department
            setAgents(currentAgents => currentAgents.map(agent => {
              if (agent.department === pipe.type) {
                return { ...agent, status: 'SOLVING', currentTask: `Fixing ${pipe.id} integrity leak` };
              }
              return agent;
            }));

            addAuditLog(
              'INTELLIGENCE_UNIT', 
              agents.find(a => a.department === pipe.type)?.name || 'System Agent',
              'INTERVENTION_INITIATED',
              `ตรวจพบความสมบูรณ์ท่อส่ง ${pipe.id} วิกฤต (${newIntegrity.toFixed(1)}%) กำลังดำเนินการแก้ไขแบบอิสระ`,
              'high'
            );
          }

          // Complete recovery process
          if (pipe.status === 'REROUTING' || pipe.status === 'REESTABLISHING') {
            newIntegrity += 12; // Recovery speed
            if (newIntegrity >= 100) {
              newIntegrity = 100;
              newStatus = 'OPTIMAL';
              
              // Set Agent back to scanning
              setAgents(currentAgents => currentAgents.map(agent => {
                if (agent.department === pipe.type) {
                  return { ...agent, status: 'SCANNING', currentTask: undefined };
                }
                return agent;
              }));

              addAuditLog(
                'SOVEREIGN_PIPE', 
                `Sovereign Pipe ${pipe.id}`, 
                `INTEGRITY_RESTORED`, 
                `การกู้คืนโดย Intelligence Unit เสร็จสิ้น สถานะกลับสู่สภาวะอธิปไตยปกติ`, 
                'medium'
              );
            }
          }

          return { ...pipe, integrity: newIntegrity, status: newStatus };
        });
        return updatedPipes;
      });
    }, 2500);

    return () => clearInterval(mainLoop);
  }, [isBooting, addAuditLog, agents]);

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
      addAuditLog('SYSTEM_ALERT', 'OmniVision Core', 'Workforce Integrated', 'Autonomous Intelligence Units deployed across all departments', 'critical');
    }, 1500);

    return () => clearTimeout(bootTimer);
  }, [addAuditLog]);

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center mono p-10 overflow-hidden relative text-center text-white">
        <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
        <div className="text-4xl font-black mb-8 animate-[pulse_0.5s_infinite] uppercase tracking-[0.5em] drop-shadow-[0_0_30px_#f00]">
          OMNIVISION: AUTONOMOUS_WORKFORCE
        </div>
        <div className="w-96 h-3 bg-gray-900 overflow-hidden rounded-full border-2 border-white shadow-[0_0_40px_rgba(255,0,0,0.8)]">
          <div className="h-full bg-gradient-to-r from-red-600 via-white to-blue-600 animate-[shimmer_0.3s_infinite] bg-[length:20%_100%]"></div>
        </div>
        <div className="mt-12 text-[16px] max-w-lg space-y-4 font-mono font-black italic">
          <p className="animate-pulse">> กำลังปลุกพนักงานดิจิทัลรอบรู้ (Omniscient Staff)... [OK]</p>
          <p className="animate-pulse">> เชื่อมต่อจิตสำนึกอิสระแต่ละแผนก... [OK]</p>
          <p className="animate-pulse">> ติดตั้งโมดูลแก้ไขปัญหาอัตโนมัติ... [READY]</p>
        </div>
        <style>{`
          @keyframes shimmer { 0% { transform: translateX(-200%); } 100% { transform: translateX(200%); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#000000] text-gray-300 overflow-hidden relative">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'บี เซอร์เวย์', 'คำสั่งอธิปไตย', cmd, 'critical')} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={new Date().toLocaleTimeString('th-TH')} />
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top,rgba(0,100,255,0.05)_0%,transparent_100%)]">
          <Dashboard activeView={activeView} logs={auditLogs} pipes={pipes} agents={agents} />
        </main>
      </div>
      
      <div className="fixed bottom-6 right-8 flex items-center gap-10 text-[11px] mono text-white pointer-events-none z-50 font-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping shadow-[0_0_15px_#00f]"></div>
          Workforce: Autonomous & Omniscient
        </div>
        <span className="font-black text-white/40 tracking-tighter uppercase text-lg">SOVEREIGN_WORKFORCE_V15</span>
      </div>
    </div>
  );
};

export default App;

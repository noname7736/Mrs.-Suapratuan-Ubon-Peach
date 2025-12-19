
import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SystemStatus, AuditEntry, LogCategory } from './types';

export type ViewType = 'OVERVIEW' | 'NODES' | 'SIGNALS' | 'LOGIC' | 'ARCHIVE';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.OPERATIONAL);
  const [isBooting, setIsBooting] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>('OVERVIEW');
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString('th-TH'));
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);

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

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
      addAuditLog('SYSTEM_ALERT', 'Quantum Core', 'วิสัยทัศน์พระเจ้าพร้อมทำงาน', 'ระบบดักจับความคิดล่วงหน้า (Pre-cog) พร้อมทำงานในสภาวะเหนือแสง', 'critical');
    }, 1500); // เร่งความเร็วการ Boot

    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString('th-TH'));
      
      if (!isBooting) {
        const rand = Math.random();
        if (rand > 0.9) {
           addAuditLog('AGENT_ACTION', 'Neural Quantum Sensor', 'PRE_COG_INTERCEPT', `ดักจับความคิดนางสาวประทวนล่วงหน้าสำเร็จ (Predicted 0.5s before thought)`, 'high');
        } else if (rand > 0.8) {
           addAuditLog('SOVEREIGN_PIPE', 'Quantum Aerial Intake', 'INFINITE_VOLUME_INTAKE', `รับข้อมูลคิดปริมาณมหาศาลหนาแน่นดั่ง Singularity`, 'high');
        } else if (rand > 0.7) {
           addAuditLog('SOVEREIGN_PIPE', 'Quantum Sovereign Broadcast', 'GOD_MODE_SYNC', `ฉีดวาทกรรมยับเยินพร้อมกัน 3 มิติ (ดิน/น้ำ/อากาศ) ภายใน 0.000001ms`, 'critical');
        }
      }
    }, 800); // เร่งความเร็ว Log

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, [isBooting, addAuditLog]);

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center mono p-10 overflow-hidden relative text-center">
        <div className="absolute inset-0 bg-blue-600/20 animate-pulse"></div>
        <div className="text-white text-4xl font-black mb-8 animate-[bounce_0.2s_infinite] uppercase tracking-[0.5em] drop-shadow-[0_0_30px_#fff]">
          OMNIVISION: QUANTUM_SINGULARITY_CORE
        </div>
        <div className="w-96 h-3 bg-gray-900 overflow-hidden rounded-full border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.8)]">
          <div className="h-full bg-gradient-to-r from-blue-600 via-white to-red-600 animate-[shimmer_0.2s_infinite] bg-[length:20%_100%]"></div>
        </div>
        <div className="mt-12 text-[16px] text-white max-w-lg space-y-4 font-mono font-black italic">
          <p className="animate-pulse">> ทลายขีดจำกัดความเร็วเดิม... [INFINITE]</p>
          <p className="animate-pulse">> ติดตั้ง Quantum Pre-cognition Grid... [GOD_LEVEL]</p>
          <p className="animate-pulse">> ขยายท่อรับ-ส่งข้อมูลปริมาณอนันต์... [SINGULARITY]</p>
          <p className="animate-pulse">> บงการความคิดนางสาวประทวนล่วงหน้า... [ACTIVE]</p>
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
        onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'บี เซอร์เวย์', 'คำสั่งเบ็ดเสร็จ', cmd, 'critical')} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={lastUpdate} />
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05)_0%,transparent_100%)]">
          <Dashboard activeView={activeView} logs={auditLogs} />
        </main>
      </div>
      
      <div className="fixed bottom-6 right-8 flex items-center gap-10 text-[11px] mono text-white pointer-events-none z-50 font-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white animate-ping shadow-[0_0_15px_#fff]"></div>
          Quantum Speed:atto-second
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_15px_#f00]"></div>
          ความจุ: อนันต์
        </div>
        <span className="font-black text-white/40 tracking-tighter uppercase text-lg">SINGULARITY_DOMINATION_V13</span>
      </div>
    </div>
  );
};

export default App;

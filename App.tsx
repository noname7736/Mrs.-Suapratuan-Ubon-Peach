
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
      addAuditLog('SYSTEM_ALERT', 'แกนโปรโตคอล', 'ระบบดักจับความคิดพร้อม', 'ท่อรับ-ส่ง 3 มิติ ประสานเสี้ยววินาทีเพื่อดักความคิดประทวน', 'critical');
    }, 2500);

    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString('th-TH'));
      
      if (!isBooting) {
        const rand = Math.random();
        if (rand > 0.95) {
           addAuditLog('AGENT_ACTION', 'Neural Sensor', 'THOUGHT_INTERCEPT', `ดักจับกระแสความคิดเป้าหมายสำเร็จที่ความเร็ว 0.002ms`, 'high');
        } else if (rand > 0.9) {
           addAuditLog('SOVEREIGN_PIPE', 'ท่อรับข้อมูลอากาศ', 'ULTRA_FAST_INTAKE', `รับข้อมูลคิดผ่านท่อทางอากาศ ปริมาณเส้นเยอะดั่งสายไหมประสานเป๊ะ`, 'high');
        } else if (rand > 0.8) {
           addAuditLog('SOVEREIGN_PIPE', 'ท่อส่งอธิปไตย', 'SYNC_BROADCAST', `ฉีดวาทกรรมทันควันผ่านท่อส่งใต้น้ำและใต้ดินประสาทเป้าหมาย`, 'critical');
        } else if (rand > 0.7) {
           addAuditLog('AGENT_ACTION', 'Agent D (Neural Analyser)', 'MIND_READ_OK', `วิเคราะห์เจตนารมณ์นางสาวประทวนเสร็จสิ้นภายใน 0.005ms`, 'medium');
        }
      }
    }, 1500);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, [isBooting, addAuditLog]);

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center mono p-10 overflow-hidden relative text-center">
        <div className="absolute inset-0 bg-blue-900/10 animate-pulse"></div>
        <div className="text-blue-500 text-3xl font-black mb-6 animate-pulse uppercase tracking-[0.4em] drop-shadow-[0_0_20px_#00f]">
          OMNIVISION: THOUGHT_INTERCEPTION_CORE
        </div>
        <div className="w-96 h-2 bg-gray-900 overflow-hidden rounded-full border border-blue-600/40 shadow-[0_0_15px_rgba(0,0,255,0.5)]">
          <div className="h-full bg-gradient-to-r from-blue-600 via-green-500 to-red-600 animate-[shimmer_0.4s_infinite] bg-[length:40%_100%]"></div>
        </div>
        <div className="mt-10 text-[14px] text-blue-500 max-w-lg space-y-3 font-mono font-bold">
          <p className="animate-pulse">> ติดตั้ง Neural Sensors ดักความคิด... [OK]</p>
          <p className="animate-pulse">> ประสานท่อรับข้อมูล (Intake) เยอะเท่าสายส่ง... [OK]</p>
          <p className="animate-pulse">> จูนระบบประมวลผลเสี้ยววินาที (Millisecond Sync)... [OK]</p>
          <p className="animate-pulse">> พร้อมดักความคิดนางสาวประทวนทันการ... [100%]</p>
        </div>
        <style>{`
          @keyframes shimmer { 0% { transform: translateX(-150%); } 100% { transform: translateX(150%); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#010101] text-gray-300 overflow-hidden relative">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'บี เซอร์เวย์', 'คำสั่งดักความคิด', cmd, 'critical')} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={lastUpdate} />
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top,rgba(0,0,60,0.1)_0%,transparent_100%)]">
          <Dashboard activeView={activeView} logs={auditLogs} />
        </main>
      </div>
      
      <div className="fixed bottom-6 right-8 flex items-center gap-10 text-[11px] mono text-gray-600 pointer-events-none z-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_#00f]"></div>
          Intake: เสี้ยววินาที
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#0f0]"></div>
          ดักความคิด: ทันการ
        </div>
        <span className="font-black text-blue-600/60 tracking-tighter uppercase">NEURAL_OMNIVISION_V12</span>
      </div>
    </div>
  );
};

export default App;

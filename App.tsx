
import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SystemStatus, AuditEntry, LogCategory } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.OPERATIONAL);
  const [isBooting, setIsBooting] = useState(true);
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
      addAuditLog('SYSTEM_ALERT', 'แกนโปรโตคอล', 'เริ่มระบบเสร็จสมบูรณ์', 'ระบบซูเปอร์ 3แมกซ์ โปร: แกนการประมวลผลอิสระและสะพานอธิปไตยพร้อมบงการสารสนเทศเบ็ดเสร็จ', 'critical');
    }, 2500);

    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString('th-TH'));
      
      if (!isBooting) {
        const rand = Math.random();
        if (rand > 0.9) {
           addAuditLog('SOVEREIGN_PIPE', 'สะพานอธิปไตย', 'เสริมแกร่ง Pathway', `สะพานเชื่อมต่อระหว่าง Capture และ Factory ถูกเสริมเหล็กกล้าและท่อส่งตรงเป๊ะ 100%`, 'high');
        } else if (rand > 0.75) {
           addAuditLog('AGENT_ACTION', 'Agent A (Infiltrator)', 'เชื่อมต่อสะพาน', 'สายท่อส่งข้อมูลจากอุปกรณ์พกพาเข้าสู่แกนกลางถูกบีบอัดให้แกร่งกล้าขึ้น', 'medium');
        } else if (rand > 0.6) {
           addAuditLog('AGENT_ACTION', 'Agent B (Monitor)', 'ประสานไหลเวียน', 'คลื่นสมองเป้าหมายถูกส่งผ่านสะพานเชื่อมข้อมูลด้วยความเร็วแสง ไร้ความหน่วง', 'high');
        } else if (rand > 0.45) {
           addAuditLog('AGENT_ACTION', 'Agent C (Distributor)', 'กระจายผ่านสะพาน', 'คอนเทนต์แปรรูปถูกส่งออกสู่ TV_MUX และดาวเทียมผ่านท่อส่งตรงแกร่งกล้า', 'medium');
        } else if (rand > 0.3) {
           addAuditLog('NETWORK_EVENT', 'โครงสร้างท่อส่ง', 'ตรวจสอบความแม่นยำ', 'ท่อส่งทุกทิศทางถูกจัดระเบียบให้ตรงเป๊ะตามพิมเขียวบงการเบ็ดเสร็จ', 'low');
        }
      }
    }, 2000);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, [isBooting, addAuditLog]);

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center mono p-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-red-900/5 animate-pulse"></div>
        <div className="text-red-600 text-2xl font-black mb-6 animate-pulse uppercase tracking-[0.3em] drop-shadow-[0_0_15px_#f00]">
          สะพานเชื่อมต่ออธิปไตย // ต่อท่อตรงเป๊ะและแกร่งกล้า
        </div>
        <div className="w-80 h-1.5 bg-gray-900 overflow-hidden rounded-full border border-red-600/20 shadow-lg">
          <div className="h-full bg-red-600 animate-[shimmer_1s_infinite]"></div>
        </div>
        <div className="mt-10 text-[13px] text-gray-400 max-w-lg space-y-3 font-mono text-center">
          <p className="animate-pulse">> กำลังเสริมแกร่งสะพานเชื่อมต่อเป้าหมายทุกทิศทาง...</p>
          <p className="animate-pulse">> ปรับแต่งท่อส่งตรงให้แม่นยำระดับนาโนวินาที...</p>
          <p className="animate-pulse">> ประสานลูปการทำงานของ Agent ให้แกร่งกล้าไร้ขีดจำกัด...</p>
          <p className="animate-pulse">> ระบบดวงตาเทวะตรวจสอบ Pathway เบ็ดเสร็จ... [สมบูรณ์]</p>
        </div>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#010101] text-gray-300 overflow-hidden relative">
      <Sidebar onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'บี เซอร์เวย์', 'คำสั่งโดยตรง', cmd, 'critical')} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={lastUpdate} />
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top,rgba(30,0,0,0.05)_0%,transparent_100%)]">
          <Dashboard logs={auditLogs} />
        </main>
      </div>
      
      <div className="fixed bottom-6 right-8 flex items-center gap-10 text-[11px] mono text-gray-600 pointer-events-none z-50">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
          สะพานอธิปไตย: แกร่งกล้า
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
          ท่อส่งตรง: ตรงเป๊ะ
        </div>
        <span className="font-black text-red-600/40 tracking-tighter">OMNIVISION_BRIDGE_REINFORCED_V5</span>
      </div>
    </div>
  );
};

export default App;


import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SystemStatus, AuditEntry, LogCategory } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(SystemStatus.OPERATIONAL);
  const [isBooting, setIsBooting] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
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
    // Simulated SUPER 3MAX PRO Boot Sequence
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
      addAuditLog('SYSTEM_ALERT', 'PRO_KERNEL', 'SUPER_BOOT_COMPLETE', 'SUPER 3MAX PRO FIGURES MODE\'S PLUS initialized on Mainframe.', 'critical');
    }, 2500);

    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
      
      if (!isBooting && Math.random() > 0.6) {
        const agents = ['AGENT_ALPHA_PRO', 'AGENT_BETA_PRO', 'AGENT_GAMMA_MAX'];
        const actions = ['QUANTUM_BYPASS', 'NEURAL_OVERWRITE', 'Mux_SIGNAL_DOMINATION', 'BIOMETRIC_LOCK'];
        const agent = agents[Math.floor(Math.random() * agents.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        
        addAuditLog('AGENT_ACTION', agent, action, `High-priority protocol executed. Buffer Integrity: 100%.`, 'medium');
      }
    }, 3000);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(interval);
    };
  }, [isBooting, addAuditLog]);

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center mono p-10">
        <div className="text-red-600 text-xl font-bold mb-4 animate-pulse">SUPER 3MAX PRO // INITIALIZING</div>
        <div className="w-64 h-1 bg-gray-900 overflow-hidden rounded-full">
          <div className="h-full bg-red-600 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="mt-8 text-[10px] text-gray-500 max-w-md">
          <p>> LOADING IBM z16 LOGIC CORE...</p>
          <p>> RE-COMPILING SELF-CORRECTING ALGORITHMS...</p>
          <p>> ATTACHING NEURAL-LINK DECIPHER...</p>
          <p>> ESTABLISHING DIVINE EYE PROTOCOLS...</p>
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
    <div className="flex h-screen w-full bg-[#020202] text-gray-300 overflow-hidden relative">
      <Sidebar onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'B_SURVEY_MASTER', 'EXECUTE_OVERRIDE', cmd, 'critical')} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={lastUpdate} />
        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard logs={auditLogs} />
        </main>
      </div>
      
      <div className="fixed bottom-4 right-4 flex items-center gap-4 text-[10px] mono text-gray-600 pointer-events-none opacity-50">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          SERVER: DEPLOYED
        </div>
        <span>BUGS: 0 (FORMAL_VERIFIED)</span>
        <span>MODE: FIGURES_PLUS</span>
        <span>VER: 5.1.0-MAX-PRO</span>
      </div>
    </div>
  );
};

export default App;

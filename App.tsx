
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
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
      addAuditLog('SYSTEM_ALERT', 'LIQUIDITY_MOD', 'UPGRADE_APPLIED', 'SUPER 3MAX PRO: LIQUIDITY INJECTION & SOVEREIGN SHIELD ACTIVE.', 'critical');
    }, 2500);

    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString());
      
      if (!isBooting) {
        const rand = Math.random();
        if (rand > 0.8) {
           addAuditLog('SOVEREIGN_PIPE', 'QUANTUM_SHIELD', 'PIPE_REINFORCEMENT', `Conduit Mux-7 reinforced with Cisco Quantum Security. No leaks detected.`, 'high');
        } else if (rand > 0.6) {
           addAuditLog('AGENT_ACTION', 'LIQUID_CORE', 'FLUIDITY_INJECTION', 'Internal data lanes flushed. Throughput increased to 400% nominal.', 'medium');
        }
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
        <div className="text-red-600 text-xl font-bold mb-4 animate-pulse uppercase tracking-[0.2em]">Sovereign Pipe System // Reinforcing</div>
        <div className="w-64 h-1 bg-gray-900 overflow-hidden rounded-full">
          <div className="h-full bg-red-600 animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="mt-8 text-[10px] text-gray-500 max-w-md space-y-1">
          <p className="animate-pulse">> REINFORCING CISCO QUANTUM SECURITY CONDUITS...</p>
          <p className="animate-pulse">> INJECTING SYSTEM LIQUIDITY INTO Z16 CORE...</p>
          <p className="animate-pulse">> ALIGNING DIRECT CONNECTION PIPES: ALL AXES...</p>
          <p className="animate-pulse">> ELIMINATING FRICTION IN MASS COMMUNICATION MUX...</p>
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
      <Sidebar onCommand={(cmd) => addAuditLog('OPERATOR_CMD', 'B_SURVEY_MASTER', 'DIRECT_INSTRUCTION', cmd, 'critical')} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header status={status} lastUpdate={lastUpdate} />
        <main className="flex-1 overflow-y-auto p-6">
          <Dashboard logs={auditLogs} />
        </main>
      </div>
      
      <div className="fixed bottom-4 right-4 flex items-center gap-6 text-[10px] mono text-gray-600 pointer-events-none opacity-50">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          PIPES: SHIELDED (QUANTUM)
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          LIQUIDITY: MAXIMIZED
        </div>
        <span>VER: 5.2.0-SOVEREIGN</span>
      </div>
    </div>
  );
};

export default App;


export enum SystemStatus {
  OPERATIONAL = 'OPERATIONAL',
  ANALYZING = 'ANALYZING',
  OPTIMIZING = 'OPTIMIZING',
  CRITICAL = 'CRITICAL',
  LIQUIDITY_INJECTION = 'LIQUIDITY_INJECTION'
}

export type LogCategory = 'AGENT_ACTION' | 'OPERATOR_CMD' | 'SYSTEM_ALERT' | 'NETWORK_EVENT' | 'SOVEREIGN_PIPE' | 'HEALTH_CHECK' | 'INTELLIGENCE_UNIT';

export interface AuditEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  actor: string;
  action: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface MetricData {
  time: string;
  value: number;
  liquidity: number;
}

export interface PipeIntegrity {
  id: string;
  type: 'Underground' | 'Underwater' | 'Aerial';
  integrity: number;
  throughput: number;
  encryption: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'REROUTING' | 'REESTABLISHING';
  shield: boolean;
}

export interface AutonomousAgent {
  id: string;
  name: string;
  department: 'Underground' | 'Underwater' | 'Aerial' | 'LogicCore';
  specialty: string;
  status: 'SCANNING' | 'SOLVING' | 'SYNTHESIZING' | 'IDLE';
  knowledgeLevel: number; // 0-100 (Omniscience Index)
  currentTask?: string;
}

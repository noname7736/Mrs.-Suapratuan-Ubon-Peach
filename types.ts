
export enum SystemStatus {
  OPERATIONAL = 'OPERATIONAL',
  ANALYZING = 'ANALYZING',
  OPTIMIZING = 'OPTIMIZING',
  CRITICAL = 'CRITICAL',
  LIQUIDITY_INJECTION = 'LIQUIDITY_INJECTION'
}

export type LogCategory = 'AGENT_ACTION' | 'OPERATOR_CMD' | 'SYSTEM_ALERT' | 'NETWORK_EVENT' | 'SOVEREIGN_PIPE';

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

export interface NodeStatus {
  id: string;
  label: string;
  status: 'active' | 'idle' | 'warning';
  load: number;
}

export interface PipeIntegrity {
  id: string;
  throughput: number;
  encryption: number;
  shield: boolean;
}

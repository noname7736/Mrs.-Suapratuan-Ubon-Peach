
export enum SystemStatus {
  OPERATIONAL = 'OPERATIONAL',
  ANALYZING = 'ANALYZING',
  OPTIMIZING = 'OPTIMIZING',
  CRITICAL = 'CRITICAL'
}

export type LogCategory = 'AGENT_ACTION' | 'OPERATOR_CMD' | 'SYSTEM_ALERT' | 'NETWORK_EVENT';

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
}

export interface NodeStatus {
  id: string;
  label: string;
  status: 'active' | 'idle' | 'warning';
  load: number;
}

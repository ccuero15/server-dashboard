// src/types/dashboard.ts
export interface ServerWithLastCheck {
  id: number;
  hostname: string;
  ipAddress: string;
  osInfo: string | null;
  createdAt: Date;
  // Representa el último registro de la relación healthChecks
  lastCheck?: {
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
    measuredAt: Date;
  };
}
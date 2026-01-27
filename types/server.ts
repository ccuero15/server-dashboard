// src/types/dashboard.ts
export interface ServerWithLastCheck {
  id: number;
  hostname: string;
  ipAddress: string;
  osInfo: string | null;
  createdAt?: Date;
  // Representa el último registro de la relación healthChecks
  lastCheck?: {
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
    measuredAt: Date;

  };
}

// 1. Definimos la forma exacta que debe tener cada punto de la gráfica
export interface ChartMetric {
    time: string;
    cpu: number;
    ram: number;
    disk: number;
}


export interface LastCheck {
  id: string; // BigInt serializado
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  measuredAt: string; // Date serializado a ISO string
}

export interface Process {
  id: string; // BigInt convertido
  name: string;
  cpuUsage: number;
  ramUsage: number;
  pid: number;
}
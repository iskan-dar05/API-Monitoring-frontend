export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

export interface ApiLog {
  id: string;
  timestamp: string;
  method: HttpMethod;
  path: string;
  status: number;
  latency: number;
  request: {
    headers: Record<string, string>;
    body?: any;
    query?: Record<string, string>;
  };
  response: {
    headers: Record<string, string>;
    body?: any;
  };
  clientIp: string;
  userAgent: string;
}

export interface DashboardStats {
  totalRequests: number;
  errorRate: number;
  avgLatency: number;
  p95Latency: number;
  requestsPerMinute: number;
}

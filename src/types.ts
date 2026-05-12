export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

export interface ApiLog {
  id: string;
  created_at: string;
  method: HttpMethod;
  url: string;
  status: number;
  duration: number;
  headers: string;
  body: string;
}

export interface DashboardStats {
  totalRequests: number;
  errorRate: number;
  avgLatency: number;
  p95Latency: number;
  requestsPerMinute: number;
}

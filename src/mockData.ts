import { ApiLog } from './types';

export const MOCK_LOGS: ApiLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    method: 'GET',
    path: '/api/v1/users',
    status: 200,
    latency: 45,
    request: {
      headers: { 'Authorization': 'Bearer token...', 'Accept': 'application/json' },
      query: { 'page': '1', 'limit': '20' }
    },
    response: {
      headers: { 'Content-Type': 'application/json' },
      body: { users: [{ id: 1, name: 'John Doe' }] }
    },
    clientIp: '192.168.1.1',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    method: 'POST',
    path: '/api/v1/auth/login',
    status: 401,
    latency: 120,
    request: {
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'user@example.com', password: '***' }
    },
    response: {
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Invalid credentials' }
    },
    clientIp: '192.168.1.45',
    userAgent: 'PostmanRuntime/7.29.2'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    method: 'PUT',
    path: '/api/v1/profile/update',
    status: 200,
    latency: 210,
    request: {
      headers: { 'Authorization': 'Bearer token...' },
      body: { bio: 'New bio content' }
    },
    response: {
      headers: { 'Content-Type': 'application/json' },
      body: { success: true }
    },
    clientIp: '192.168.1.1',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    method: 'GET',
    path: '/api/v1/analytics/dashboard',
    status: 500,
    latency: 1500,
    request: {
      headers: { 'Authorization': 'Bearer token...' }
    },
    response: {
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Internal Server Error', stack: '...' }
    },
    clientIp: '10.0.0.5',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    method: 'DELETE',
    path: '/api/v1/posts/123',
    status: 204,
    latency: 85,
    request: {
      headers: { 'Authorization': 'Bearer token...' }
    },
    response: {
      headers: { 'X-Request-ID': 'abc-123' }
    },
    clientIp: '192.168.1.1',
    userAgent: 'Mozilla/5.0...'
  }
];

export const MOCK_CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 100) + 20,
  errors: Math.floor(Math.random() * 10),
  latency: Math.floor(Math.random() * 200) + 50,
}));

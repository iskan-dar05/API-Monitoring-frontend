import { ApiLog } from './types';

// export const MOCK_LOGS: ApiLog[] = [
// {
//   id: Math.random().toString(36).substr(2, 9),
//   created_at: new Date().toISOString(),
//   method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)] as any,
//   url: ['/api/v1/users', '/api/v1/posts', '/api/v1/auth/login', '/api/v1/analytics'][Math.floor(Math.random() * 4)],
//   status: [200, 201, 204, 400, 401, 404, 500][Math.floor(Math.random() * 7)],
//   duration: Math.floor(Math.random() * 800) + 20,
//   headers: "{}",
//   body: "{}"
// }
// ]
export const MOCK_CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 100) + 20,
  errors: Math.floor(Math.random() * 10),
  latency: Math.floor(Math.random() * 200) + 50,
}));

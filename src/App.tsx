import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  LayoutDashboard, 
  ListTree, 
  Settings, 
  Bell, 
  User, 
  Zap, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Search,
  Menu,
  ChevronDown,
  Terminal
} from 'lucide-react';
import { ApiLog, DashboardStats } from './types';
import { MOCK_LOGS, MOCK_CHART_DATA } from './mockData';
import { LogList } from './components/LogList';
import { LogDetails } from './components/LogDetails';
import { TrafficChart, LatencyChart } from './components/Charts';
import { ApiTester } from './components/ApiTester';
import { cn, formatLatency } from './lib/utils';

export default function App() {
  const [logs, setLogs] = useState<ApiLog[]>(MOCK_LOGS);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs' | 'tester'>('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalRequests: 12450,
    errorRate: 1.2,
    avgLatency: 145,
    p95Latency: 420,
    requestsPerMinute: 85
  });

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: ApiLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)] as any,
        path: ['/api/v1/users', '/api/v1/posts', '/api/v1/auth/login', '/api/v1/analytics'][Math.floor(Math.random() * 4)],
        status: [200, 201, 204, 400, 401, 404, 500][Math.floor(Math.random() * 7)],
        latency: Math.floor(Math.random() * 800) + 20,
        request: { headers: { 'Accept': 'application/json' } },
        response: { headers: { 'Content-Type': 'application/json' } },
        clientIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0...'
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500/10">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col z-40">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 rotate-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">Sentinel</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
          />
          <NavItem 
            active={activeTab === 'tester'} 
            onClick={() => setActiveTab('tester')}
            icon={<Terminal className="w-5 h-5" />}
            label="API Tester"
          />
          <NavItem 
            active={activeTab === 'logs'} 
            onClick={() => setActiveTab('logs')}
            icon={<ListTree className="w-5 h-5" />}
            label="Logs Explorer"
          />
          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">System</div>
          <NavItem 
            active={false} 
            onClick={() => {}}
            icon={<Activity className="w-5 h-5" />}
            label="Performance"
          />
          <NavItem 
            active={false} 
            onClick={() => {}}
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
          />
        </nav>

        <div className="p-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 creative-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">Admin User</p>
                <p className="text-[10px] font-medium text-slate-500 truncate">skous2034@gmail.com</p>
              </div>
            </div>
            <button className="w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all border border-slate-200 rounded-xl bg-white hover:border-indigo-100 hover:bg-indigo-50/30">
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 border-b border-slate-100 bg-white/70 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 text-slate-400 hover:text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-3">
              <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">Project</div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                Laravel Backend <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search logs, endpoints..." 
                className="pl-11 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 w-72 transition-all"
              />
            </div>
            <button className="relative p-2.5 bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 space-y-8 flex-1">
          {activeTab === 'dashboard' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Requests" 
                  value={stats.totalRequests.toLocaleString()} 
                  trend="+12.5%" 
                  icon={<Zap className="w-6 h-6 text-indigo-500" />}
                />
                <StatCard 
                  title="Avg Latency" 
                  value={formatLatency(stats.avgLatency)} 
                  trend="-4.2%" 
                  icon={<Clock className="w-6 h-6 text-emerald-500" />}
                />
                <StatCard 
                  title="Error Rate" 
                  value={`${stats.errorRate}%`} 
                  trend="+0.1%" 
                  isNegative
                  icon={<AlertTriangle className="w-6 h-6 text-rose-500" />}
                />
                <StatCard 
                  title="RPM" 
                  value={stats.requestsPerMinute.toString()} 
                  trend="+5.4%" 
                  icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
                />
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-slate-100 rounded-3xl creative-shadow">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Traffic Overview</h3>
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/20"></span>
                        <span className="text-slate-400">Requests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20"></span>
                        <span className="text-slate-400">Errors</span>
                      </div>
                    </div>
                  </div>
                  <TrafficChart data={MOCK_CHART_DATA} />
                </div>

                <div className="p-8 bg-white border border-slate-100 rounded-3xl creative-shadow">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Latency Trends</h3>
                    <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Real-time
                    </div>
                  </div>
                  <LatencyChart data={MOCK_CHART_DATA} />
                </div>
              </div>

              {/* Recent Logs Preview */}
              <div className="h-[600px]">
                <LogList 
                  logs={logs.slice(0, 10)} 
                  onSelectLog={setSelectedLog} 
                  selectedLogId={selectedLog?.id}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'tester' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ApiTester />
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[calc(100vh-14rem)]"
            >
              <LogList 
                logs={logs} 
                onSelectLog={setSelectedLog} 
                selectedLogId={selectedLog?.id}
              />
            </motion.div>
          )}
        </div>
      </main>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLog && (
          <LogDetails 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-black transition-all relative group overflow-hidden",
        active 
          ? "text-indigo-600 bg-indigo-50/50" 
          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
      )}
    >
      <div className={cn(
        "transition-transform duration-300 group-hover:scale-110",
        active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
      )}>
        {icon}
      </div>
      {label}
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full"
        />
      )}
    </button>
  );
}

function StatCard({ title, value, trend, icon, isNegative }: { title: string, value: string, trend: string, icon: React.ReactNode, isNegative?: boolean }) {
  return (
    <div className="p-6 bg-white border border-slate-100 rounded-3xl creative-shadow hover:border-indigo-100 transition-all group relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:shadow-lg group-hover:shadow-slate-200/50 transition-all">
            {icon}
          </div>
          <span className={cn(
            "text-[10px] font-black px-2.5 py-1 rounded-full border shadow-sm",
            isNegative ? "text-rose-600 bg-rose-50 border-rose-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
          )}>
            {trend}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{title}</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
        </div>
      </div>
    </div>
  );
}

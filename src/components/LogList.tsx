import React from 'react';
import { motion } from 'motion/react';
import { ApiLog } from '../types';
import { cn, getStatusColor, formatLatency } from '../lib/utils';
import { format } from 'date-fns';
import { ChevronRight, Search, Filter, Clock, Globe, Shield } from 'lucide-react';

interface LogListProps {
  logs: ApiLog[];
  onSelectLog: (log: ApiLog) => void;
  selectedLogId?: string;
}

export const LogList: React.FC<LogListProps> = ({ logs, onSelectLog, selectedLogId }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl creative-shadow overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <h2 className="text-sm font-bold text-slate-800">Live Traffic Logs</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter endpoints..." 
              className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 w-48 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Method</th>
              <th className="px-6 py-4 font-bold">Endpoint</th>
              <th className="px-6 py-4 font-bold text-right">Latency</th>
              <th className="px-6 py-4 font-bold text-right">Time</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.map((log) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => onSelectLog(log)}
                className={cn(
                  "group cursor-pointer hover:bg-slate-50/50 transition-all",
                  selectedLogId === log.id && "bg-indigo-50/50 hover:bg-indigo-50/70"
                )}
              >
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold border shadow-sm",
                    getStatusColor(log.status)
                  )}>
                    {log.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[11px] font-mono font-black tracking-tighter",
                    log.method === 'GET' ? 'text-blue-500' :
                    log.method === 'POST' ? 'text-emerald-500' :
                    log.method === 'PUT' ? 'text-amber-500' :
                    log.method === 'DELETE' ? 'text-rose-500' : 'text-slate-500'
                  )}>
                    {log.method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-medium text-slate-700 truncate max-w-[240px]">
                      {log.path}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Globe className="w-2.5 h-2.5" /> {log.clientIp}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={cn(
                    "text-xs font-mono font-bold",
                    log.latency > 500 ? "text-rose-500" : log.latency > 200 ? "text-amber-500" : "text-slate-500"
                  )}>
                    {formatLatency(log.latency)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-[10px] font-medium text-slate-400">
                    {format(new Date(log.timestamp), 'HH:mm:ss')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                    selectedLogId === log.id ? "bg-indigo-100 text-indigo-600" : "text-slate-300 group-hover:text-slate-500"
                  )}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

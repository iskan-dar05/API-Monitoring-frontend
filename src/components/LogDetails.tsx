import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ApiLog } from '../types';
import { cn, getStatusColor, formatLatency } from '../lib/utils';
import { format } from 'date-fns';
import { X, Copy, Terminal, Database, Shield, Globe, Cpu, Clock } from 'lucide-react';

interface LogDetailsProps {
  log: ApiLog | null;
  onClose: () => void;
}

export const LogDetails: React.FC<LogDetailsProps> = ({ log, onClose }) => {
  if (!log) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <span className={cn(
            "px-3 py-1 rounded-xl text-xs font-black border shadow-sm",
            getStatusColor(log.status)
          )}>
            {log.status}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 tracking-tight">{log.method}</span>
            <span className="text-xs font-mono text-slate-500 truncate max-w-[300px]">{log.path}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Overview Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-black">
              <Clock className="w-3.5 h-3.5" /> Timestamp
            </div>
            <div className="text-sm text-slate-700 font-mono font-medium">
              {format(new Date(log.timestamp), 'MMM d, HH:mm:ss.SSS')}
            </div>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-black">
              <Cpu className="w-3.5 h-3.5" /> Latency
            </div>
            <div className={cn(
              "text-sm font-mono font-black",
              log.latency > 500 ? "text-rose-500" : log.latency > 200 ? "text-amber-500" : "text-emerald-500"
            )}>
              {formatLatency(log.latency)}
            </div>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-black">
              <Globe className="w-3.5 h-3.5" /> Client IP
            </div>
            <div className="text-sm text-slate-700 font-mono font-medium">{log.clientIp}</div>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-black">
              <Shield className="w-3.5 h-3.5" /> User Agent
            </div>
            <div className="text-[11px] text-slate-500 truncate font-mono" title={log.userAgent}>
              {log.userAgent}
            </div>
          </div>
        </div>

        {/* Request Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-indigo-500" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">Request Data</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3 ml-1">Headers</h4>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden creative-shadow">
                {Object.entries(log.request.headers).map(([key, value]) => (
                  <div key={key} className="flex border-b border-slate-50 last:border-0 px-5 py-3 text-[11px] font-mono">
                    <span className="text-indigo-600 w-40 shrink-0 font-bold">{key}</span>
                    <span className="text-slate-600 break-all">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {log.request.body && (
              <div>
                <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3 ml-1">Body Payload</h4>
                <div className="relative group">
                  <pre className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-[11px] font-mono text-slate-700 overflow-x-auto leading-relaxed">
                    {JSON.stringify(log.request.body, null, 2)}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(JSON.stringify(log.request.body, null, 2))}
                    className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:border-indigo-200 hover:text-indigo-600 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Response Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Database className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">Response Data</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3 ml-1">Headers</h4>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden creative-shadow">
                {Object.entries(log.response.headers).map(([key, value]) => (
                  <div key={key} className="flex border-b border-slate-50 last:border-0 px-5 py-3 text-[11px] font-mono">
                    <span className="text-emerald-600 w-40 shrink-0 font-bold">{key}</span>
                    <span className="text-slate-600 break-all">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {log.response.body && (
              <div>
                <h4 className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3 ml-1">Body Payload</h4>
                <div className="relative group">
                  <pre className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-[11px] font-mono text-slate-700 overflow-x-auto leading-relaxed">
                    {JSON.stringify(log.response.body, null, 2)}
                  </pre>
                  <button 
                    onClick={() => copyToClipboard(JSON.stringify(log.response.body, null, 2))}
                    className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:border-emerald-200 hover:text-emerald-600 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Plus, Trash2, Code, Settings2, Globe, Shield, Terminal } from 'lucide-react';
import { HttpMethod } from '../types';
import { cn } from '../lib/utils';

interface HeaderRow {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export const ApiTester: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
    { id: '2', key: 'Accept', value: 'application/json', enabled: true }
  ]);
  const [body, setBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [activeTab, setActiveTab] = useState<'headers' | 'body'>('headers');
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const addHeader = () => {
    setHeaders([...headers, { id: Math.random().toString(), key: '', value: '', enabled: true }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  const updateHeader = (id: string, field: 'key' | 'value' | 'enabled', val: any) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
  };

  const handleSend = async () => {
    setIsSending(true);
    // Simulate API call to Laravel backend
    setTimeout(() => {
      setResponse({
        status: 200,
        time: '124ms',
        size: '1.2 KB',
        data: {
          success: true,
          message: "Request processed by Laravel Sentinel Middleware",
          echo: {
            method,
            url,
            headers: headers.filter(h => h.enabled).reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}),
            body: method !== 'GET' ? JSON.parse(body || '{}') : null
          }
        }
      });
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">API Tester</h2>
        <p className="text-sm text-slate-500">Construct and send requests to your endpoints.</p>
      </div>

      <div className="glass-card rounded-2xl p-1 creative-shadow overflow-hidden">
        <div className="flex items-center gap-2 p-3 bg-slate-50/50 rounded-t-xl border-b border-slate-100">
          <select 
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className={cn(
              "px-4 py-2 rounded-xl font-bold text-sm border-2 focus:outline-none transition-all cursor-pointer",
              method === 'GET' ? "border-blue-100 text-blue-600 bg-blue-50" :
              method === 'POST' ? "border-emerald-100 text-emerald-600 bg-emerald-50" :
              method === 'PUT' ? "border-amber-100 text-amber-600 bg-amber-50" :
              method === 'DELETE' ? "border-rose-100 text-rose-600 bg-rose-50" : "border-slate-100 text-slate-600 bg-slate-50"
            )}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>

          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Globe className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/v1/resource"
              className="w-full pl-11 pr-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>

          <button 
            onClick={handleSend}
            disabled={isSending}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send
          </button>
        </div>

        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('headers')}
            className={cn(
              "px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all relative",
              activeTab === 'headers' ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Headers
            {activeTab === 'headers' && <motion.div layoutId="tester-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('body')}
            className={cn(
              "px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all relative",
              activeTab === 'body' ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Body
            {activeTab === 'body' && <motion.div layoutId="tester-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
          </button>
        </div>

        <div className="p-6 min-h-[300px] bg-white">
          <AnimatePresence mode="wait">
            {activeTab === 'headers' ? (
              <motion.div 
                key="headers"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-[30px_1fr_1fr_40px] gap-4 px-2 mb-2">
                  <div className=""></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</div>
                  <div className=""></div>
                </div>
                {headers.map((header) => (
                  <div key={header.id} className="grid grid-cols-[30px_1fr_1fr_40px] gap-4 items-center group">
                    <input 
                      type="checkbox" 
                      checked={header.enabled}
                      onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <input 
                      type="text" 
                      value={header.key}
                      onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                      placeholder="Header Key"
                      className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-200 transition-all"
                    />
                    <input 
                      type="text" 
                      value={header.value}
                      onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-mono focus:outline-none focus:border-indigo-200 transition-all"
                    />
                    <button 
                      onClick={() => removeHeader(header.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addHeader}
                  className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add Header
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="body"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Code className="w-3 h-3" /> JSON Body
                  </div>
                </div>
                <textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full h-64 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-mono focus:outline-none focus:border-indigo-200 transition-all resize-none"
                  placeholder='{ "key": "value" }'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Response Section */}
      <AnimatePresence>
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-500" /> Response
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  Status: <span className={cn(
                    "px-1.5 py-0.5 rounded border",
                    response.status === 200 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"
                  )}>{response.status}</span>
                </span>
                <span>Time: <span className="text-slate-800">{response.time}</span></span>
                <span>Size: <span className="text-slate-800">{response.size}</span></span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 creative-shadow bg-white">
              <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

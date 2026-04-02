import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLatency(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (status >= 300 && status < 400) return "text-blue-600 bg-blue-50 border-blue-200";
  if (status >= 400 && status < 500) return "text-amber-600 bg-amber-50 border-amber-200";
  if (status >= 500) return "text-rose-600 bg-rose-50 border-rose-200";
  return "text-slate-600 bg-slate-50 border-slate-200";
}

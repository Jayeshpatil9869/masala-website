"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";

type LoginLog = {
  id: string;
  user_id: string | null;
  email: string | null;
  full_name: string | null;
  event: string;
  method: string;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
};

export default function LoginLogsPage() {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    setHint(null);
    try {
      const res = await fetch("/api/admin/login-logs");
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to load login logs");
        setHint(json.hint || null);
        setLogs([]);
      } else {
        setLogs(json);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load login logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Login Logs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customer signup and sign-in activity from the storefront
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-full"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500 gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading logs…
        </div>
      ) : error ? (
        <div className="border border-red-200 bg-red-50 p-6 rounded-none">
          <p className="text-sm font-medium text-red-700">{error}</p>
          {hint && <p className="text-sm text-red-600 mt-2">{hint}</p>}
        </div>
      ) : logs.length === 0 ? (
        <div className="border border-[#e5e5e5] bg-[#f5f5f5] p-12 text-center text-sm text-[#707072]">
          No login activity yet. Customer signups and logins will appear here.
        </div>
      ) : (
        <div className="bg-white border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f5f5f5] border-b border-[#e5e5e5]">
                <tr className="text-left text-xs uppercase tracking-wider text-[#707072]">
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#fafafa]">
                    <td className="px-4 py-3 text-[#39393b] whitespace-nowrap">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-4 py-3 text-[#111111] font-medium">
                      {log.full_name || "—"}
                    </td>
                    <td className="px-4 py-3 text-[#39393b]">{log.email || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#111111] text-xs font-medium capitalize">
                        {log.event}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-[#39393b]">{log.method}</td>
                    <td className="px-4 py-3 text-[#707072] font-mono text-xs">
                      {log.ip || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

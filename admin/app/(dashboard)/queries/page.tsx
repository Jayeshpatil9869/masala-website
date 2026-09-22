"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  MessageSquare,
  Eye,
  Trash2,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  X,
  Send,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

type Query = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewQuery, setViewQuery] = useState<Query | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadQueries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/queries");
      if (!res.ok) throw new Error("Failed to load queries");
      const data = await res.json();
      setQueries(data || []);
    } catch (error: unknown) {
      toast.error("Failed to load queries", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQueries();
  }, [loadQueries]);

  const markAsRead = async (id: string, currentStatus: boolean | null) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/queries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setQueries((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, is_read: !currentStatus } : q,
        ),
      );
      if (viewQuery && viewQuery.id === id) {
        setViewQuery({ ...viewQuery, is_read: !currentStatus });
      }
      toast.success(!currentStatus ? "Marked as resolved / read" : "Marked as unread");
    } catch (error: unknown) {
      toast.error("Failed to update status", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setPendingDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    if (isDeleting) return;
    setDeleteModalOpen(false);
    setPendingDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    setProcessingId(pendingDeleteId);
    try {
      const res = await fetch(`/api/admin/queries/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete query");
      setQueries((prev) => prev.filter((q) => q.id !== pendingDeleteId));
      toast.success("Query deleted");
      if (viewQuery?.id === pendingDeleteId) setViewQuery(null);
      setDeleteModalOpen(false);
      setPendingDeleteId(null);
    } catch (error: unknown) {
      toast.error("Failed to delete query", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsDeleting(false);
      setProcessingId(null);
    }
  };

  const unreadCount = queries.filter((q) => !q.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {unreadCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D30005] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {unreadCount} Unread Inquiry{unreadCount > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#007D48] border border-emerald-100">
                <CheckCircle2 className="w-3 h-3" /> All Inquiries Caught Up
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#111111] uppercase tracking-wide">
            Customer Inquiries
          </h1>
          <p className="text-sm text-[#707072]">
            Wholesale, catering, and retail messages submitted from your storefront contact form.
          </p>
        </div>
      </div>

      {/* Main Queries Container */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin text-[#111111]" />
          </div>
        ) : queries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-[#9E9EA0]" />
            </div>
            <p className="text-sm font-semibold text-[#111111]">No customer inquiries yet</p>
            <p className="text-xs text-[#707072] mt-1 max-w-sm">
              Customer queries submitted through the contact page will automatically show up here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[11px] font-bold text-[#707072] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="hidden md:table-cell px-5 py-3.5">Subject</th>
                  <th className="hidden lg:table-cell px-5 py-3.5">Preview</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="hidden sm:table-cell px-5 py-3.5">Received</th>
                  <th className="text-right px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0]">
                {queries.map((q) => (
                  <tr
                    key={q.id}
                    className={`hover:bg-[#FAFAFA] transition-colors cursor-pointer group ${
                      !q.is_read ? "bg-orange-50/20" : ""
                    }`}
                    onClick={() => {
                      setViewQuery(q);
                      if (!q.is_read) markAsRead(q.id, q.is_read);
                    }}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {!q.is_read && (
                          <span className="w-2 h-2 rounded-full bg-[#D30005] flex-shrink-0 animate-ping" />
                        )}
                        <div>
                          <p className="font-semibold text-[#111111] group-hover:text-[#D30005] transition-colors">
                            {q.name}
                          </p>
                          <p className="text-xs text-[#707072] mt-0.5">{q.email}</p>
                          {q.phone && (
                            <p className="text-[11px] text-[#9E9EA0] font-mono">{q.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-5 py-4">
                      <span className="font-medium text-[#4B4B4D]">
                        {q.subject || "General Inquiry"}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-5 py-4">
                      <p className="text-xs text-[#707072] line-clamp-1 max-w-xs">
                        {q.message}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      {q.is_read ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-[#007D48] text-xs font-semibold rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3" /> Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 text-[#D30005] text-xs font-semibold rounded-full border border-red-100">
                          <span className="w-1.5 h-1.5 bg-[#D30005] rounded-full" />
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="hidden sm:table-cell px-5 py-4 text-xs text-[#707072]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#9E9EA0]" />
                        {formatDate(q.created_at)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewQuery(q);
                            if (!q.is_read) markAsRead(q.id, q.is_read);
                          }}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#111111] hover:bg-[#F5F5F5] transition"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(q.id);
                          }}
                          disabled={processingId === q.id}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#D30005] hover:bg-red-50 transition disabled:opacity-50"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Query Detail Modal */}
      {viewQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setViewQuery(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-7 z-10 border border-[#EAEAEA]">
            <div className="flex items-start justify-between mb-5 pb-3 border-b border-[#EAEAEA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9EA0]">
                  Customer Message
                </span>
                <h2 className="font-bold text-lg text-[#111111] mt-0.5">
                  {viewQuery.name}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <a
                    href={`mailto:${viewQuery.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#111111] hover:text-[#D30005] font-semibold bg-[#F5F5F5] px-2.5 py-1 rounded-lg border border-[#EAEAEA] transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#707072]" />
                    {viewQuery.email}
                  </a>
                  {viewQuery.phone && (
                    <a
                      href={`tel:${viewQuery.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#111111] hover:text-[#D30005] font-semibold bg-[#F5F5F5] px-2.5 py-1 rounded-lg border border-[#EAEAEA] transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#707072]" />
                      {viewQuery.phone}
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => setViewQuery(null)}
                className="p-1.5 rounded-lg text-[#707072] hover:bg-[#F5F5F5] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {viewQuery.subject && (
              <div className="mb-4">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1">
                  Subject Line
                </span>
                <p className="text-sm font-semibold text-[#111111]">
                  {viewQuery.subject}
                </p>
              </div>
            )}

            <div className="mb-4">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1">
                Full Inquiry Text
              </span>
              <div className="bg-[#F9F9F9] border border-[#EAEAEA] rounded-xl p-4 text-sm text-[#39393B] leading-relaxed whitespace-pre-wrap">
                {viewQuery.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA] flex-wrap gap-2">
              <span className="text-[11px] text-[#9E9EA0]">
                Received {formatDate(viewQuery.created_at)}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => markAsRead(viewQuery.id, viewQuery.is_read)}
                  disabled={processingId === viewQuery.id}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] transition"
                >
                  {viewQuery.is_read ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewQuery(null);
                    openDeleteModal(viewQuery.id);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-red-50 hover:bg-red-100 text-[#D30005] transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Delete Customer Query"
        description="Are you sure you want to delete this customer inquiry? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
}

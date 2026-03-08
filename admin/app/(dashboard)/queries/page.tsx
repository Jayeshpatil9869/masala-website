"use client";

import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";
import { MessageSquare, Eye, Trash2, Loader2, CheckCircle } from "lucide-react";
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

      setQueries(
        queries.map((q) =>
          q.id === id ? { ...q, is_read: !currentStatus } : q,
        ),
      );
      toast.success(!currentStatus ? "Marked as read" : "Marked as unread");
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Contact Queries
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Customer messages from the contact form
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : queries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">No contact queries yet</p>
          </div>
        ) : (
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
            <table className="w-full text-sm relative">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Subject
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Message
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {queries.map((q) => (
                  <tr
                    key={q.id}
                    className={`hover:bg-orange-50/30 transition-colors cursor-pointer ${!q.is_read ? "bg-orange-50/20" : ""}`}
                    onClick={() => {
                      setViewQuery(q);
                      if (!q.is_read) markAsRead(q.id, q.is_read);
                    }}
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!q.is_read && (
                          <span className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{q.name}</p>
                          <p className="text-xs text-gray-400">{q.email}</p>
                          {q.phone && (
                            <p className="text-xs text-gray-400">{q.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      <span className="text-gray-600">{q.subject || "—"}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                      <p className="text-gray-500 text-xs line-clamp-2 max-w-xs">
                        {q.message}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {q.is_read ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" /> Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />{" "}
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-400 text-xs hidden sm:table-cell">
                      {formatDate(q.created_at)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewQuery(q);
                            if (!q.is_read) markAsRead(q.id, q.is_read);
                          }}
                          className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!q.is_read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(q.id, q.is_read);
                            }}
                            disabled={processingId === q.id}
                            className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 transition disabled:opacity-50"
                          >
                            {processingId === q.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(q.id);
                          }}
                          disabled={processingId === q.id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
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

      {/* View Modal */}
      {viewQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setViewQuery(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  {viewQuery.name}
                </h2>
                <p className="text-sm text-gray-400">{viewQuery.email}</p>
                {viewQuery.phone && (
                  <p className="text-sm text-gray-400">{viewQuery.phone}</p>
                )}
              </div>
              <button
                onClick={() => setViewQuery(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400"
              >
                ✕
              </button>
            </div>
            {viewQuery.subject && (
              <div className="mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  {viewQuery.subject}
                </p>
              </div>
            )}
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Message
              </span>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                {viewQuery.message}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              {formatDate(viewQuery.created_at)}
            </p>
            <button
              onClick={() => {
                setViewQuery(null);
                openDeleteModal(viewQuery.id);
              }}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4" /> Delete Query
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Delete Query"
        description="Are you sure you want to delete this inquiry? This message will be permanently removed and cannot be recovered."
        isDeleting={isDeleting}
      />
    </div>
  );
}

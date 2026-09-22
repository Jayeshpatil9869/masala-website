"use client";

import { Trash2, X, AlertTriangle } from "lucide-react";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  isDeleting?: boolean;
};

export default function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Delete Item",
  description = "Are you sure you want to delete this? This action cannot be undone.",
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={!isDeleting ? onCancel : undefined}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10 border border-[#EAEAEA] animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#707072] hover:text-[#111111] hover:bg-[#F5F5F5] transition disabled:opacity-40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-50 text-[#D30005] rounded-2xl mb-4 mx-auto border border-red-100">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-base font-bold text-[#111111] mb-1.5">{title}</h3>
          <p className="text-xs text-[#707072] leading-relaxed">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 border border-[#E5E5E5] text-[#111111] text-xs font-semibold rounded-xl hover:bg-[#F5F5F5] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D30005] hover:bg-[#780700] text-white text-xs font-semibold rounded-xl shadow-sm transition disabled:opacity-70 disabled:cursor-not-allowed btn-press-active"
          >
            {isDeleting ? (
              <>
                <svg
                  className="w-3.5 h-3.5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

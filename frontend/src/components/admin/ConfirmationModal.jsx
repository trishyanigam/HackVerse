import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmationModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#0f0f1a] border border-white/5 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                  isDestructive
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                }`}>
                  <FiAlertTriangle size={18} />
                </div>
                <button
                  onClick={onCancel}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
              </div>
            </div>

            {/* Actions footer */}
            <div className="bg-[#0b0b14] px-6 py-4 flex items-center justify-end gap-3 border-t border-white/5">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 transition-all"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                  isDestructive
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/10'
                    : 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/10'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;

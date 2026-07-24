import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#16161f] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                danger ? 'bg-red-500/15 border border-red-500/25' : 'bg-amber-500/15 border border-amber-500/25'
              }`}>
                <FiAlertTriangle size={18} className={danger ? 'text-red-400' : 'text-amber-400'} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{message}</p>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 mt-0.5">
                <FiX size={18} />
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-slate-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); onClose(); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg ${
                  danger
                    ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:opacity-90'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;

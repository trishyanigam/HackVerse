import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import ExportButton from '../../components/admin/ExportButton';
import { adminReportsList } from '../../mock/admin/reports';
import { FiFileText, FiClock, FiDatabase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Reports = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold text-white tracking-wide">Generate Reports</h2>
          <p className="text-xs text-slate-500 mt-1">Audit and export platform dataset snapshots in multiple file formats.</p>
        </motion.div>

        {/* Reports Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {adminReportsList.map((rep, idx) => (
            <motion.div
              key={rep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-white/10 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-md px-2 py-0.5">
                    {rep.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <FiClock size={12} />
                    <span>Last: {new Date(rep.lastGenerated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">{rep.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {rep.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <FiDatabase size={13} className="text-slate-600" />
                  <span>{rep.records} database records</span>
                </div>
                <ExportButton filename={rep.name.toLowerCase().replace(/\s+/g, '_')} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;

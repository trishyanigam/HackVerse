import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import SettingsCard from '../../components/admin/SettingsCard';
import { motion } from 'framer-motion';
import { FiSave, FiUploadCloud, FiMail, FiBell, FiShield, FiDatabase, FiSun, FiMoon } from 'react-icons/fi';
import toast from 'react-hot-toast';

const SystemSettings = () => {
  const [platformName, setPlatformName] = useState('HackVerse Platform');
  const [maintenance, setMaintenance] = useState(false);
  const [emailHost, setEmailHost] = useState('smtp.mailgun.org');
  const [emailPort, setEmailPort] = useState('587');
  const [darkMode, setDarkMode] = useState(true);
  const [requireVerification, setRequireVerification] = useState(true);
  const [backupSchedule, setBackupSchedule] = useState('daily');

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: 'Saving server settings...',
        success: 'Settings updated successfully!',
        error: 'Save failed.',
      }
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">System Settings</h2>
            <p className="text-xs text-slate-500 mt-1">Configure global variables, security protocols, and backup intervals.</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
          >
            <FiSave size={14} /> Save Configuration
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* General Platform Settings */}
          <SettingsCard title="Platform Information" description="Global styling properties and app identifiers.">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  Platform Display Name
                </label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>

              {/* Logo upload mockup */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  Platform Logo
                </label>
                <div className="border border-dashed border-white/10 hover:border-purple-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all bg-white/[0.01]">
                  <FiUploadCloud size={20} className="text-slate-500" />
                  <p className="text-[10px] font-bold text-slate-300">Upload new image</p>
                  <p className="text-[9px] text-slate-600 font-semibold">PNG, SVG (max 500kb)</p>
                </div>
              </div>

              {/* Theme toggle simulation */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-300 font-semibold">Default Interface Style</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all"
                >
                  {darkMode ? (
                    <>
                      <FiMoon size={12} className="text-purple-400" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <FiSun size={12} className="text-amber-400" /> Light Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </SettingsCard>

          {/* Email Host Settings */}
          <SettingsCard title="SMTP Mail Settings" description="Outgoing notification host configuration.">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  SMTP Host Address
                </label>
                <input
                  type="text"
                  value={emailHost}
                  onChange={(e) => setEmailHost(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    value={emailPort}
                    onChange={(e) => setEmailPort(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                    SSL Protocol
                  </label>
                  <select className="w-full bg-[#0f0f1a] border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all">
                    <option>STARTTLS</option>
                    <option>SSL/TLS</option>
                  </select>
                </div>
              </div>
            </div>
          </SettingsCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Security Configurations */}
          <SettingsCard title="Security & Access Policies" description="Platform registration and validation settings.">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-bold">Email Address Verification</p>
                  <p className="text-[10px] text-slate-500">Require users to verify registration email</p>
                </div>
                <input
                  type="checkbox"
                  checked={requireVerification}
                  onChange={(e) => setRequireVerification(e.target.checked)}
                  className="rounded border-slate-600 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#0f0f1a]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-bold">Maintenance Mode</p>
                  <p className="text-[10px] text-slate-500">Disable platform interaction for users</p>
                </div>
                <input
                  type="checkbox"
                  checked={maintenance}
                  onChange={(e) => setMaintenance(e.target.checked)}
                  className="rounded border-slate-600 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#0f0f1a]"
                />
              </div>
            </div>
          </SettingsCard>

          {/* Database Backup intervals */}
          <SettingsCard title="Database & backups" description="Automated snapshot intervals and download logs.">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">
                  Automated Backup Frequency
                </label>
                <select
                  value={backupSchedule}
                  onChange={(e) => setBackupSchedule(e.target.value)}
                  className="w-full bg-[#0f0f1a] border border-white/5 focus:border-purple-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all"
                >
                  <option value="hourly">Hourly Snapshots</option>
                  <option value="daily">Daily Backup</option>
                  <option value="weekly">Weekly Archive</option>
                </select>
              </div>

              <button
                onClick={() => toast.success('Triggering snapshot download...')}
                className="w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 rounded-xl text-xs font-semibold transition-all"
              >
                Create Manual System Backup
              </button>
            </div>
          </SettingsCard>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemSettings;

import React, { useState } from 'react';
import { FiMoon, FiSun, FiBell, FiGlobe, FiTrash2, FiShield, FiAlertTriangle } from 'react-icons/fi';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import Select from '../components/forms/Select';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import toast from 'react-hot-toast';

export const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [teamInvites, setTeamInvites] = useState(true);
  const [language, setLanguage] = useState('en');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    setDeleteModalOpen(false);
    toast.error('Mock Account Deletion trigger processed.');
  };

  return (
    <PageContainer
      title="Platform Settings"
      description="Configure your preferences, theme options, language settings, and account privacy."
      className="space-y-8"
    >
      <div className="max-w-3xl space-y-6">
        {/* Appearance Settings */}
        <Card title="Appearance & Theme" subtitle="Custom visual preferences">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                {darkMode ? <FiMoon className="text-brand-purple" /> : <FiSun className="text-amber-400" />}
                Theme Preference
              </h4>
              <p className="text-[11px] text-slate-400">
                {darkMode ? 'Currently set to Dark Glassmorphism Mode (Recommended)' : 'Light Theme Mode'}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDarkMode(!darkMode);
                toast.success(`Theme switched to ${!darkMode ? 'Dark' : 'Light'} Mode`);
              }}
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notification Preferences" subtitle="Control when and how you receive alerts">
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-dark-border/40 pb-3">
              <div>
                <h4 className="font-semibold text-white">Email Digest Alerts</h4>
                <p className="text-[11px] text-slate-400">Receive weekly summaries of active hackathons</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-purple" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Team & Squad Invites</h4>
                <p className="text-[11px] text-slate-400">Get notified when hackers invite you to a team</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={teamInvites}
                  onChange={() => setTeamInvites(!teamInvites)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-purple" />
              </label>
            </div>
          </div>
        </Card>

        {/* Language Selector */}
        <Card title="Language & Regional Settings">
          <div className="max-w-xs">
            <Select
              label="Platform Display Language"
              id="language-select"
              options={[
                { value: 'en', label: 'English (US)' },
                { value: 'es', label: 'Spanish (Español)' },
                { value: 'de', label: 'German (Deutsch)' },
                { value: 'fr', label: 'French (Français)' }
              ]}
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                toast.success('Language setting updated');
              }}
            />
          </div>
        </Card>

        {/* Danger Zone */}
        <Card title="Danger Zone" className="border-red-900/40 bg-red-950/5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-red-400">Delete Account</h4>
              <p className="text-[11px] text-slate-400">
                Permanently delete your profile data and hackathon records.
              </p>
            </div>

            <Button
              variant="danger"
              size="sm"
              leftIcon={<FiTrash2 size={14} />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>

      {/* Delete Account Modal Confirmation */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Account Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-950/40 border border-red-900/50 rounded-lg text-red-300 text-xs">
            <FiAlertTriangle size={20} className="shrink-0 text-red-400 mt-0.5" />
            <p>
              This action is permanent and cannot be undone. All your project submissions, leaderboard records, and squad entries will be purged.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteAccount}
            >
              Yes, Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Settings;

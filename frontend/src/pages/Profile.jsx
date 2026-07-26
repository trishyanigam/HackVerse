import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiBookOpen, FiEdit2, FiShield } from 'react-icons/fi';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user: authUser } = useAuth();

  const [profile, setProfile] = useState({
    name: authUser?.name || 'Registered Hacker',
    email: authUser?.email || 'hacker@hackverse.io',
    role: (authUser?.role || 'Participant').toUpperCase(),
    college: 'Stanford University (CS & AI Lab)',
    phone: '+1 (555) 234-5678',
    bio: 'Full-stack AI developer specializing in autonomous LLM workflows and Web3 integrations. Competing in hackathons to deploy production-ready tools.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setEditModalOpen(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <PageContainer
      title="Hacker Profile"
      description="Manage your account profile parameters, contact details, and organization badges."
      headerActions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<FiEdit2 size={14} />}
          onClick={() => setEditModalOpen(true)}
        >
          Edit Profile
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar Card */}
        <Card className="lg:col-span-1 text-center p-6 space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-brand-purple shadow-xl mx-auto"
            />
            <span className="absolute bottom-1 right-1 h-4 w-4 bg-emerald-400 border-2 border-dark-card rounded-full" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-wide">{profile.name}</h2>
            <p className="text-xs text-slate-400">{profile.email}</p>
          </div>

          <div className="pt-2 flex justify-center">
            <Badge variant="primary" size="md" dot>
              {profile.role}
            </Badge>
          </div>
        </Card>

        {/* Right Side: Detailed Profile Details */}
        <Card title="Account Details" className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiUser /> Full Name
              </span>
              <p className="text-sm font-semibold text-white">{profile.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiMail /> Email Address
              </span>
              <p className="text-sm font-semibold text-white">{profile.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiShield /> Platform Role
              </span>
              <p className="text-sm font-semibold text-brand-purple">{profile.role}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiBookOpen /> College / Organization
              </span>
              <p className="text-sm font-semibold text-white">{profile.college}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider flex items-center gap-1">
                <FiPhone /> Contact Phone
              </span>
              <p className="text-sm font-semibold text-white">{profile.phone}</p>
            </div>
          </div>

          <div className="border-t border-dark-border/40 pt-4 space-y-1">
            <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              Developer Bio
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-dark-bg/60 p-4 rounded-lg border border-dark-border/30">
              {profile.bio}
            </p>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Hacker Profile"
        size="md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            id="edit-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            id="edit-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="College / Organization"
            id="edit-college"
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          />

          <Input
            label="Phone Number"
            id="edit-phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Textarea
            label="Developer Bio"
            id="edit-bio"
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />

          <div className="pt-3 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};

export default Profile;

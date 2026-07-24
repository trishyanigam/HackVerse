import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiLayers, FiSliders, FiCheckCircle, FiInfo, FiAlertCircle, 
  FiPlus, FiMail, FiLock, FiCalendar, FiArrowRight, FiUser, 
  FiSearch, FiTrash2, FiPlay, FiSmile, FiCompass
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import PageContainer from '../components/ui/PageContainer';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Select from '../components/forms/Select';
import LoadingSpinner from '../components/feedback/LoadingSpinner';
import SkeletonLoader from '../components/feedback/SkeletonLoader';
import EmptyState from '../components/feedback/EmptyState';

export const Showcase = () => {
  // Tabs for organizing the showcase
  const [activeTab, setActiveTab] = useState('common');

  // Modal demo states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('md');
  const [modalTitle, setModalTitle] = useState('Configure Project Details');

  // Full screen loading spinner trigger
  const [showFullPageSpinner, setShowFullPageSpinner] = useState(false);

  // Form input validation state demo
  const [inputVal, setInputVal] = useState('');
  const [inputError, setInputError] = useState('');

  // Handle fake validation
  const handleVerifyInput = () => {
    if (!inputVal.includes('@')) {
      setInputError('Please enter a valid developer email containing @');
    } else {
      setInputError('');
      alert('Email verified successfully! Props validation passes.');
    }
  };

  const triggerFullPageLoader = () => {
    setShowFullPageSpinner(true);
    setTimeout(() => {
      setShowFullPageSpinner(false);
    }, 2500);
  };

  const tabs = [
    { id: 'common', label: 'UI / Common', icon: FiLayers },
    { id: 'forms', label: 'Form Controls', icon: FiSliders },
    { id: 'feedback', label: 'Status & Feedback', icon: FiCheckCircle }
  ];

  return (
    <PageContainer
      title="HackVerse Design System"
      description="Modern, premium, and reusable SaaS UI component framework built for high-performance Hackathon management environments."
      headerActions={
        <Link to="/dashboard">
          <Button
            variant="primary"
            size="md"
            rightIcon={<FiArrowRight />}
            className="shadow-xl"
          >
            Live Dashboard Demo
          </Button>
        </Link>
      }
    >
      {/* Full Page Spinner Demo */}
      {showFullPageSpinner && (
        <LoadingSpinner fullPage />
      )}

      {/* Tabs Row */}
      <div className="flex border-b border-dark-border/40 mb-8 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-brand-purple text-white bg-slate-900/30'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/10'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* RENDER ACTIVE TAB */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
      >
        {/* COMMON / GENERAL UI COMPONENTS TAB */}
        {activeTab === 'common' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buttons Section */}
            <Card
              title="Button States & Variants"
              subtitle="Interactive Framer Motion triggers utilizing custom gradients."
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary Gradient</Button>
                    <Button variant="secondary">Secondary Dark</Button>
                    <Button variant="outline">Outline Panel</Button>
                    <Button variant="ghost">Ghost link</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Statuses</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="danger">Danger</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="primary" disabled>Disabled State</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" variant="primary">Small (sm)</Button>
                    <Button size="md" variant="primary">Medium (md)</Button>
                    <Button size="lg" variant="primary">Large (lg)</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Loading & Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" isLoading>Processing</Button>
                    <Button variant="outline" leftIcon={<FiPlus size={16} />}>Create Team</Button>
                    <Button variant="secondary" rightIcon={<FiArrowRight size={16} />}>Continue</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges Section */}
            <Card
              title="Badge Status Elements"
              subtitle="Pulsing dot notifications and pill labels."
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Status Labels</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="primary">Active Hackathon</Badge>
                    <Badge variant="success">Submitted</Badge>
                    <Badge variant="warning">Under Review</Badge>
                    <Badge variant="danger">Disqualified</Badge>
                    <Badge variant="info">Teaming Mode</Badge>
                    <Badge variant="neutral">Draft</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Pulsing Dots</h4>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="primary" dot>Pulsing Primary</Badge>
                    <Badge variant="success" dot>Live System</Badge>
                    <Badge variant="danger" dot>Critical Error</Badge>
                    <Badge variant="neutral" dot>Offline</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="primary" size="sm">Small size (sm)</Badge>
                    <Badge variant="primary" size="md">Medium size (md)</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Modals trigger section */}
            <Card
              title="Overlay Modal System"
              subtitle="Responsive overlay cards with focus support and animations."
              className="lg:col-span-2"
            >
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                  Our modal dialog leverages AnimatePresence to trigger fluid physics-based exit animations. It isolates scroll behavior on the document body and captures keybind handlers. Try triggering different configurations:
                </p>
                <div className="flex flex-wrap gap-3.5 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setModalSize('sm');
                      setModalTitle('Delete Repository?');
                      setModalOpen(true);
                    }}
                  >
                    Confirm Dialog (sm)
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalSize('md');
                      setModalTitle('Edit Project Details');
                      setModalOpen(true);
                    }}
                  >
                    Details Form (md)
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      setModalSize('lg');
                      setModalTitle('Hackathon Rules & Guidelines');
                      setModalOpen(true);
                    }}
                  >
                    Information Board (lg)
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setModalSize('xl');
                      setModalTitle('Design Tokens JSON Grid Schema');
                      setModalOpen(true);
                    }}
                  >
                    Large Workspace Data Grid (xl)
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* FORM CONTROLS TAB */}
        {activeTab === 'forms' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input fields */}
            <Card
              title="Text Input States"
              subtitle="Fields with validation errors and responsive inline icons."
            >
              <div className="space-y-5">
                <Input
                  label="Developer Account Name"
                  id="dev-name"
                  placeholder="e.g. trishyanigam"
                  helperText="Your GitHub username or brand name is appropriate."
                />

                <Input
                  label="Password Credential"
                  id="dev-pw"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<FiLock size={16} />}
                />

                <div className="border border-dark-border/40 p-4.5 rounded-lg bg-dark-bg/30 space-y-4">
                  <h4 className="text-xs font-semibold text-slate-300">Validation Error Demo</h4>
                  
                  <Input
                    label="Email Address Address"
                    id="dev-email"
                    type="email"
                    placeholder="name@company.com"
                    leftIcon={<FiMail size={16} />}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    error={inputError}
                    required
                  />

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleVerifyInput}
                  >
                    Validate Input
                  </Button>
                </div>

                <Input
                  label="API Token Header (Disabled)"
                  id="dev-disabled"
                  placeholder="token_hv_92b4501a2..."
                  disabled
                />
              </div>
            </Card>

            {/* Select & Textareas */}
            <Card
              title="Selection & Text Block Controls"
              subtitle="Custom chevrons and resizable multi-line panels."
            >
              <div className="space-y-5">
                <Select
                  label="Choose Hackathon Category"
                  id="hack-category"
                  options={[
                    { value: 'web3', label: 'Web3 & Decentalized Finance (DeFi)' },
                    { value: 'ai', label: 'Generative AI & LLMs' },
                    { value: 'mobile', label: 'Mobile App Hack' },
                    { value: 'iot', label: 'Internet of Things (IoT)' }
                  ]}
                  helperText="Select the primary track for submission guidelines."
                />

                <Select
                  label="Required Team Size"
                  id="team-size"
                  options={[
                    { value: '1', label: 'Solo Hacker (1 member)' },
                    { value: '2', label: 'Pair (2 members)' },
                    { value: '3-4', label: 'Medium Squad (3-4 members)' }
                  ]}
                />

                <Textarea
                  label="Repository Summary / Project Description"
                  id="proj-desc"
                  placeholder="Briefly pitch what you plan to build inside 200 words..."
                  required
                />
              </div>
            </Card>
          </div>
        )}

        {/* FEEDBACK & STATUS TAB */}
        {activeTab === 'feedback' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Spinners */}
              <Card
                title="Loading Spinners"
                subtitle="Spinners for inline loaders or page-load triggers."
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Sizes</h4>
                    <div className="flex items-center gap-6">
                      <LoadingSpinner size="sm" />
                      <LoadingSpinner size="md" />
                      <LoadingSpinner size="lg" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Branding Colors</h4>
                    <div className="flex items-center gap-6">
                      <LoadingSpinner color="purple" size="md" />
                      <LoadingSpinner color="blue" size="md" />
                      <LoadingSpinner color="white" size="md" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-dark-border/40">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FiPlay />}
                      onClick={triggerFullPageLoader}
                    >
                      Trigger Full Page Loader
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Skeleton Loaders */}
              <Card
                title="Skeleton Shimmering"
                subtitle="Mock UI outlines before content resolves."
                className="lg:col-span-2"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <SkeletonLoader variant="circular" width="48px" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader variant="title" width="40%" className="my-0 h-4" />
                      <SkeletonLoader variant="text" width="65%" className="my-0 h-2.5" />
                    </div>
                  </div>

                  <div className="border border-dark-border/30 rounded-lg p-4 space-y-3">
                    <SkeletonLoader variant="title" width="25%" className="h-4 my-1" />
                    <SkeletonLoader variant="text" count={3} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shimmer Cards</h4>
                    <SkeletonLoader variant="rectangular" height="70px" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Empty State */}
            <div className="border border-dark-border/20 rounded-xl p-2 bg-slate-900/10">
              <EmptyState
                title="No Hackathon Submissions Registered"
                description="Your dashboard does not contain any submissions yet. Once you fill out the application details and provide your GitHub link, projects will show here."
                icon={<FiCompass />}
                action={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert('Empty State CTA button clicked!')}
                  >
                    Start First Submission
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* LIVE MODAL RENDER DEMO */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        size={modalSize}
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('Saved successfully!');
                setModalOpen(false);
              }}
            >
              Save Configuration
            </Button>
          </>
        }
      >
        {modalSize === 'sm' ? (
          <div className="space-y-3">
            <p className="text-xs leading-relaxed">
              Are you sure you want to delete this repository? This operation is irreversible, and your submitted source code will be detached from the HackVerse index server.
            </p>
            <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5">
              <FiAlertCircle /> Warning: This will delete associated databases.
            </p>
          </div>
        ) : modalSize === 'md' ? (
          <div className="space-y-4">
            <Input
              label="Repository Name"
              placeholder="e.g. my-cool-project"
            />
            <Select
              label="Integration Pipeline"
              options={[
                { value: 'vercel', label: 'Vercel Platform Cloud Deploy' },
                { value: 'docker', label: 'Custom Docker Container (K8s)' }
              ]}
            />
          </div>
        ) : modalSize === 'lg' ? (
          <div className="space-y-4">
            <div className="flex gap-2.5 items-start p-3 bg-brand-purple/10 border border-brand-purple/20 text-purple-300 rounded-lg text-xs leading-relaxed">
              <FiInfo className="shrink-0 mt-0.5" />
              <span>
                Please confirm you have read the code of conduct. Teams detected sharing codebases across multiple hackathons will be disqualified.
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-white">Guidelines Summary:</h4>
              <ul className="text-xs list-disc pl-4 space-y-1.5 text-slate-400">
                <li>All code must be written during the hacking period.</li>
                <li>API credentials must be kept secure (do not commit to public repositories).</li>
                <li>Final presentations are limited to 3-minute video links.</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-[11px] text-slate-300 bg-slate-950 p-4 rounded-lg overflow-x-auto border border-dark-border">
            {`{
  "project_id": "proj_hackverse_9120",
  "theme_customization": {
    "primary_gradient": "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
    "backdrop_blur_size": "12px",
    "rounded_corners": "xl",
    "professional_minimalist": true
  },
  "deployment_pipeline": {
    "webhooks_enabled": true,
    "automatic_branches": ["main", "master"],
    "alert_notification_emails": ["devs@hackverse.io"]
  }
}`}
          </div>
        )}
      </Modal>
    </PageContainer>
  );
};

export default Showcase;

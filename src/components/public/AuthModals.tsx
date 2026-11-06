import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';
import { Lock, Mail, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'forgot';
  onLoginSuccess: (role: UserRole) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
  onLoginSuccess,
}) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>(initialView);
  const [email, setEmail] = useState('hamza.malik@enterprise.pk');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(selectedRole);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('student');
    onClose();
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setView('login');
    }, 2500);
  };

  const demoRoles = [
    { role: 'student', label: 'Student', email: 'hamza.malik@enterprise.pk' },
    { role: 'super_admin', label: 'Super Admin', email: 'superadmin@aerecon.edu.pk' },
    { role: 'admin', label: 'Admin', email: 'admin@aerecon.edu.pk' },
    { role: 'finance', label: 'Finance Manager', email: 'finance@aerecon.edu.pk' },
    { role: 'academic', label: 'Academic Mgr', email: 'academic@aerecon.edu.pk' },
    { role: 'manager', label: 'Operations Mgr', email: 'ops.manager@aerecon.pk' },
    { role: 'instructor', label: 'Instructor', email: 'tariq.amin@aerecon.edu.pk' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === 'login'
          ? 'Sign In to Aerecon LMS'
          : view === 'register'
          ? 'Create Student Account'
          : 'Reset Password'
      }
      description={
        view === 'login'
          ? 'Access your enrolled lectures, assessment quizzes, and study notes.'
          : view === 'register'
          ? 'Register to access free curriculum previews and track enrollment.'
          : 'Enter your registered email address to receive password reset instructions.'
      }
      maxWidth="md"
    >
      {view === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Quick Demo Persona Shortcuts */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Select Demo Role to Sign In As:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {demoRoles.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(p.role as UserRole);
                    setEmail(p.email);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedRole === p.role
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setView('forgot')}
                className="text-[11px] text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Sign In as {selectedRole.replace('_', ' ').toUpperCase()}
          </button>
        </form>
      )}

      {view === 'forgot' && (
        <form onSubmit={handleForgot} className="space-y-4">
          {resetSent ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password recovery email dispatched with temporary authentication link.</span>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Account Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs text-slate-600 hover:underline"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </Modal>
  );
};

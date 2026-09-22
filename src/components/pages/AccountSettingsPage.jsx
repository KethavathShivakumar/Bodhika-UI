import React, { useState } from 'react';

export default function AccountSettingsPage({ user, onUpdateUser, initialTab = 'profile', onToast }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'profile' | 'password'

  // Profile state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.phone);
  const [countryCode, setCountryCode] = useState(user.countryCode || '+91');
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'O+');
  const [willingToDonate, setWillingToDonate] = useState(user.willingToDonateBlood !== false);
  const [avatar, setAvatar] = useState(user.avatar);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength logic
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-transparent' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-[#ff6551]' };
    if (score === 2 || score === 3) return { score: 2, label: 'Medium', color: 'bg-[#f4ad42]' };
    return { score: 3, label: 'Strong', color: 'bg-[#00c853]' };
  };

  const strength = calculateStrength(newPassword);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone: mobile,
      countryCode,
      bloodGroup,
      willingToDonateBlood: willingToDonate,
      avatar
    });
    if (onToast) {
      onToast({
        title: 'Profile Updated',
        message: 'Your personal information and emergency preferences have been saved.',
        type: 'success'
      });
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      if (onToast) onToast({ title: 'Error', message: 'Please enter your current password.', type: 'error' });
      return;
    }
    if (newPassword.length < 8) {
      if (onToast) onToast({ title: 'Error', message: 'New password must be at least 8 characters long.', type: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      if (onToast) onToast({ title: 'Error', message: 'New passwords do not match.', type: 'error' });
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    if (onToast) {
      onToast({
        title: 'Password Changed',
        message: 'Your account security credentials have been updated successfully.',
        type: 'success'
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* PAGE HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
              <span>Security & Profile Preferences</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              Account Settings
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Manage your personal profile details, academic credentials, and security settings.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-2xl text-amber-300 shadow-md">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER FULLY-COLORED CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a4b56] to-[#1d273e] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-white/15 px-8 pt-6 gap-8 bg-black/20">
          <button
            onClick={() => setActiveTab('profile')}
            className={`relative pb-4 text-sm font-black transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'text-amber-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Edit Profile Details</span>
            {activeTab === 'profile' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-300 rounded-t-full"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`relative pb-4 text-sm font-black transition-colors cursor-pointer ${
              activeTab === 'password' ? 'text-amber-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Change Security Password</span>
            {activeTab === 'password' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-300 rounded-t-full"></div>
            )}
          </button>
        </div>

        {/* Tab 1: Edit Profile */}
        {activeTab === 'profile' && (
          <div className="p-8 space-y-8">
            {/* Student Identity Colored Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#109c90] to-[#0a4b56] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0 border border-white/30">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-black text-lg text-white">{user.name}</h2>
                <div className="text-xs text-white/80 mt-0.5 font-medium">
                  Student ID: <span className="font-mono text-amber-300 font-black">{user.id}</span> • {user.role}
                </div>
                <div className="text-[11px] text-teal-200 font-black mt-0.5">{user.department}</div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Username (Login Handle)</label>
                  <div className="bg-black/30 h-12 rounded-2xl px-4 flex items-center text-xs font-bold text-white/60 border border-white/10">
                    {user.username}
                  </div>
                  <span className="text-[10px] text-white/50 font-medium">Username is non-editable handle.</span>
                </div>

                <div className="hidden md:block"></div>

                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-white/15 backdrop-blur-md h-12 rounded-2xl px-4 text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-white/15 backdrop-blur-md h-12 rounded-2xl px-4 text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                  />
                </div>
              </div>

              <div className="h-px bg-white/15" />

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Email Address *</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 bg-white/15 backdrop-blur-md h-12 rounded-2xl text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Mobile Phone Number *</label>
                  <div className="flex bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 focus-within:ring-2 focus-within:ring-amber-300/40 transition-all">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent pl-3 pr-2 text-xs font-bold text-white outline-none cursor-pointer border-r border-white/20"
                    >
                      <option value="+91" className="bg-slate-900 text-white">IN +91</option>
                      <option value="+1" className="bg-slate-900 text-white">US +1</option>
                      <option value="+44" className="bg-slate-900 text-white">UK +44</option>
                      <option value="+65" className="bg-slate-900 text-white">SG +65</option>
                    </select>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="w-full bg-transparent h-12 px-3 text-xs font-semibold text-white outline-none"
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-white/15 backdrop-blur-md h-12 rounded-2xl px-4 text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 cursor-pointer border border-white/20"
                  >
                    <option value="A+" className="bg-slate-900 text-white">A+</option>
                    <option value="A-" className="bg-slate-900 text-white">A-</option>
                    <option value="B+" className="bg-slate-900 text-white">B+</option>
                    <option value="B-" className="bg-slate-900 text-white">B-</option>
                    <option value="O+" className="bg-slate-900 text-white">O+</option>
                    <option value="O-" className="bg-slate-900 text-white">O-</option>
                    <option value="AB+" className="bg-slate-900 text-white">AB+</option>
                    <option value="AB-" className="bg-slate-900 text-white">AB-</option>
                  </select>
                </div>
              </div>

              {/* Emergency Donor Checkbox */}
              <label className="flex items-start gap-3 p-5 rounded-2xl bg-amber-500/20 border border-amber-300/40 cursor-pointer backdrop-blur-md">
                <input
                  type="checkbox"
                  checked={willingToDonate}
                  onChange={(e) => setWillingToDonate(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded text-[#0a4b56] focus:ring-amber-300"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-black text-amber-300">
                    Emergency Blood Donor Volunteer
                  </span>
                  <span className="text-[11px] text-white/80 font-medium mt-0.5">
                    Permits medical wing emergency dispatchers to reach out during urgent campus patient requirements.
                  </span>
                </div>
              </label>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => {
                    setFirstName(user.firstName);
                    setLastName(user.lastName);
                    setEmail(user.email);
                    setMobile(user.phone);
                    if (onToast) onToast({ title: 'Discarded', message: 'Changes reverted.', type: 'info' });
                  }}
                  className="px-6 py-3 rounded-2xl text-xs font-bold text-white/70 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-2xl bg-white text-[#0a4b56] text-xs font-black hover:bg-teal-50 active:scale-95 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Save Profile Details</span>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Change Password */}
        {activeTab === 'password' && (
          <div className="p-8 space-y-6">
            <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">Current Password *</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password..."
                    className="w-full bg-white/15 backdrop-blur-md h-12 pl-4 pr-12 rounded-2xl text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showCurrent ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">New Password *</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="At least 8 characters..."
                    className="w-full bg-white/15 backdrop-blur-md h-12 pl-4 pr-12 rounded-2xl text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showNew ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Password Strength Gauge */}
                {newPassword && (
                  <div className="pt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-white/70">Security Strength:</span>
                      <span className="text-amber-300">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter new password..."
                    className="w-full bg-white/15 backdrop-blur-md h-12 pl-4 pr-12 rounded-2xl text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-300/40 transition-all border border-white/20 placeholder-white/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirm ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-2xl bg-white text-[#0a4b56] text-xs font-black hover:bg-teal-50 active:scale-95 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Update Password Credentials</span>
                  <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  );
}

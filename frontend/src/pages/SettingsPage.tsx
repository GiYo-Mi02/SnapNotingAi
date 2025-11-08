import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { LogoSection } from '../components/LogoSection'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PaletteIcon from '@mui/icons-material/Palette'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import SaveIcon from '@mui/icons-material/Save'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    enable: true,
    emailSummaries: true,
    quizReminders: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl animate-slideInDown">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div>
            <LogoSection />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white animate-slideInLeft">Settings</h1>
            <p className="text-slate-400 mt-1 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>Manage your preferences and account</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="space-y-8 animate-stagger">
          {/* Profile Settings Section */}
          <section className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-8 shadow-lg hover:border-slate-700 transition duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800/30">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-bounce-soft">
                <PersonIcon sx={{ fontSize: 24, color: 'white' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                <p className="text-sm text-slate-400">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="animate-slideInUp">
                <label className="block text-sm font-medium text-slate-300 mb-3">Full Name</label>
                <input
                  type="text"
                  defaultValue="Kent Joshua Olimberio"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>

              <div className="animate-slideInUp" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-medium text-slate-300 mb-3">Email Address</label>
                <input
                  type="email"
                  defaultValue="kentiojoshuaolmberio@gmail.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                  disabled
                />
                <p className="text-xs text-slate-400 mt-2">Email cannot be changed.</p>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-8 shadow-lg hover:border-slate-700 transition duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800/30">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center animate-bounce-soft">
                <NotificationsIcon sx={{ fontSize: 24, color: '#60a5fa' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
                <p className="text-sm text-slate-400">Manage how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Enable Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 animate-slideInUp transform hover:scale-102">
                <div>
                  <p className="font-medium text-slate-100">Enable Notifications</p>
                  <p className="text-sm text-slate-400">Receive all app notifications</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, enable: !prev.enable }))}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    notifications.enable ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notifications.enable ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Email Summaries */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 animate-slideInUp transform hover:scale-102" style={{ animationDelay: '0.1s' }}>
                <div>
                  <p className="font-medium text-slate-100">Email Summaries</p>
                  <p className="text-sm text-slate-400">Get AI summaries delivered via email</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, emailSummaries: !prev.emailSummaries }))}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    notifications.emailSummaries ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notifications.emailSummaries ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Quiz Reminders */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 animate-slideInUp transform hover:scale-102" style={{ animationDelay: '0.2s' }}>
                <div>
                  <p className="font-medium text-slate-100">Quiz Reminders</p>
                  <p className="text-sm text-slate-400">Remind me to complete quizzes</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, quizReminders: !prev.quizReminders }))}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    notifications.quizReminders ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notifications.quizReminders ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-8 shadow-lg hover:border-slate-700 transition duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800/30">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center animate-pulse-soft">
                <PaletteIcon sx={{ fontSize: 24, color: '#c084fc' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Appearance</h2>
                <p className="text-sm text-slate-400">Customize your interface</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-stagger">
              {/* Light Theme */}
              <button
                onClick={() => setTheme('light')}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-500/10 animate-glow'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <LightModeIcon sx={{ fontSize: 32, color: '#fbbf24', marginBottom: 1 }} />
                <p className="font-semibold text-slate-100 mt-3">Light</p>
                <p className={`text-sm mt-1 ${theme === 'light' ? 'text-blue-400' : 'text-slate-400'}`}>
                  {theme === 'light' ? 'Current theme' : 'Coming soon'}
                </p>
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => setTheme('dark')}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10 animate-glow'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                <DarkModeIcon sx={{ fontSize: 32, color: '#9ca3af', marginBottom: 1 }} />
                <p className="font-semibold text-slate-100 mt-3">Dark</p>
                <p className="text-sm mt-1 text-slate-400">Coming soon</p>
              </button>
            </div>
          </section>

          {/* Security Section */}
          <section className="rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-8 shadow-lg hover:border-slate-700 transition duration-300 hover:shadow-xl hover:shadow-red-500/10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800/30">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center animate-bounce-soft">
                <SecurityIcon sx={{ fontSize: 24, color: '#f87171' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Security</h2>
                <p className="text-sm text-slate-400">Manage your account security</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 animate-slideInUp">
                <p className="font-medium text-slate-100 mb-2">Account Status</p>
                <p className="text-sm text-slate-400 mb-4">Your account is active and secure</p>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium animate-pulse-soft">
                  Active
                </span>
              </div>
            </div>
          </section>

          {/* Save Changes Button */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20 transform hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            <SaveIcon sx={{ fontSize: 20 }} />
            Save Changes
          </button>
        </div>
      </main>
    </div>
  )
}

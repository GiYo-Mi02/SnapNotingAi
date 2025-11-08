import { useTheme } from '../context/ThemeContext'
import { LogoSection } from './LogoSection'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HistoryIconMUI from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HomeIcon from '@mui/icons-material/Home'

interface AppNavbarProps {
  onBack: () => void
  onHome?: () => void
  showThemeToggle?: boolean
}

export function AppNavbar({ onBack, onHome, showThemeToggle = true }: AppNavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 dark:border-slate-800/50 light:border-slate-200/50 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <LogoSection />

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-100 dark:text-slate-100 light:text-slate-700 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/50 transition-colors font-medium text-sm">
              <DashboardIcon sx={{ fontSize: 18 }} />
              Dashboard
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {onHome && (
              <button 
                onClick={onHome}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/50 transition-colors font-medium text-sm"
                title="Go to Home / Landing Page"
              >
                <HomeIcon sx={{ fontSize: 18 }} />
              </button>
            )}
            
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-blue-400 dark:text-blue-400 light:text-blue-600 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/50 transition-colors font-medium text-sm"
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
              Back
            </button>

            {showThemeToggle && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/50 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <LightModeIcon sx={{ fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import QuizIcon from '@mui/icons-material/Quiz'
import EditNoteIcon from '@mui/icons-material/EditNote'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import BoltIcon from '@mui/icons-material/Bolt'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ImageIcon from '@mui/icons-material/Image'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import BrainIcon from '@mui/icons-material/Psychology'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import StarIcon from '@mui/icons-material/Star'

interface LandingPageProps {
  onEnterApp?: () => void
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [openPricing, setOpenPricing] = useState<string | null>(null)

  const handleEnterApp = () => {
    onEnterApp?.()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800 animate-slideInDown">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <img 
              src="/logo.png" 
              alt="SnapNotesAI Logo" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-white">SnapNotesAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-300 hover:text-white transition animate-fadeIn" style={{ animationDelay: '0.2s' }}>Home</a>
            <a href="#features" className="text-slate-300 hover:text-white transition animate-fadeIn" style={{ animationDelay: '0.3s' }}>Features</a>
            <a href="#how" className="text-slate-300 hover:text-white transition animate-fadeIn" style={{ animationDelay: '0.4s' }}>How It Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition animate-fadeIn" style={{ animationDelay: '0.5s' }}>Pricing</a>
            <a href="#about" className="text-slate-300 hover:text-white transition animate-fadeIn" style={{ animationDelay: '0.6s' }}>About</a>
          </div>

          <button 
            onClick={handleEnterApp}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold animate-slideInRight"
          >
            Go to Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full animate-slideInDown">
            <span className="text-blue-400 font-semibold flex items-center gap-2">
              <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              AI-Powered Note Taking
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            Focus on learning —
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-gradientShift">
              SnapNotesAI takes care
            </span>
            <br />
            of your notes
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            AI-powered note-taking for online lectures, meetings, and webinars. Capture, summarize, and learn faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={handleEnterApp}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg hover:scale-105 transform"
            >
              Try SnapNotesAI for Free →
            </button>
            <button 
              onClick={() => {
                document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition font-semibold text-lg hover:scale-105 transform"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center animate-slideInUp">Everything you need to learn smarter</h2>
          <p className="text-xl text-slate-400 text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.1s' }}>Powerful features designed for modern learners.</p>

          <div className="grid md:grid-cols-3 gap-8 animate-stagger">
            {/* Feature 1 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft">
                <CameraAltIcon className="text-blue-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Automatic Screenshot Capture</h3>
              <p className="text-slate-400">
                Never miss a visual moment. Capture slides, diagrams, and key content automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.3s' }}>
                <BrainIcon className="text-purple-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Summarization</h3>
              <p className="text-slate-400">
                Understand faster with intelligent summaries that extract the essence of your content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-orange-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.6s' }}>
                <QuizIcon className="text-orange-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Quiz Generation</h3>
              <p className="text-slate-400">
                Reinforce learning instantly with AI-generated quizzes tailored to your notes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-green-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
                <EditNoteIcon className="text-green-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Manual Text Input</h3>
              <p className="text-slate-400">
                Type or paste notes directly, transcripts, or upload documents for processing.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-cyan-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.4s' }}>
                <FolderSpecialIcon className="text-cyan-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">History & Organization</h3>
              <p className="text-slate-400">
                Keep all your sessions organized and searchable in one central location.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-pink-500 transition hover:scale-105 transform duration-300">
              <div className="w-16 h-16 bg-pink-500/20 rounded-lg flex items-center justify-center mb-6 animate-bounce-soft" style={{ animationDelay: '0.6s' }}>
                <BoltIcon className="text-pink-400" sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-slate-400">
                Get summaries and quizzes in seconds with our optimized AI pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6 animate-fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center animate-slideInUp">How It Works</h2>
          <p className="text-xl text-slate-400 text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.1s' }}>From capture to comprehension in five simple steps.</p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative animate-stagger">
            {/* Steps */}
            {[
              { num: 1, icon: <StarIcon sx={{ fontSize: 32 }} />, label: 'Start Capture', desc: 'Click start to begin' },
              { num: 2, icon: <CameraAltIcon sx={{ fontSize: 32 }} />, label: 'Snapshots Taken', desc: 'Auto-capture frames' },
              { num: 3, icon: <TextFieldsIcon sx={{ fontSize: 32 }} />, label: 'Text Extracted', desc: 'OCR processing' },
              { num: 4, icon: <BrainIcon sx={{ fontSize: 32 }} />, label: 'Summary Generated', desc: 'AI analysis' },
              { num: 5, icon: <CheckCircleIcon sx={{ fontSize: 32 }} />, label: 'Quiz Delivered', desc: 'Ready to test' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 hover:scale-110 transform transition duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 relative z-10 animate-glow" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {step.num}
                </div>
                <div className="w-20 h-20 bg-slate-800/50 border-2 border-slate-700 rounded-lg flex items-center justify-center text-slate-400 mb-4 animate-bounce-soft" style={{ animationDelay: `${idx * 0.15}s` }}>
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-white text-center">{step.label}</h4>
                <p className="text-sm text-slate-400 text-center mt-2">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 animate-gradientShift" style={{ width: '90%', marginLeft: '5%', zIndex: 0 }}></div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center animate-slideInUp">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-400 text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.1s' }}>Choose the plan that fits your learning style.</p>

          <div className="grid md:grid-cols-3 gap-8 animate-stagger">
            {/* Free Plan */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition hover:scale-105 transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-slate-400 mb-6">For getting started</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-400">/month</span>
              </div>
              <button className="w-full py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition mb-8 transform hover:scale-105">
                Get Started
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span> Basic OCR
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span> 5 screenshots/session
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span> Manual summaries
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-500">✓</span> Community support
                </li>
              </ul>
            </div>

            {/* Pro Plan (Most Popular) */}
            <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500 rounded-xl relative transform scale-105 hover:scale-110 transition duration-300 animate-bounce-soft">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full animate-pulse-soft">
                <span className="text-white font-semibold text-sm">MOST POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-4">Pro</h3>
              <p className="text-slate-400 mb-6">For power users</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-slate-400">/month</span>
              </div>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-8 transform hover:scale-105">
                Get Started
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Advanced OCR
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Unlimited screenshots
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> AI summaries
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> AI quizzes
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Priority support
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition hover:scale-105 transform duration-300">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-slate-400 mb-6">For organizations</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <button className="w-full py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition mb-8 transform hover:scale-105">
                Contact Sales
              </button>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Custom integrations
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Dedicated support
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> SLA guarantee
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircleIcon className="text-green-500" sx={{ fontSize: 20 }} /> Team management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16 px-6 bg-slate-950 animate-fadeIn">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8 animate-stagger">
          <div className="animate-slideInUp">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <AutoAwesomeIcon className="text-white" sx={{ fontSize: 16 }} />
              </div>
              <span className="text-lg font-bold text-white">SnapNotesAI</span>
            </div>
            <p className="text-slate-400">AI-powered note-taking for modern learners.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <p>&copy; 2024 SnapNotesAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

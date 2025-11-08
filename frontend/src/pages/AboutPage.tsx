import { LogoSection } from '../components/LogoSection'
import RocketIcon from '@mui/icons-material/Rocket'
import BullseyeIcon from '@mui/icons-material/GpsFixed'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'

export function AboutPage() {
  const values = [
    {
      icon: RocketIcon,
      title: 'Innovation',
      description: 'Pushing the boundaries of AI-powered learning tools',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: BullseyeIcon,
      title: 'Focus',
      description: 'Helping learners concentrate on what truly matters',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FavoriteBorderIcon,
      title: 'Simplicity',
      description: 'Making complex technology feel effortless',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: ElectricBoltIcon,
      title: 'Speed',
      description: 'Delivering insights faster than ever before',
      color: 'from-green-500 to-green-600',
    },
  ]

  const team = [
    {
      name: 'Gio Joshua Gonzales',
      role: 'Full Stack Dev',
      initials: 'GG',
    },
    {
      name: 'Kent Joshua Olimberio',
      role: 'Front End / SEO',
      initials: 'KO',
    },
    {
      name: 'Dominic Casinto',
      role: 'Full Stack Dev',
      initials: 'DC',
    },
    {
      name: 'Rommel Villanueva',
      role: 'Graphic Designer / Documentation',
      initials: 'RV',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl animate-slideInDown">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <LogoSection />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 animate-slideInDown">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium animate-slideInUp">
            About SnapNotesAI
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Built for learners, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradientShift">by learners</span>
          </h1>
          <p className="text-xl text-slate-400 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            SnapNotesAI was created to solve a universal problem: staying focused during learning while capturing everything important. We believe AI should enhance learning, not replace it.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 border-t border-slate-800/50 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <div className="mx-auto max-w-3xl animate-slideInLeft">
          <h2 className="text-4xl font-bold text-white mb-8 animate-slideInUp">Our Vision</h2>
          <p className="text-lg text-slate-300 leading-relaxed animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            To make learning effortless through AI. We envision a world where students, professionals, and lifelong learners can focus entirely on understanding and engaging with content, while intelligent systems handle the tedious work of note-taking, organizing, and reviewing.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 border-t border-slate-800/50 animate-fadeIn">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-4 text-center animate-slideInUp">Our Values</h2>
          <p className="text-lg text-slate-400 text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.1s' }}>What drives us every day</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-8 hover:border-slate-700 transition-all group transform hover:scale-105 duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-bounce-soft`} style={{ animationDelay: `${index * 0.15}s` }}>
                    <Icon sx={{ fontSize: 28, color: 'white' }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 border-t border-slate-800/50 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-4 text-center animate-slideInUp">Our Team</h2>
          <p className="text-lg text-slate-400 text-center mb-16 animate-slideInUp" style={{ animationDelay: '0.1s' }}>The talented people behind SnapNotesAI</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
            {team.map((member, index) => (
              <div key={index} className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-8 text-center hover:border-slate-700 transition-all transform hover:scale-105 duration-300">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-800/50 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6 animate-slideInUp">Ready to transform your learning?</h2>
          <p className="text-slate-400 mb-8 animate-slideInUp" style={{ animationDelay: '0.1s' }}>Join thousands of students and professionals using SnapNotesAI to learn smarter.</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  )
}

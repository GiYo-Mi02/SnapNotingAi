export function LogoSection() {
  return (
    <div className="flex items-center gap-3">
      <img 
        src="/logo.png" 
        alt="SnapNotesAI Logo" 
        className="h-10 w-10 rounded-xl object-cover"
      />
      <div>
        <h1 className="text-xl font-bold text-white dark:text-white light:text-slate-900 transition-colors duration-200">
          SnapNotesAI
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 transition-colors duration-200">
          Smart Note Taking
        </p>
      </div>
    </div>
  )
}

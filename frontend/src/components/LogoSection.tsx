export function LogoSection() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
        <span className="text-lg font-bold text-white">S</span>
      </div>
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

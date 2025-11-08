import { clsx } from 'clsx'
import type { ChangeEvent } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import TimerIcon from '@mui/icons-material/Timer'

interface CaptureControlsProps {
  isActive: boolean
  captureStatus: 'idle' | 'starting' | 'running' | 'stopping' | 'error'
  processing: boolean
  intervalMs: number
  onIntervalChange: (value: number) => void
  onStart: () => Promise<void>
  onStop: () => Promise<void>
  error?: string | null
}

export const CaptureControls = ({
  isActive,
  captureStatus,
  processing,
  intervalMs,
  onIntervalChange,
  onStart,
  onStop,
  error
}: CaptureControlsProps) => {
  const disabled = captureStatus === 'starting' || captureStatus === 'stopping'

  const handleStart = async () => {
    if (disabled) return
    await onStart()
  }

  const handleStop = async () => {
    if (disabled) return
    await onStop()
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6 shadow-lg shadow-slate-950/20 backdrop-blur">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-100">Capture Settings</h3>
          <p className="text-xs text-slate-400 mt-1">Configure your screen capture preferences</p>
        </div>
        
        {/* Interval Control */}
        <div className="flex items-center gap-3 bg-slate-800/30 rounded-lg px-4 py-3">
          <TimerIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Interval:</span>
            <input
              type="range"
              min={5}
              max={120}
              step={5}
              value={Math.round(intervalMs / 1000)}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onIntervalChange(Number(event.target.value) * 1000)
              }
              className="h-1.5 w-32 cursor-pointer appearance-none rounded-full bg-slate-700 accent-blue-500"
            />
            <span className="text-sm font-semibold text-blue-400 w-12 text-right">{Math.round(intervalMs / 1000)}s</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleStart}
          disabled={disabled || isActive}
          className={clsx(
            'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200',
            disabled || isActive
              ? 'cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-400/30 hover:from-blue-500 hover:to-blue-600 active:scale-95'
          )}
        >
          <PlayArrowIcon sx={{ fontSize: 18 }} />
          {captureStatus === 'starting' ? 'Starting…' : 'Start Capture'}
        </button>

        <button
          type="button"
          onClick={handleStop}
          disabled={disabled || (!isActive && captureStatus !== 'running')}
          className={clsx(
            'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200',
            disabled || (!isActive && captureStatus !== 'running')
              ? 'cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-400/30 hover:from-rose-400 hover:to-rose-500 active:scale-95'
          )}
        >
          <StopIcon sx={{ fontSize: 18 }} />
          {captureStatus === 'stopping' ? 'Stopping…' : 'Stop Capture'}
        </button>

        {processing && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-xs font-medium text-amber-200">Processing AI pipeline…</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error !== undefined && error !== null && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100 backdrop-blur">
          <div className="font-medium mb-1">Capture Error</div>
          <div className="text-rose-100/80">{error}</div>
        </div>
      )}
    </div>
  )
}

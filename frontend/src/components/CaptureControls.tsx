import { clsx } from 'clsx'
import type { ChangeEvent } from 'react'

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
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Capture Controls</h2>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          Interval
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={Math.round(intervalMs / 1000)}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onIntervalChange(Number(event.target.value) * 1000)
            }
            className="h-1 w-48 cursor-pointer appearance-none rounded-full bg-slate-700 accent-brand"
          />
          <span className="w-12 text-right text-slate-200">{Math.round(intervalMs / 1000)}s</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleStart}
          disabled={disabled || isActive}
          className={clsx(
            'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition',
            disabled || isActive
              ? 'cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-dark'
          )}
        >
          {captureStatus === 'starting' ? 'Starting…' : 'Start Capture'}
        </button>

        <button
          type="button"
          onClick={handleStop}
          disabled={disabled || (!isActive && captureStatus !== 'running')}
          className={clsx(
            'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition',
            disabled || (!isActive && captureStatus !== 'running')
              ? 'cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600'
          )}
        >
          {captureStatus === 'stopping' ? 'Stopping…' : 'Stop Capture'}
        </button>

        {processing && <span className="text-sm text-amber-300">Processing AI pipeline…</span>}
      </div>

      {error !== undefined && error !== null && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">{error}</p>
      )}
    </div>
  )
}

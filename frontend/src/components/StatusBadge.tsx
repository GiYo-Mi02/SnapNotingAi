import { clsx } from 'clsx'

interface StatusBadgeProps {
  status: 'idle' | 'active' | 'processing' | 'completed' | 'failed'
}

const STATUS_LABELS: Record<StatusBadgeProps['status'], string> = {
  idle: 'Idle',
  active: 'Capturing',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed'
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const color = clsx('px-3 py-1 rounded-full text-sm font-medium', {
    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40': status === 'completed',
    'bg-sky-500/20 text-sky-200 border border-sky-500/40': status === 'active',
    'bg-amber-500/20 text-amber-200 border border-amber-500/40': status === 'processing',
    'bg-rose-500/20 text-rose-200 border border-rose-500/40': status === 'failed',
    'bg-slate-700 text-slate-200 border border-slate-600': status === 'idle'
  })

  return <span className={color}>{STATUS_LABELS[status]}</span>
}

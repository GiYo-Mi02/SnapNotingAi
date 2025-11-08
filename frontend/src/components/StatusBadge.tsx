import { clsx } from 'clsx'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import HourglassTopIcon from '@mui/icons-material/HourglassTop'
import ErrorIcon from '@mui/icons-material/Error'
import CircleIcon from '@mui/icons-material/Circle'

interface StatusBadgeProps {
  status: 'idle' | 'active' | 'processing' | 'completed' | 'failed'
}

const STATUS_CONFIG = {
  idle: {
    label: 'Idle',
    icon: CircleIcon,
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
  },
  active: {
    label: 'Capturing',
    icon: RadioButtonCheckedIcon,
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    dot: 'bg-blue-400 animate-pulse',
  },
  processing: {
    label: 'Processing',
    icon: HourglassTopIcon,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    dot: 'bg-amber-400 animate-pulse',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircleIcon,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
  failed: {
    label: 'Failed',
    icon: ErrorIcon,
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    dot: 'bg-rose-400',
  }
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <div className={clsx(
      'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all',
      config.bg,
      config.border,
      config.text
    )}>
      <Icon sx={{ fontSize: 16 }} />
      <span>{config.label}</span>
    </div>
  )
}

import { useState } from 'react'
import type { Screenshot } from '../types/api'
import ImageIcon from '@mui/icons-material/Image'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ErrorIcon from '@mui/icons-material/Error'

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return 'Unknown time'
    }
    return date.toLocaleTimeString()
  } catch {
    return 'Unknown time'
  }
}

interface ScreenshotGridProps {
  screenshots: Screenshot[]
}

interface ImageState {
  [key: string]: 'loading' | 'loaded' | 'error'
}

export const ScreenshotGrid = ({ screenshots }: ScreenshotGridProps) => {
  const [imageStates, setImageStates] = useState<ImageState>(
    screenshots.reduce((acc, shot) => ({ ...acc, [shot.id]: 'loading' }), {})
  )

  const handleImageLoad = (id: string) => {
    setImageStates(prev => ({ ...prev, [id]: 'loaded' }))
  }

  const handleImageError = (id: string) => {
    setImageStates(prev => ({ ...prev, [id]: 'error' }))
  }

  if (screenshots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700/50 bg-slate-900/20 p-12 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
          <ImageIcon sx={{ fontSize: 24, color: '#94a3b8' }} />
        </div>
        <p className="text-sm text-slate-400 mb-2">No screenshots captured yet</p>
        <p className="text-xs text-slate-500">Start a capture session to see your screenshots here</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {screenshots.map((shot) => {
        const imageState = imageStates[shot.id] || 'loading'
        
        return (
          <figure key={shot.id} className="group overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500/50">
            <div className="relative overflow-hidden bg-slate-800">
              {imageState === 'loading' && (
                <div className="h-48 w-full flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
              )}
              
              {imageState === 'error' && (
                <div className="h-48 w-full flex flex-col items-center justify-center gap-2">
                  <ErrorIcon sx={{ fontSize: 32, color: '#ef4444' }} />
                  <p className="text-xs text-slate-400">Failed to load image</p>
                  <p className="text-xs text-slate-500">Check URL and permissions</p>
                </div>
              )}

              {imageState !== 'error' && (
                <>
                  <img
                    src={shot.image_url}
                    alt={`Screenshot taken at ${formatDate(shot.created_at)}`}
                    className={`h-48 w-full object-cover group-hover:scale-105 transition-all duration-300 ${
                      imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(shot.id)}
                    onError={() => handleImageError(shot.id)}
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </div>
            <figcaption className="border-t border-slate-800/30 bg-gradient-to-b from-slate-900/60 to-slate-950/60 px-4 py-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                {formatDate(shot.created_at)}
              </div>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

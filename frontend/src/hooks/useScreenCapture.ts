import { useCallback, useEffect, useRef, useState } from 'react'

type CaptureStatus = 'idle' | 'starting' | 'running' | 'stopping' | 'error'

interface UseScreenCaptureOptions {
  intervalMs: number
  onCapture: (blob: Blob) => Promise<void>
}

export const useScreenCapture = ({ intervalMs, onCapture }: UseScreenCaptureOptions) => {
  const [status, setStatus] = useState<CaptureStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isCapturingRef = useRef(false)

  const stopStream = useCallback(() => {
    setStatus('stopping')
    isCapturingRef.current = false
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (streamRef.current !== null) {
  streamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current !== null) {
      videoRef.current.srcObject = null
      videoRef.current.remove()
      videoRef.current = null
    }
    setStatus('idle')
  }, [])

  const start = useCallback(async () => {
    if (status === 'running' || status === 'starting') {
      return
    }

    setStatus('starting')
    setError(null)

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 5 },
        audio: false
      })

      streamRef.current = stream
      const video = document.createElement('video')
      videoRef.current = video
      video.srcObject = stream
      video.muted = true
      video.play().catch(() => {
        setError('Unable to play capture stream')
      })

      const captureFrame = async () => {
        if (isCapturingRef.current) {
          return
        }
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          return
        }
        isCapturingRef.current = true
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        if (ctx === null) {
          setError('Unable to capture context')
          return
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        try {
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((result) => resolve(result), 'image/png')
          )
          if (blob !== null) {
            await onCapture(blob)
          }
        } finally {
          isCapturingRef.current = false
        }
      }

      await captureFrame()
      intervalRef.current = window.setInterval(() => {
        void captureFrame()
      }, intervalMs)

      setStatus('running')
    } catch (captureError) {
      setError(captureError instanceof Error ? captureError.message : 'Unknown capture error')
      stopStream()
      setStatus('error')
    }
  }, [intervalMs, onCapture, status, stopStream])

  const stop = useCallback(() => {
    stopStream()
  }, [stopStream])

  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [stopStream])

  return { status, error, start, stop }
}

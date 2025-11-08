import { useState } from 'react'
import { submitManualText, submitAudioTranscript, uploadDocument } from '../lib/api'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import MicIcon from '@mui/icons-material/Mic'
import DescriptionIcon from '@mui/icons-material/Description'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

interface ManualInputPanelProps {
  onSessionCreated: (sessionId: string) => void
  isProcessing: boolean
}

type InputTab = 'text' | 'transcript' | 'document'

export function ManualInputPanel({ onSessionCreated, isProcessing }: ManualInputPanelProps) {
  const [activeTab, setActiveTab] = useState<InputTab>('text')
  const [textContent, setTextContent] = useState('')
  const [transcriptContent, setTranscriptContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitText = async () => {
    if (!textContent.trim()) {
      setError('Please enter some text')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const sessionId = await submitManualText(textContent)
      setTextContent('')
      onSessionCreated(sessionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit text')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitTranscript = async () => {
    if (!transcriptContent.trim()) {
      setError('Please enter a transcript')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const sessionId = await submitAudioTranscript(transcriptContent)
      setTranscriptContent('')
      onSessionCreated(sessionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit transcript')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadDocument = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const sessionId = await uploadDocument(selectedFile)
      setSelectedFile(null)
      onSessionCreated(sessionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload document')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6">
      <h2 className="mb-6 text-xl font-semibold text-slate-100">Manual Input</h2>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-slate-700">
        <button
          onClick={() => {
            setActiveTab('text')
            setError(null)
          }}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'text'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <TextFieldsIcon sx={{ fontSize: 20 }} />
          Text
        </button>
        <button
          onClick={() => {
            setActiveTab('transcript')
            setError(null)
          }}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'transcript'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <MicIcon sx={{ fontSize: 20 }} />
          Transcript
        </button>
        <button
          onClick={() => {
            setActiveTab('document')
            setError(null)
          }}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'document'
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <DescriptionIcon sx={{ fontSize: 20 }} />
          Document
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-rose-500/50 bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      )}

      {/* Text Input Tab */}
      {activeTab === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Enter Your Text
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste your notes, lecture notes, or any text content here..."
              className="h-48 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={loading || isProcessing}
            />
            <p className="mt-2 text-xs text-slate-400">
              {textContent.length} / 1,000,000 characters
            </p>
          </div>
          <button
            onClick={handleSubmitText}
            disabled={loading || isProcessing || !textContent.trim()}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Submit Text'}
          </button>
        </div>
      )}

      {/* Transcript Input Tab */}
      {activeTab === 'transcript' && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Audio Transcript
            </label>
            <textarea
              value={transcriptContent}
              onChange={(e) => setTranscriptContent(e.target.value)}
              placeholder="Paste the transcribed audio from your lecture or recording..."
              className="h-48 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={loading || isProcessing}
            />
            <p className="mt-2 text-xs text-slate-400">
              {transcriptContent.length} / 1,000,000 characters
            </p>
          </div>
          <button
            onClick={handleSubmitTranscript}
            disabled={loading || isProcessing || !transcriptContent.trim()}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Submit Transcript'}
          </button>
        </div>
      )}

      {/* Document Upload Tab */}
      {activeTab === 'document' && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Upload Document
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files?.[0] || null)
                  setError(null)
                }}
                accept=".pdf,.docx,.doc,.txt"
                disabled={loading || isProcessing}
                className="flex-1 text-sm text-slate-400"
              />
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-slate-300">
                Selected: <span className="font-semibold">{selectedFile.name}</span>
              </p>
            )}
            <p className="mt-2 text-xs text-slate-400">
              Supported: PDF, DOCX, DOC, TXT (max 50MB)
            </p>
          </div>
          <button
            onClick={handleUploadDocument}
            disabled={loading || isProcessing || !selectedFile}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      )}

      <div className="mt-6 rounded-lg bg-slate-950 p-4 text-xs text-slate-400">
        <p className="font-semibold text-slate-300 mb-2 flex items-center gap-2">
          <LightbulbIcon sx={{ fontSize: 18 }} />
          How it works:
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Submit your content</li>
          <li>AI generates a comprehensive summary</li>
          <li>Automatic quiz creation (5-8 questions)</li>
          <li>Results saved to your history</li>
        </ul>
      </div>
    </div>
  )
}

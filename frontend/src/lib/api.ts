import axios from 'axios'
import type { Result, Screenshot, Session } from '../types/api'

const client = axios.create({
  baseURL: '/api',
  timeout: 20000
})

export const createSession = async (userId?: string): Promise<Session> => {
  const response = await client.post('/sessions', { userId })
  return response.data.session
}

export const listAllSessions = async (limit = 50, offset = 0): Promise<Array<Session & { summary_preview: string | null }>> => {
  const response = await client.get('/sessions', { params: { limit, offset } })
  return response.data.sessions ?? []
}

export const stopSession = async (sessionId: string): Promise<Session> => {
  const response = await client.post(`/sessions/${sessionId}/stop`)
  return response.data.session
}

export const uploadScreenshot = async (sessionId: string, file: Blob): Promise<Screenshot> => {
  const form = new FormData()
  form.append('image', file, `capture-${Date.now()}.png`)
  const response = await client.post(`/sessions/${sessionId}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.screenshot
}

export const processSession = async (sessionId: string): Promise<void> => {
  await client.post(`/sessions/${sessionId}/process`)
}

export const fetchResults = async (sessionId: string): Promise<Result | null> => {
  try {
    const response = await client.get(`/sessions/${sessionId}/results`)
    return response.data.result ?? null
  } catch (error) {
    // 404 or no results yet is normal - return null to indicate not ready
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    throw error
  }
}

export const fetchScreenshots = async (sessionId: string): Promise<Screenshot[]> => {
  const response = await client.get(`/sessions/${sessionId}/screenshots`)
  return response.data.screenshots ?? []
}

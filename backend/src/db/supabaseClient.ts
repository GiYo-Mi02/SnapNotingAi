import { type SupabaseClient, createClient } from '@supabase/supabase-js'
import { config } from '../utils/env.js'
import logger from '../utils/logger.js'

let client: SupabaseClient | null = null

export const getSupabaseClient = (): SupabaseClient => {
  if (client !== null) {
    return client
  }

  if (config.supabase.url.length === 0 || config.supabase.serviceKey.length === 0) {
    throw new Error('Supabase credentials are not configured. Please fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  client = createClient(config.supabase.url, config.supabase.serviceKey, {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        'x-client-info': 'snapnotesai-backend'
      }
    }
  })

  logger.info({ bucket: config.supabase.bucket }, 'Supabase client initialised')

  return client
}

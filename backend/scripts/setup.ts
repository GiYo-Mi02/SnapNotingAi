import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const setupSupabase = async (): Promise<void> => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
    process.exit(1)
  }

  const client = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  })

  try {
    // Check if bucket exists
    const { data: buckets } = await client.storage.listBuckets()
    const snapshotsBucket = buckets?.find((b) => b.name === 'snapshots')

    if (!snapshotsBucket) {
      console.log('Creating "snapshots" bucket...')
      const { data, error } = await client.storage.createBucket('snapshots', {
        public: true
      })

      if (error) {
        console.error('Failed to create bucket:', error)
        process.exit(1)
      }

      console.log('✓ Bucket "snapshots" created successfully')
    } else {
      console.log('✓ Bucket "snapshots" already exists')
    }

    console.log('\nSetup complete! You can now run `npm run dev`')
  } catch (error) {
    console.error('Setup failed:', error)
    process.exit(1)
  }
}

void setupSupabase()

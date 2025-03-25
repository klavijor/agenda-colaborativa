import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vzwkzwnchjrrimcdepbp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6d2t6d25jaGpycmltY2RlcGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MzYxOTAsImV4cCI6MjA1ODUxMjE5MH0.7a0T08rn1_U1BN_SnDnqWEbYBw1S-G-fjv0i-yt1Jw8'

export const supabase = createClient(supabaseUrl, supabaseKey)

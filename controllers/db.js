const {createClient} = require("@supabase/supabase-js")
require("dotenv").config()

const SupabaseUrl = process.env.DATABASE_URL
const SupabaseKey = process.env.DATABASE_ANON_KEY

if (!SupabaseUrl || !SupabaseKey) {
  console.error("Supabase URL and Key must be set in environment variables");
  process.exit(1);
}

const supabase = createClient(SupabaseUrl, SupabaseKey)

module.exports = supabase
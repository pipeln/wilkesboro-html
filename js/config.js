/** @type {import('@supabase/supabase-js').SupabaseClient} */

// Supabase configuration
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://nahldyqwdqnifyljanxt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5haGxkeXF3ZHFuaWZ5bGphbnh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3OTcwMTQsImV4cCI6MjA1NjM3MzAxNH0.1xXeE1XR1_IIHr6B2B4MtlVnE0f3_8T8r8Q8Q8Q8Q8';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import {createClient} from "https://esm.sh/@supabase/supabase-js@2" 
console.log(createClient);

const supabaseUrl = "https://aeplykziuvcsmkrsmbkm.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcGx5a3ppdXZjc21rcnNtYmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMTcwMzMsImV4cCI6MjA4MjU5MzAzM30.ghcjUh-hux39YzkBhXB2XvzpsJY0x2XlFHP-UHM2314"

const supabase = createClient(supabaseUrl,supabaseKey);
console.log(supabase);


export default supabase;
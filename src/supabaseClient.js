import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tvmeshwzvglxhjgrpqpv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWVzaHd6dmdseGhqZ3JwcXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTg2NjUsImV4cCI6MjAxMzY3NDY2NX0.dWrfgq07zBGCg9EA2h_et90Wk_KQpTMy5v3Fj6AoEPA"
);

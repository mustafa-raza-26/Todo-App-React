import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dkxhhhgdftetalrbvleq.supabase.co";
const supabaseKey = "sb_publishable_4F8l5W1Buurmn-Unh-b_UA_OX6inBYi";
export const client = createClient(
  supabaseUrl,
  supabaseKey
);
import { createClient } from "@supabase/supabase-js";

console.log("ENV: ", process.env);

const supabaseUrl = "https://ofnectvdmnyxxznhaagk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY ?? "";
export const supabase = createClient(supabaseUrl, supabaseKey);

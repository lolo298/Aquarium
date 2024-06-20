import { createClient } from "@supabase/supabase-js";

/*
 * Create a supabase client to store the models in a bucket and a db to store the data
 */

const supabaseUrl = "https://ofnectvdmnyxxznhaagk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY ?? "";
export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jyfeknlbxexwlrrnalxi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZmVrbmxieGV4d2xycm5hbHhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTIxNTY5MiwiZXhwIjoyMDAwNzkxNjkyfQ.PZkMKuS6PAUxpl2_g-c4sETw0OU5hhXdJ6i1gHhFzhY';
export const supabase = createClient(supabaseUrl, supabaseKey);

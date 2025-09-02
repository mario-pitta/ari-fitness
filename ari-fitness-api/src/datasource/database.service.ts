/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: '.env' });

const supabaseUrl = env.parsed?.SUPABASE_URL as string;
const supabaseKey = env.parsed?.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);
@Injectable()
export class DataBaseService {
  supabase: SupabaseClient = supabase;
  constructor() {}
}

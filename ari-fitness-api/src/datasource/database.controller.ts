/* eslint-disable prettier/prettier */
import { Controller, Injectable, Scope } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

const env = dotenv.config({ path: ".env" });

if (!env) {
	throw new Error("No environment variables loaded");
}

const supabaseUrl = env.parsed?.SUPABASE_URL as string;
const supabaseKey = env.parsed?.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

@Controller({
	scope: Scope.DEFAULT,

})
export class DataBaseController {
	supabase: SupabaseClient = supabase;

	constructor() {}
}

//@ts-nocheck
const getEnvValue = (key: string) => {
    return Deno.env.get(key)
}

export const TRIAL_PERIOD_DAYS = parseInt(getEnvValue('TRIAL_PERIOD_DAYS'));

export let ENVIRONMENT = getEnvValue('ENVIRONMENT');
export let DOMAIN_URL = getEnvValue('DOMAIN_URL');

export let GOOGLE_ANALYTICS_KEY = getEnvValue('GOOGLE_ANALYTICS_KEY');
export let GOOGLE_ANALYTICS_CODE = getEnvValue('GOOGLE_ANALYTICS_CODE');

export const SUPABASE_SERVICE_API_KEY = getEnvValue('SERVICE_ROLE_KEY');
export const SUPABASE_ANON_API_KEY = getEnvValue('ANON_KEY');

export const STABILITY_AI_KEY = getEnvValue('STABILITY_AI_KEY')

// SUPABASE_URL is set automatically on supabase server
// PROJECT_URL comes from .env.local - other env files dont have this secret set and depend on SUPABASE_URL
export const SUPABASE_PROJECT_URL = getEnvValue('SUPABASE_URL');
export const OPENAI_API_KEY = getEnvValue('OPENAI_API_KEY');
export const STRIPE_WEBHOOK_SIGNING_SECRET = getEnvValue('STRIPE_WEBHOOK_SIGNING_SECRET');
export const STRIPE_API_KEY = getEnvValue('STRIPE_API_KEY');
export const STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID = getEnvValue('STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID');
export const GOOGLE_TRANSLATE_API_KEY = getEnvValue('GOOGLE_TRANSLATE_API_KEY');

// console.log('ENVIRONMENT',ENVIRONMENT);
// console.log('SUPABASE_SERVICE_API_KEY',SUPABASE_SERVICE_API_KEY);
// console.log('SUPABASE_PROJECT_URL',SUPABASE_PROJECT_URL);
// console.log('SUPABASE_ANON_API_KEY',SUPABASE_ANON_API_KEY);
// console.log('OPENAI_API_KEY',OPENAI_API_KEY);
// console.log('STRIPE_WEBHOOK_SIGNING_SECRET',STRIPE_WEBHOOK_SIGNING_SECRET);
// console.log('STRIPE_API_KEY',STRIPE_API_KEY);

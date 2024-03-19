# Supabase
Jedná se o tzv Edge funkce

### Supabase App functions
https://app.supabase.com/project/rmdoykastkqddnomdtcj/functions

## Lokální vývoj
Edge funkci ze složky `/supabase/functions/app`
spustime pro lokální vývoj následovně
```
supabase start
```
```
supabase functions serve app
```

## Deployment
Supabase project ID: `rmdoykastkqddnomdtcj`
```
supabase functions deploy app --project-ref rmdoykastkqddnomdtcj
```
In case if deployment of paymentReceived, we cant allow JWT, so use deploy with flag `--no-verify-jwt`
```
supabase functions deploy app --project-ref rmdoykastkqddnomdtcj --no-verify-jwt
```

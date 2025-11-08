import 'dotenv/config';
const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
export const config = {
    port: toNumber(process.env.PORT, 4000),
    supabase: {
        url: process.env.SUPABASE_URL ?? '',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
        bucket: process.env.SUPABASE_STORAGE_BUCKET ?? 'snapshots'
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY ?? '',
        summaryModel: process.env.SUMMARY_MODEL ?? 'gpt-4o-mini',
        quizModel: process.env.QUIZ_MODEL ?? 'gpt-4o-mini'
    },
    storage: {
        localDir: process.env.SCREENSHOT_STORAGE_DIR ?? './uploads'
    },
    capture: {
        intervalSeconds: toNumber(process.env.CAPTURE_INTERVAL_SECONDS, 30)
    }
};
export const validateEnv = () => {
    const requiredKeys = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'OPENAI_API_KEY'];
    const missing = requiredKeys.filter((key) => (process.env[key] ?? '').length === 0);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

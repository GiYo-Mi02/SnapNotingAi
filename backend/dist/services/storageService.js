import fs from 'node:fs/promises';
import path from 'node:path';
import { getSupabaseClient } from '../db/supabaseClient.js';
import logger from '../utils/logger.js';
import { config } from '../utils/env.js';
export const persistScreenshot = async (params) => {
    const { sessionId, localFilePath, originalName } = params;
    const client = getSupabaseClient();
    const fileBuffer = await fs.readFile(localFilePath);
    const extension = path.extname(originalName) || '.png';
    const storagePath = `${sessionId}/${path.basename(localFilePath)}`;
    const { data: uploadData, error: uploadError } = await client.storage
        .from(config.supabase.bucket)
        .upload(storagePath, fileBuffer, {
        upsert: true,
        contentType: extension === '.png' ? 'image/png' : 'image/jpeg'
    });
    if (uploadError !== null) {
        logger.error(uploadError, 'Failed to upload screenshot to Supabase storage');
        throw uploadError;
    }
    const { data: publicUrlData } = client.storage
        .from(config.supabase.bucket)
        .getPublicUrl(storagePath);
    const { data: insertData, error: insertError } = await client
        .from('screenshots')
        .insert({
        session_id: sessionId,
        image_url: publicUrlData?.publicUrl ?? uploadData?.path ?? storagePath
    })
        .select()
        .single();
    if (insertError !== null) {
        logger.error(insertError, 'Failed to insert screenshot metadata');
        throw insertError;
    }
    // Keep local file for OCR processing - clean up later after pipeline completes
    logger.debug({ localFilePath, sessionId }, 'Screenshot stored locally for OCR');
    return {
        id: insertData.id,
        sessionId,
        storagePath,
        publicUrl: publicUrlData?.publicUrl ?? undefined
    };
};

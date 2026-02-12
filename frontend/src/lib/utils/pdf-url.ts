import { supabase } from '../config/supabase';

const BUCKET_NAME = 'research-files';

/**
 * Generates the public URL for a research PDF file
 */
export function getResearchPdfUrl(researchId: string): string {
  const fileName = `${researchId}.pdf`;
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);
  
  return data.publicUrl;
}
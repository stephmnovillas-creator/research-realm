import { supabase } from '../config/supabase';

const BUCKET_NAME = 'research-files';

export interface FileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Uploads a file to Supabase storage using the research ID as filename
 */
export async function uploadResearchFile(
  file: File,
  researchId: string,
): Promise<FileUploadResult> {
  try {
    // Generate filename with research ID and .pdf extension
    const fileName = `${researchId}.pdf`;

    // Upload file to Supabase storage
    const {error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true, // Replaces if file exists
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Deletes a research file from Supabase storage
 */
export async function deleteResearchFile(
  researchId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const fileName = `${researchId}.pdf`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
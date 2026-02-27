import { getStoredToken } from "../auth/auth.storage";
import { BACKEND_URL } from "../config/constants";

export interface FileUploadResult {
  success: boolean;
  error?: string;
}

/**
 * Uploads a research PDF to backend local storage.
 */
export async function uploadResearchFile(
  file: File,
  archiveId: number,
): Promise<FileUploadResult> {
  try {
    const token = getStoredToken();
    const response = await fetch(`${BACKEND_URL}/archives/${archiveId}/file`, {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: file,
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => "Unknown error");
      let parsedMessage = rawError;

      try {
        const parsed = JSON.parse(rawError) as {
          error?: unknown;
          message?: unknown;
        };

        if (typeof parsed.error === "string") {
          parsedMessage = parsed.error;
        } else if (typeof parsed.message === "string") {
          parsedMessage = parsed.message;
        }
      } catch {
        // Keep raw text when response is not JSON.
      }

      return {
        success: false,
        error: `API Error (${response.status}): ${parsedMessage}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("File upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Deletes a research file from backend local storage by deleting the archive.
 */
export async function deleteResearchFile(
  archiveId: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getStoredToken();
    const response = await fetch(`${BACKEND_URL}/archives/${archiveId}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => "Unknown error");
      return {
        success: false,
        error: rawError || "Failed to delete file",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

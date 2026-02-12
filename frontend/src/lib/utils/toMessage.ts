export function toMessage(error: unknown, fallback = ""): string {
	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object" && "message" in error) {
		const message = (error as { message?: unknown }).message;
		if (typeof message === "string") {
			return message;
		}
	}

	return fallback;
}

export function toOptionalMessage(error: unknown): string | null {
	const message = toMessage(error);
	return message ? message : null;
}

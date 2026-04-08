export interface ContactPayload {
    readonly name: string;
    readonly email: string;
    readonly company?: string;
    readonly phone?: string;
    readonly service: string;
    readonly message: string;
    readonly captchaToken: string;
}

/**
 * Validates and sanitizes an unknown request body into a ContactPayload.
 * Returns null if the payload is not a valid object.
 */
export function parseContactPayload(body: unknown): ContactPayload | null {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return null;
    }

    const record = body as Record<string, unknown>;

    const name = typeof record.name === "string" ? record.name.trim() : "";
    const email = typeof record.email === "string" ? record.email.trim() : "";
    const company = typeof record.company === "string" ? record.company.trim() : "";
    const phone = typeof record.phone === "string" ? record.phone.trim() : "";
    const service = typeof record.service === "string" ? record.service.trim() : "";
    const message = typeof record.message === "string" ? record.message.trim() : "";
    const captchaToken = typeof record.captchaToken === "string" ? record.captchaToken.trim() : "";

    return {
        name,
        email,
        company,
        phone,
        service,
        message,
        captchaToken,
    };
}

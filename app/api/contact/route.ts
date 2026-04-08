import { Resend } from "resend";

import { EMAIL_ADDRESS, MESSAGE_MAX_LENGTH } from "@/constants/config";
import { parseContactPayload } from "@/types/contact";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 200;
const MAX_PHONE_LENGTH = 30;
const MAX_SERVICE_LENGTH = 100;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const ALLOWED_SERVICES = [
    "offerte",
    "algemene-vraag",
    "planning",
    "samenwerking",
    "anders",
] as const;

function isValidEmail(value: string): boolean {
    return EMAIL_REGEX.test(value);
}

function sanitizeControlCharacters(value: string): string {
    return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (!forwardedFor) {
        return "";
    }

    const [clientIp = ""] = forwardedFor.split(",");

    return clientIp.trim();
}

async function verifyTurnstileToken(
    secretKey: string,
    token: string,
    ip: string,
): Promise<boolean> {
    const requestBody = new URLSearchParams({
        response: token,
        secret: secretKey,
    });

    if (ip) {
        requestBody.set("remoteip", ip);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
        body: requestBody,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    });

    if (!response.ok) {
        return false;
    }

    const result: unknown = await response.json();

    if (typeof result !== "object" || result === null || Array.isArray(result)) {
        return false;
    }

    const record = result as Record<string, unknown>;

    return record.success === true;
}

export async function POST(request: Request): Promise<Response> {
    const resendApiKey = process.env.RESEND_API_KEY;
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecretKey) {
        return Response.json(
            { error: "Missing CAPTCHA configuration: TURNSTILE_SECRET_KEY" },
            { status: 500 },
        );
    }

    if (!resendApiKey) {
        return Response.json(
            { error: "Missing email configuration: RESEND_API_KEY" },
            { status: 500 },
        );
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: "Ongeldig verzoek." },
            { status: 400 },
        );
    }

    const payload = parseContactPayload(body);

    if (!payload) {
        return Response.json(
            { error: "Ongeldig verzoek." },
            { status: 400 },
        );
    }

    if (
        !payload.name ||
        !payload.email ||
        !payload.captchaToken ||
        !payload.service ||
        !payload.message
    ) {
        return Response.json(
            { error: "Naam, e-mail, type vraag, bericht en CAPTCHA zijn verplicht." },
            { status: 400 },
        );
    }

    if (!isValidEmail(payload.email)) {
        return Response.json(
            { error: "Geef een geldig e-mailadres op." },
            { status: 400 },
        );
    }

    if (!ALLOWED_SERVICES.includes(payload.service as typeof ALLOWED_SERVICES[number])) {
        return Response.json(
            { error: "Ongeldige dienst geselecteerd." },
            { status: 400 },
        );
    }

    if (
        sanitizeControlCharacters(payload.name).length > MAX_NAME_LENGTH ||
        sanitizeControlCharacters(payload.email).length > MAX_EMAIL_LENGTH ||
        (payload.company && sanitizeControlCharacters(payload.company).length > MAX_COMPANY_LENGTH) ||
        (payload.phone && sanitizeControlCharacters(payload.phone).length > MAX_PHONE_LENGTH) ||
        sanitizeControlCharacters(payload.service).length > MAX_SERVICE_LENGTH ||
        sanitizeControlCharacters(payload.message).length > MESSAGE_MAX_LENGTH
    ) {
        return Response.json(
            { error: "Een of meer velden overschrijden de maximale lengte." },
            { status: 400 },
        );
    }

    const safeName = sanitizeControlCharacters(payload.name);
    const safeEmail = sanitizeControlCharacters(payload.email);
    const safeCompany = sanitizeControlCharacters(payload.company ?? "");
    const safePhone = sanitizeControlCharacters(payload.phone ?? "");
    const safeService = sanitizeControlCharacters(payload.service);
    const safeMessage = sanitizeControlCharacters(payload.message);
    const safeCaptchaToken = sanitizeControlCharacters(payload.captchaToken);

    const isCaptchaValid = await verifyTurnstileToken(
        turnstileSecretKey,
        safeCaptchaToken,
        getClientIp(request),
    );

    if (!isCaptchaValid) {
        return Response.json(
            { error: "CAPTCHA validatie mislukt." },
            { status: 400 },
        );
    }

    const resend = new Resend(resendApiKey);

    try {
        await resend.emails.send({
            from: `Tree Top Tom <${process.env.RESEND_FROM_EMAIL ?? "info@treetoptom.be"}>`,
            to: [process.env.CONTACT_TO_EMAIL ?? EMAIL_ADDRESS],
            replyTo: safeEmail,
            subject: `Nieuw contactformulier: ${safeService}`,
            html: `
              <h2>Nieuw contactformulier</h2>
              <p><strong>Naam:</strong> ${escapeHtml(safeName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
              <p><strong>Bedrijf:</strong> ${escapeHtml(safeCompany || "-")}</p>
              <p><strong>Telefoon:</strong> ${escapeHtml(safePhone || "-")}</p>
              <p><strong>Type vraag:</strong> ${escapeHtml(safeService)}</p>
              <p><strong>Bericht:</strong></p>
              <p>${escapeHtml(safeMessage)}</p>
            `,
            text: [
                `Naam: ${safeName}`,
                `Email: ${safeEmail}`,
                `Bedrijf: ${safeCompany || "-"}`,
                `Telefoon: ${safePhone || "-"}`,
                `Type vraag: ${safeService}`,
                "",
                "Bericht:",
                safeMessage,
            ].join("\n"),
        });
    } catch {
        return Response.json(
            { error: "Er ging iets mis bij het verzenden van de e-mail." },
            { status: 500 },
        );
    }

    return Response.json({ success: true }, { status: 200 });
}

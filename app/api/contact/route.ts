import { Resend } from "resend";

import { EMAIL_ADDRESS } from "@/constants/config";
import { MESSAGE_MAX_LENGTH } from "@/constants/config";
import { parseContactPayload } from "@/types/contact";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_SERVICE_LENGTH = 100;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function sanitize(value: string): string {
    return value.replace(/[\r\n]/g, " ");
}

export async function POST(request: Request): Promise<Response> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
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
        !payload.service ||
        !payload.message
    ) {
        return Response.json(
            { error: "Naam, email, type vraag en bericht zijn verplicht." },
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
        payload.name.length > MAX_NAME_LENGTH ||
        payload.email.length > MAX_EMAIL_LENGTH ||
        (payload.phone && payload.phone.length > MAX_PHONE_LENGTH) ||
        payload.service.length > MAX_SERVICE_LENGTH ||
        payload.message.length > MESSAGE_MAX_LENGTH
    ) {
        return Response.json(
            { error: "Een of meer velden overschrijden de maximale lengte." },
            { status: 400 },
        );
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: `Tree Top Tom <${process.env.RESEND_FROM_EMAIL ?? "info@treetoptom.be"}>`,
            to: [process.env.CONTACT_TO_EMAIL ?? EMAIL_ADDRESS],
            replyTo: sanitize(payload.email),
            subject: `Nieuw contactformulier: ${sanitize(payload.service)}`,
            text: [
                `Naam: ${sanitize(payload.name)}`,
                `Email: ${sanitize(payload.email)}`,
                `Telefoon: ${payload.phone ? sanitize(payload.phone) : "-"}`,
                `Type vraag: ${sanitize(payload.service)}`,
                "",
                "Bericht:",
                sanitize(payload.message),
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

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { MESSAGE_MAX_LENGTH } from "@/constants/config";
import { parseContactPayload } from "@/types/contact";

const REQUIRED_ENV_KEYS = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_TO_EMAIL",
] as const;

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_SERVICE_LENGTH = 100;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
    return EMAIL_REGEX.test(value);
}

function getMissingEnvVars(): string[] {
    return REQUIRED_ENV_KEYS.filter((key: string) => !process.env[key]);
}

/**
 * Strips characters that could be used for email header injection.
 */
function sanitize(value: string): string {
    return value.replace(/[\r\n]/g, " ");
}

export async function POST(request: Request): Promise<NextResponse> {
    const missingEnvVars: string[] = getMissingEnvVars();

    if (missingEnvVars.length > 0) {
        return NextResponse.json(
            { error: `Missing email configuration: ${missingEnvVars.join(", ")}` },
            { status: 500 },
        );
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Ongeldig verzoek." },
            { status: 400 },
        );
    }

    const payload = parseContactPayload(body);

    if (!payload) {
        return NextResponse.json(
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
        return NextResponse.json(
            { error: "Naam, email, type vraag en bericht zijn verplicht." },
            { status: 400 },
        );
    }

    if (!isValidEmail(payload.email)) {
        return NextResponse.json(
            { error: "Geef een geldig e-mailadres op." },
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
        return NextResponse.json(
            { error: "Een of meer velden overschrijden de maximale lengte." },
            { status: 400 },
        );
    }

    const smtpPort: number = Number(process.env.SMTP_PORT);
    const smtpSecure: boolean = process.env.SMTP_SECURE === "true";

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
            to: process.env.CONTACT_TO_EMAIL,
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
        return NextResponse.json(
            { error: "Er ging iets mis bij het verzenden van de e-mail." },
            { status: 500 },
        );
    }

    return NextResponse.json({ success: true }, { status: 200 });
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getMissingEnvVars(): string[] {
  const requiredKeys = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_SECURE",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_TO_EMAIL",
  ] as const;

  return requiredKeys.filter((key) => !process.env[key]);
}

export async function POST(request: Request) {
  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    return NextResponse.json(
      { error: `Missing email configuration: ${missingEnvVars.join(", ")}` },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as ContactPayload;
  const normalizedPayload: ContactPayload = {
    name: payload.name?.trim() ?? "",
    email: payload.email?.trim() ?? "",
    phone: payload.phone?.trim() ?? "",
    service: payload.service?.trim() ?? "",
    message: payload.message?.trim() ?? "",
  };

  if (
    !normalizedPayload.name ||
    !normalizedPayload.email ||
    !normalizedPayload.service ||
    !normalizedPayload.message
  ) {
    return NextResponse.json(
      { error: "Naam, email, type vraag en bericht zijn verplicht." },
      { status: 400 },
    );
  }

  if (!isValidEmail(normalizedPayload.email)) {
    return NextResponse.json(
      { error: "Geef een geldig e-mailadres op." },
      { status: 400 },
    );
  }

  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpSecure = process.env.SMTP_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: normalizedPayload.email,
    subject: `Nieuw contactformulier: ${normalizedPayload.service}`,
    text: [
      `Naam: ${normalizedPayload.name}`,
      `Email: ${normalizedPayload.email}`,
      `Telefoon: ${normalizedPayload.phone || "-"}`,
      `Type vraag: ${normalizedPayload.service}`,
      "",
      "Bericht:",
      normalizedPayload.message,
    ].join("\n"),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}

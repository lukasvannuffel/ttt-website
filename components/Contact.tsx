"use client";

import { useState } from "react";

import { MESSAGE_MAX_LENGTH, PHONE_NUMBER, SUBMIT_SUCCESS_TIMEOUT_MS } from "@/constants/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Form field identifiers
const FIELD_NAME = "name" as const;
const FIELD_EMAIL = "email" as const;
const FIELD_PHONE = "phone" as const;
const FIELD_SERVICE = "service" as const;
const FIELD_MESSAGE = "message" as const;

type FormField = typeof FIELD_NAME | typeof FIELD_EMAIL | typeof FIELD_PHONE | typeof FIELD_SERVICE | typeof FIELD_MESSAGE;

interface FormData {
    [FIELD_NAME]: string;
    [FIELD_EMAIL]: string;
    [FIELD_PHONE]: string;
    [FIELD_SERVICE]: string;
    [FIELD_MESSAGE]: string;
}

const INITIAL_FORM_DATA: FormData = {
    [FIELD_NAME]: "",
    [FIELD_EMAIL]: "",
    [FIELD_PHONE]: "",
    [FIELD_SERVICE]: "",
    [FIELD_MESSAGE]: "",
};

const INPUT_CLASSES = "w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] placeholder-[rgba(75,85,99,0.5)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300";

export function Contact() {
    const contactRef = useScrollReveal<HTMLElement>(0.2);

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name as FormField]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitError("");
        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Er liep iets mis bij het verzenden.");
            }

            setSubmitted(true);
            setFormData(INITIAL_FORM_DATA);

            setTimeout(() => setSubmitted(false), SUBMIT_SUCCESS_TIMEOUT_MS);
        } catch {
            setSubmitError("Verzenden mislukt. Probeer opnieuw of mail ons rechtstreeks.");
        } finally {
            setLoading(false);
        }
    }

    const messageLength = formData[FIELD_MESSAGE].length;

    return (
        <section
            ref={contactRef}
            id="contact"
            className="opacity-0 relative min-h-screen flex items-center px-6 py-20 md:px-10 md:py-24 lg:px-16 bg-gradient-to-b from-[var(--surface)] via-[var(--surface)] to-[rgba(27,67,50,0.05)] overflow-hidden"
        >
            {/* Background accents */}
            <div
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-[0.08] blur-3xl pointer-events-none"
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[var(--accent-secondary)] to-transparent opacity-[0.06] blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <div className="mx-auto max-w-4xl w-full relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-warm)] to-[var(--accent-gold)] opacity-80" aria-hidden="true" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                            Neem contact op
                        </p>
                    </div>
                    <h2 className="mb-4 font-serif text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
                        Klaar voor professioneel boomwerk?
                    </h2>
                    <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                        Vul het formulier in en ik neem zo snel mogelijk contact met je op.
                        Vragen?{" "}
                        <br />
                        Bel ons direct op{" "}
                        <a href={`tel:${PHONE_NUMBER}`} className="font-medium text-[var(--accent-primary)] hover:underline">
                            {PHONE_NUMBER}
                        </a>.
                    </p>
                </div>

                {/* Form container */}
                <div className="relative">
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(184,149,106,0.08)] to-[rgba(74,124,89,0.06)] rounded-2xl blur-xl" aria-hidden="true" />

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        aria-label="Contactformulier"
                        className="relative bg-white/70 backdrop-blur-sm border border-[rgba(184,149,106,0.2)] rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Name */}
                            <div className="form-group">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide"
                                >
                                    Naam
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name={FIELD_NAME}
                                    value={formData[FIELD_NAME]}
                                    onChange={handleChange}
                                    placeholder="Jouw naam"
                                    required
                                    autoComplete="name"
                                    className={INPUT_CLASSES}
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name={FIELD_EMAIL}
                                    value={formData[FIELD_EMAIL]}
                                    onChange={handleChange}
                                    placeholder="jouw@email.com"
                                    required
                                    autoComplete="email"
                                    className={INPUT_CLASSES}
                                />
                            </div>

                            {/* Phone */}
                            <div className="form-group">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide"
                                >
                                    Telefoonnummer
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name={FIELD_PHONE}
                                    value={formData[FIELD_PHONE]}
                                    onChange={handleChange}
                                    placeholder="+32 (0)X XXX XX XX"
                                    autoComplete="tel"
                                    className={INPUT_CLASSES}
                                />
                            </div>

                            {/* Service */}
                            <div className="form-group">
                                <label
                                    htmlFor="service"
                                    className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide"
                                >
                                    Type vraag
                                </label>
                                <select
                                    id="service"
                                    name={FIELD_SERVICE}
                                    value={formData[FIELD_SERVICE]}
                                    onChange={handleChange}
                                    required
                                    className={`${INPUT_CLASSES} cursor-pointer`}
                                >
                                    <option value="">Selecteer een optie...</option>
                                    <option value="offerte">Offerte opmaken</option>
                                    <option value="algemene-vraag">Algemene vraag</option>
                                    <option value="planning">Afspraak / Planning</option>
                                    <option value="samenwerking">Samenwerking</option>
                                    <option value="anders">Anders</option>
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="form-group mb-6">
                            <div className="flex justify-between items-baseline mb-3">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold text-[var(--text-primary)] tracking-wide"
                                >
                                    Bericht
                                </label>
                                <span
                                    className="text-xs text-[var(--text-tertiary)]"
                                    aria-live="polite"
                                    aria-label={`${messageLength} van ${MESSAGE_MAX_LENGTH} tekens gebruikt`}
                                >
                                    {messageLength}/{MESSAGE_MAX_LENGTH}
                                </span>
                            </div>
                            <textarea
                                id="message"
                                name={FIELD_MESSAGE}
                                value={formData[FIELD_MESSAGE]}
                                onChange={handleChange}
                                placeholder="Vertel ons meer over jouw project..."
                                maxLength={MESSAGE_MAX_LENGTH}
                                rows={5}
                                className={`${INPUT_CLASSES} resize-none`}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || submitted}
                            aria-busy={loading}
                            className="w-full md:w-auto btn btn-primary glow-on-hover disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                                    Versturen...
                                </span>
                            ) : submitted ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Verzonden!
                                </span>
                            ) : (
                                "Bericht versturen"
                            )}
                        </button>

                        {/* Status messages */}
                        {submitted && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="mt-6 p-4 bg-[rgba(74,124,89,0.1)] border border-[var(--accent-tertiary)] rounded-lg text-[var(--accent-primary)] text-sm"
                            >
                                Bedankt! Ik neem snel contact met je op.
                            </div>
                        )}
                        {submitError && (
                            <div
                                role="alert"
                                aria-live="assertive"
                                className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700"
                            >
                                {submitError}
                            </div>
                        )}
                    </form>
                </div>

                {/* Trust elements */}
                <div className="mt-12 grid w-full grid-cols-3 gap-4 text-center md:gap-6">
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold text-[var(--accent-gold)]">24h</p>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mt-1">Antwoord</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold text-[var(--accent-gold)]">100%</p>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mt-1">Verzekerd</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold text-[var(--accent-gold)]">9/10</p>
                        <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mt-1">Rating</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

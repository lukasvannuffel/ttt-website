"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Contact() {
  const contactRef = useScrollReveal<HTMLElement>(0.2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Er liep iets mis bij het verzenden.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSubmitError("Verzenden mislukt. Probeer opnieuw of mail ons rechtstreeks.");
    } finally {
      setLoading(false);
    }
  };

  const messageLength = formData.message.length;
  const maxLength = 500;

  return (
    <section
      ref={contactRef}
      id="contact"
      className="opacity-0 relative min-h-screen flex items-center px-6 py-20 md:px-10 md:py-24 lg:px-16 bg-gradient-to-b from-[var(--surface)] via-[var(--surface)] to-[rgba(27,67,50,0.05)] overflow-hidden"
    >
      {/* Organic background accents */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[var(--accent-secondary)] to-transparent opacity-6 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-warm)] to-[var(--accent-gold)] opacity-80" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
              Neem contact op
            </p>
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
            Klaar voor professioneel boomwerk?
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Vul het formulier in en ik neem zo snel mogelijk contact met je op.
            Vragen? <br/> Bel ons direct op +32 479 92 74 26.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Decorative gradient background card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(184,149,106,0.08)] to-[rgba(74,124,89,0.06)] rounded-2xl blur-xl" />

          {/* Actual form card */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/70 backdrop-blur-sm border border-[rgba(184,149,106,0.2)] rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500"
          >
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jouw naam"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] placeholder-[rgba(75,85,99,0.5)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jouw@email.com"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] placeholder-[rgba(75,85,99,0.5)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300"
                />
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone" className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+32 (0)X XXX XX XX"
                  className="w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] placeholder-[rgba(75,85,99,0.5)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300"
                />
              </div>

              {/* Service Select */}
              <div className="form-group">
                <label htmlFor="service" className="block text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide">
                  Type vraag
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300 cursor-pointer"
                  required
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

            {/* Message Field - Full Width */}
            <div className="form-group mb-6">
              <div className="flex justify-between items-baseline mb-3">
                <label htmlFor="message" className="block text-sm font-semibold text-[var(--text-primary)] tracking-wide">
                  Bericht
                </label>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {messageLength}/{maxLength}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Vertel ons meer over jouw project..."
                maxLength={maxLength}
                rows={5}
                className="w-full px-4 py-3 bg-white border-2 border-[rgba(184,149,106,0.3)] rounded-lg text-[var(--text-primary)] placeholder-[rgba(75,85,99,0.5)] focus:outline-none focus:border-[var(--accent-gold)] focus:shadow-lg focus:shadow-[rgba(184,149,106,0.2)] transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full md:w-auto btn btn-primary glow-on-hover disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Versturen...
                </span>
              ) : submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verzonden!
                </span>
              ) : (
                "Bericht versturen"
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <div className="mt-6 p-4 bg-[rgba(74,124,89,0.1)] border border-[var(--accent-tertiary)] rounded-lg text-[var(--accent-primary)] text-sm">
                ✓ Bedankt! Ik neem snel contact met je op.
              </div>
            )}
            {submitError && (
              <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                {submitError}
              </div>
            )}
          </form>
        </div>

        {/* Trust Elements */}
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

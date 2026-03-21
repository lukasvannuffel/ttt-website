"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="mb-4 font-serif text-3xl font-bold text-[var(--text-primary)]">
        Er ging iets mis
      </h2>
      <p className="mb-8 text-[var(--text-secondary)]">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw.
      </p>
      <button onClick={reset} className="btn btn-primary">
        Opnieuw proberen
      </button>
    </div>
  );
}

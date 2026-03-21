import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="mb-4 font-serif text-5xl font-bold text-[var(--text-primary)]">
        404
      </h2>
      <p className="mb-8 text-[var(--text-secondary)]">
        Deze pagina bestaat niet.
      </p>
      <Link href="/" className="btn btn-primary">
        Terug naar home
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function PainelPage() {
  return (
    <main className="min-h-screen pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="artist-name text-[var(--text-muted)] mb-4">SEU ESPAÇO</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-12">
          Painel
        </h1>

        <div className="grid gap-8">
          <section className="p-8 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-card)]">
            <h2 className="artist-name text-[var(--accent)] mb-4">SEUS POEMAS</h2>
            <p className="text-[var(--text-secondary)]">
              Os poemas que você criou aparecerão aqui e também na Biblioteca do Pensador.
            </p>
          </section>

          <section className="p-8 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-card)]">
            <h2 className="artist-name text-[var(--accent)] mb-4">
              ARTISTAS QUE VOCÊ APRENDEU
            </h2>
            <p className="text-[var(--text-secondary)]">
              Cada artista da Experiência do Dia fica registrado para você revisitar.
            </p>
          </section>

          <section className="p-8 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-card)]">
            <h2 className="artist-name text-[var(--accent)] mb-4">SUA GALERIA</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Obras que você criar a partir do que aprendeu. Podem ser colocadas à venda (split 50/50).
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              Em breve: geração diária de obra própria + cotação de impressão (camiseta R$200 · moletom R$300 · telas R$200 / R$400 / R$500).
            </p>
          </section>
        </div>

        <div className="mt-16">
          <Link
            href="/experiencia-do-dia"
            className="interactive inline-flex px-8 py-3 rounded-full bg-[var(--accent)] text-white"
          >
            Ir para a Experiência do Dia
          </Link>
        </div>
      </div>
    </main>
  );
}

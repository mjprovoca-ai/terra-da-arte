import Link from "next/link";
import { initialArtworks, initialArtists } from "@/lib/seed/artists-initial";

export default function HomePage() {
  const movements = Array.from(
    new Set(initialArtists.map((a) => a.movimentoPrincipal))
  );

  return (
    <main className="min-h-screen">
      <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="artist-name text-[var(--accent)] mb-6 tracking-[0.2em]">
            TERRA DA ARTE
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] max-w-4xl">
            Uma obra.
            <br />
            <span className="text-[var(--text-secondary)]">Cinco segundos.</span>
            <br />
            Nunca mais.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Todos os dias uma imersão profunda em um artista.
            Depois, uma experiência que existe apenas uma vez
            e desaparece para sempre.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/experiencia-do-dia"
              className="interactive pulse-live inline-flex items-center px-8 py-4 rounded-full bg-[var(--accent)] text-white font-medium text-base"
            >
              Entrar na Experiência do Dia
            </Link>
            <Link
              href="#galeria"
              className="interactive inline-flex items-center px-8 py-4 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)]"
            >
              Explorar o Museu
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-[var(--border-subtle)] overflow-hidden py-4">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {initialArtists.map((a) => (
                <span
                  key={a.id + i}
                  className="artist-name text-[var(--text-muted)] whitespace-nowrap"
                >
                  {a.nome} · {a.movimentoPrincipal}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="galeria" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="artist-name text-[var(--text-muted)] mb-3">
                COLEÇÃO INICIAL
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Obras de domínio público
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {movements.map((m) => (
                <span
                  key={m}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {initialArtworks.map((obra) => {
              const artist = initialArtists.find(
                (a) => a.id === obra.artistaRef
              );
              return (
                <Link
                  key={obra.id}
                  href={`/obra/${obra.id}`}
                  className="group interactive block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)] mb-5">
                    <img
                      src={obra.urlDaImagem}
                      alt={obra.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="title-artwork text-lg tracking-tight mb-1">
                    {obra.titulo}
                  </h3>
                  <p className="artist-name text-[var(--text-muted)]">
                    {artist?.nome} · {obra.anoDeCriacao}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center border-t border-[var(--border-subtle)]">
        <p className="artist-name text-[var(--accent)] mb-6 tracking-[0.2em]">
          SÓ EXISTE UMA VEZ
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-2xl mx-auto mb-8">
          Amanhã será outro artista.
          <br />
          Outra obra.
          <br />
          Outros 5 segundos.
        </h2>
        <Link
          href="/experiencia-do-dia"
          className="interactive inline-flex items-center px-10 py-4 rounded-full bg-[var(--accent)] text-white font-medium"
        >
          Viva a de hoje
        </Link>
      </section>
    </main>
  );
}

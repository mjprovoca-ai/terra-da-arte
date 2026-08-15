import Link from "next/link";
import { initialArtworks, initialArtists } from "@/lib/seed/artists-initial";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArtistaPage({ params }: Props) {
  const { id } = await params;
  const artist = initialArtists.find((a) => a.id === id);
  if (!artist) notFound();

  const artworks = initialArtworks.filter((o) => o.artistaRef === artist.id);

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="artist-name text-[var(--text-muted)] interactive mb-12 inline-block"
        >
          ← VOLTAR
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 mb-20">
          <div className="aspect-square overflow-hidden bg-[var(--bg-elevated)]">
            <img
              src={artist.urlFotoArtista}
              alt={artist.nome}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="artist-name text-[var(--accent)] mb-3">
              {artist.movimentoPrincipal}
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              {artist.nome}
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              {artist.nacionalidade} · {artist.periodoAtividade}
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
              {artist.biografia}
            </p>
          </div>
        </div>

        <section>
          <h2 className="artist-name text-[var(--text-muted)] mb-8">
            OBRAS NA PLATAFORMA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((obra) => (
              <Link
                key={obra.id}
                href={`/obra/${obra.id}`}
                className="group interactive"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)] mb-4">
                  <img
                    src={obra.urlDaImagem}
                    alt={obra.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="title-artwork text-lg">{obra.titulo}</h3>
                <p className="artist-name text-[var(--text-muted)]">
                  {obra.anoDeCriacao}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

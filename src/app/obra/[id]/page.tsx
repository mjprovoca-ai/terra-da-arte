import Link from "next/link";
import { initialArtworks, initialArtists } from "@/lib/seed/artists-initial";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ObraPage({ params }: Props) {
  const { id } = await params;
  const obra = initialArtworks.find((o) => o.id === id);
  if (!obra) notFound();

  const artist = initialArtists.find((a) => a.id === obra.artistaRef);

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="artist-name text-[var(--text-muted)] interactive mb-12 inline-block"
        >
          ← VOLTAR
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)]">
            <img
              src={obra.urlDaImagem}
              alt={obra.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="artist-name text-[var(--text-muted)] mb-3">
              {artist?.movimentoPrincipal}
            </p>
            <h1 className="title-artwork text-4xl md:text-5xl tracking-tight mb-4">
              {obra.titulo}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-2">
              {artist?.nome}
            </p>
            <p className="text-[var(--text-muted)] mb-10">
              {obra.anoDeCriacao} · {obra.dimensoes} · {obra.status.replace("_", " ")}
            </p>

            <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-12">
              {obra.descricaoAnalitica}
            </p>

            {artist && (
              <Link
                href={`/artista/${artist.id}`}
                className="interactive inline-flex items-center text-[var(--accent)] font-medium"
              >
                Conhecer o artista →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

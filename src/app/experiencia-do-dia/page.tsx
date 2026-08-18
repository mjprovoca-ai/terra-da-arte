"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { initialArtists, initialArtworks } from "@/lib/seed/artists-initial";
import EphemeralExperience from "@/components/experiencia/EphemeralExperience";

function getArtistOfTheDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % initialArtists.length;
  return initialArtists[index];
}

export default function ExperienciaDoDiaPage() {
  const artist = useMemo(() => getArtistOfTheDay(), []);
  const artworks = initialArtworks.filter((o) => o.artistaRef === artist.id);

  const [phase, setPhase] = useState<
    "immerse" | "words" | "poem" | "ephemeral" | "done"
  >("immerse");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [word3, setWord3] = useState("");
  const [feeling, setFeeling] = useState("");
  const [poem, setPoem] = useState("");
  const [generatingPoem, setGeneratingPoem] = useState(false);

  const day = new Date().toISOString().slice(0, 10);

  const handleGeneratePoem = async () => {
    if (!word1 || !word2 || !word3) return;
    setGeneratingPoem(true);
    await new Promise((r) => setTimeout(r, 1800));

    const generated = `Três palavras: ${word1}, ${word2}, ${word3}.

No silêncio que ${artist.nome} deixou,
${feeling || "a sensação"} se abre como ferida luminosa.
O movimento ${artist.movimentoPrincipal} ainda respira
entre o que foi visto e o que nunca poderá ser guardado.

Cinco segundos bastam
para que o mundo inteiro
fique menor que o olhar.`;

    setPoem(generated);
    setGeneratingPoem(false);
    setPhase("poem");
  };

  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-center justify-between bg-[var(--bg-deep)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <Link href="/" className="artist-name text-[var(--text-muted)] interactive">
          TERRA DA ARTE
        </Link>
        <p className="artist-name text-[var(--accent)]">
          EXPERIÊNCIA DO DIA · {day}
        </p>
      </header>

      <div className="pt-24 pb-32">
        {phase === "immerse" && (
          <div className="max-w-4xl mx-auto px-6">
            <p className="artist-name text-[var(--text-muted)] mb-4">ARTISTA DE HOJE</p>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-2">
              {artist.nome}
            </h1>
            <p className="text-[var(--text-secondary)] text-lg mb-12">
              {artist.movimentoPrincipal} · {artist.periodoAtividade} · {artist.nacionalidade}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 mb-16">
              <div className="aspect-square overflow-hidden bg-[var(--bg-elevated)]">
                <img
                  src={artist.urlFotoArtista}
                  alt={artist.nome}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-lg leading-relaxed text-[var(--text-secondary)] whitespace-pre-line mb-8">
                  {artist.biografia}
                </p>
                {artist.contextoHistorico && (
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    <span className="artist-name text-[var(--accent)]">CONTEXTO · </span>
                    {artist.contextoHistorico}
                  </p>
                )}
                {artist.musicaEpoca && (
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    <span className="artist-name text-[var(--accent)]">MÚSICA · </span>
                    {artist.musicaEpoca}
                  </p>
                )}
                {artist.modaEpoca && (
                  <p className="text-sm text-[var(--text-muted)]">
                    <span className="artist-name text-[var(--accent)]">MODA · </span>
                    {artist.modaEpoca}
                  </p>
                )}
              </div>
            </div>

            {artworks.length > 0 && (
              <div className="mb-16">
                <p className="artist-name text-[var(--text-muted)] mb-6">OBRAS</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {artworks.map((obra) => (
                    <div key={obra.id} className="group">
                      <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)] mb-3">
                        <img
                          src={obra.urlDaImagem}
                          alt={obra.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="title-artwork text-sm">{obra.titulo}</p>
                      <p className="artist-name text-[var(--text-muted)] text-xs">{obra.anoDeCriacao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setPhase("words")}
              className="interactive pulse-live px-10 py-4 rounded-full bg-[var(--accent)] text-white font-medium"
            >
              Continuar — minhas três palavras
            </button>
          </div>
        )}

        {phase === "words" && (
          <div className="max-w-xl mx-auto px-6">
            <p className="artist-name text-[var(--text-muted)] mb-4">DEPOIS DO APRENDIZADO</p>
            <h2 className="text-3xl font-light tracking-tight mb-3">Três palavras</h2>
            <p className="text-[var(--text-secondary)] mb-10">
              O que ficou em você depois de conhecer {artist.nome}?
              Escreva três palavras. Depois a sensação.
            </p>

            <div className="space-y-4 mb-8">
              <input
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
                placeholder="Primeira palavra"
                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
              <input
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
                placeholder="Segunda palavra"
                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
              <input
                value={word3}
                onChange={(e) => setWord3(e.target.value)}
                placeholder="Terceira palavra"
                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
              <textarea
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="A sensação (opcional)"
                rows={3}
                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            <button
              onClick={handleGeneratePoem}
              disabled={!word1 || !word2 || !word3 || generatingPoem}
              className="interactive w-full px-10 py-4 rounded-full bg-[var(--accent)] text-white font-medium disabled:opacity-40"
            >
              {generatingPoem ? "Gerando poema..." : "Gerar Poema com IA"}
            </button>
          </div>
        )}

        {phase === "poem" && (
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="artist-name text-[var(--text-muted)] mb-8">SEU POEMA</p>
            <div className="text-left text-xl md:text-2xl font-light leading-relaxed whitespace-pre-line mb-16 text-[var(--text-primary)]">
              {poem}
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-10">
              Este poema entrará na Biblioteca do Pensador — aberto a todos.
            </p>
            <button
              onClick={() => setPhase("ephemeral")}
              className="interactive pulse-live px-10 py-4 rounded-full bg-[var(--accent)] text-white font-medium text-lg"
            >
              Viva a experiência do dia
            </button>
          </div>
        )}

        {phase === "ephemeral" && (
          <EphemeralExperience
            artistName={artist.nome}
            artistId={artist.id}
            threeWords={[word1, word2, word3]}
            poem={poem}
            day={day}
            alreadyCompletedToday={false}
            onComplete={() => setPhase("done")}
          />
        )}

        {phase === "done" && (
          <div className="max-w-xl mx-auto px-6 text-center py-20">
            <p className="artist-name text-[var(--text-muted)] mb-6">ATÉ AMANHÃ</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              A obra de hoje não existe mais.
            </h2>
            <p className="text-[var(--text-secondary)] mb-4 italic">
              A vida é sua, estrague-a como quiser.
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-12">
              Provocações provocam ações
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="interactive px-8 py-3 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)]"
              >
                Voltar ao museu
              </Link>
              <Link
                href="/painel"
                className="interactive px-8 py-3 rounded-full bg-[var(--accent)] text-white"
              >
                Meu painel
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import InfiniteScrollList from '@/components/InfiniteScrollList';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  let pokemons = [];
  let error = false;

  try {
    if (query) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        pokemons = [{ name: data.name, url: '', id: data.id.toString() }];
      } else {
        error = true;
      }
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
      const data = await res.json();
      pokemons = data.results.map((p: { name: string; url: string }) => {
        const id = p.url.split('/').filter(Boolean).pop() || '';
        return { ...p, id };
      });
    }
  } catch (e) {
    error = true;
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F5F3EA',
        padding: '0 0 5rem',
        color: '#1a1a1a',
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Top stripe */}
      <div style={{ height: '4px', background: '#CC2936', width: '100%' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 0' }}>

        {/* Header — título clicável limpa a pesquisa e volta ao catálogo */}
        <header style={{ marginBottom: '3rem', borderBottom: '1.5px solid #1a1a1a', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
                margin: 0,
                lineHeight: 1,
                fontFamily: "'Georgia', serif",
                textDecoration: 'none',
              }}
            >
              Pokédex
            </Link>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#CC2936',
                fontFamily: 'monospace',
                paddingBottom: '0.4rem',
              }}
            >
              Field Guide — Vol. I
            </span>
          </div>
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.875rem',
              color: '#666',
              letterSpacing: '0.04em',
              fontFamily: 'monospace',
            }}
          >
            {query
              ? `Resultado para: "${query}" — clique no título para voltar`
              : 'Catálogo completo de espécies — role para carregar mais'}
          </p>
        </header>

        {/* Search */}
        <SearchBar />

        {/* Content */}
        {error ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '4rem',
              padding: '3rem',
              border: '1.5px solid #1a1a1a',
              background: '#FFFEF9',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#CC2936',
                fontWeight: '700',
                fontFamily: 'monospace',
              }}
            >
              Espécie não encontrada
            </span>
            <p style={{ marginTop: '0.75rem', color: '#666', fontSize: '0.9rem' }}>
              Nenhum registro para &quot;{query}&quot; no catálogo.
            </p>
          </div>
        ) : (
          <InfiniteScrollList key={query} initialPokemons={pokemons} query={query} />
        )}
      </div>
    </main>
  );
}
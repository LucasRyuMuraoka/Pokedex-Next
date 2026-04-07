import Image from 'next/image';
import Link from 'next/link';

interface PokemonType {
  type: { name: string };
}

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

// Color map for types
const typeColors: Record<string, string> = {
  fire: '#E8440A',
  water: '#2A7CE0',
  grass: '#3D9E3D',
  electric: '#D4A017',
  ice: '#4DAFCF',
  fighting: '#9B2335',
  poison: '#8B3BAB',
  ground: '#B5873C',
  flying: '#6A8FD8',
  psychic: '#D6356A',
  bug: '#7BAD1E',
  rock: '#8C7542',
  ghost: '#5B4580',
  dragon: '#4040C8',
  dark: '#3D3030',
  steel: '#7A8FA6',
  fairy: '#D4709A',
  normal: '#9E9E8A',
};

export default async function PokemonDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${resolvedParams.id}`);

  if (!res.ok) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F3EA',
          color: '#1a1a1a',
          fontFamily: "'Georgia', serif",
          gap: '1.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CC2936', fontFamily: 'monospace', fontWeight: 700 }}>
          Registro não encontrado
        </span>
        <Link
          href="/"
          style={{
            padding: '0.6rem 1.5rem',
            border: '1.5px solid #1a1a1a',
            color: '#1a1a1a',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
        >
          ← Voltar ao catálogo
        </Link>
      </main>
    );
  }

  const pokemon = await res.json();
  const primaryType = pokemon.types[0]?.type?.name || 'normal';
  const typeColor = typeColors[primaryType] || '#1a1a1a';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F5F3EA',
        color: '#1a1a1a',
        fontFamily: "'Georgia', serif",
        paddingBottom: '5rem',
      }}
    >
      {/* Top accent stripe — type color */}
      <div style={{ height: '4px', background: typeColor, width: '100%' }} />

      {/* Header nav */}
      <header
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #1a1a1a',
          background: '#FFFEF9',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: '#1a1a1a',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </Link>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            color: '#999',
          }}
        >
          Pokédex — Field Guide
        </span>
      </header>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 2rem 0' }}>

        {/* Entry header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '3rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            borderBottom: '1.5px solid #1a1a1a',
            paddingBottom: '2.5rem',
          }}
        >
          {/* Image block */}
          <div
            style={{
              background: '#FFFEF9',
              border: '1.5px solid #1a1a1a',
              padding: '1.5rem',
              display: 'inline-block',
              position: 'relative',
            }}
          >
            {/* Type color corner accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40px',
                height: '40px',
                background: typeColor,
              }}
            />
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              width={200}
              height={200}
              style={{ display: 'block', position: 'relative', filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' }}
            />
          </div>

          {/* Name & meta */}
          <div style={{ flex: 1, minWidth: '200px', paddingTop: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                fontFamily: 'monospace',
              }}
            >
              Entrada #{pokemon.id.toString().padStart(3, '0')}
            </span>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '700',
                textTransform: 'capitalize',
                letterSpacing: '-0.02em',
                margin: '0.25rem 0 1.25rem',
                lineHeight: 1.1,
              }}
            >
              {pokemon.name}
            </h1>

            {/* Types */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {pokemon.types.map((t: PokemonType) => (
                <span
                  key={t.type.name}
                  style={{
                    padding: '0.3rem 0.9rem',
                    background: typeColors[t.type.name] || '#1a1a1a',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                  }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Physical info */}
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#999',
                    fontFamily: 'monospace',
                    marginBottom: '0.25rem',
                  }}
                >
                  Peso
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                  {pokemon.weight / 10}
                  <span style={{ fontSize: '0.9rem', color: '#999', marginLeft: '0.25rem' }}>kg</span>
                </span>
              </div>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#999',
                    fontFamily: 'monospace',
                    marginBottom: '0.25rem',
                  }}
                >
                  Altura
                </span>
                <span style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                  {pokemon.height / 10}
                  <span style={{ fontSize: '0.9rem', color: '#999', marginLeft: '0.25rem' }}>m</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div>
          <h3
            style={{
              fontSize: '0.7rem',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              color: '#999',
              marginBottom: '1.5rem',
            }}
          >
            Status Base
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pokemon.stats.map((stat: PokemonStat) => {
              const pct = Math.min(stat.base_stat, 100);
              const barColor =
                stat.base_stat >= 80 ? '#3D9E3D' : stat.base_stat >= 50 ? '#D4A017' : '#CC2936';

              return (
                <div key={stat.stat.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '130px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#666',
                      fontFamily: 'monospace',
                      flexShrink: 0,
                    }}
                  >
                    {stat.stat.name.replace('-', ' ')}
                  </span>

                  {/* Bar track */}
                  <div
                    style={{
                      flex: 1,
                      height: '6px',
                      background: '#E0DECE',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: barColor,
                        transition: 'width 1s ease',
                      }}
                    />
                  </div>

                  <span
                    style={{
                      width: '40px',
                      textAlign: 'right',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      letterSpacing: '0.02em',
                      fontFamily: 'monospace',
                      flexShrink: 0,
                    }}
                  >
                    {stat.base_stat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
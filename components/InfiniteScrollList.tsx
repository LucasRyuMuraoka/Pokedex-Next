'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonBase {
  name: string;
  url: string;
  id: string;
}

export default function InfiniteScrollList({
  initialPokemons,
  query,
}: {
  initialPokemons: PokemonBase[];
  query: string;
}) {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [offset, setOffset] = useState(20);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!query);

  const observer = useRef<IntersectionObserver | null>(null);

  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await res.json();
      const newPokemons = data.results.map((p: { name: string; url: string }) => {
        const id = p.url.split('/').filter(Boolean).pop() || '';
        return { ...p, id };
      });
      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + 20);
      if (!data.next) setHasMore(false);
    } catch (e) {
      console.error('Erro ao carregar mais pokémons', e);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  const lastPokemonRef = useCallback(
    (node: HTMLAnchorElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePokemons();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePokemons]
  );

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0',
          marginTop: '2rem',
          border: '1.5px solid #1a1a1a',
        }}
      >
        {pokemons.map((pokemon, index) => {
          const isLastElement = pokemons.length === index + 1;
          return (
            <Link
              key={`${pokemon.id}-${index}`}
              href={`/pokemon/${pokemon.id}`}
              ref={isLastElement ? lastPokemonRef : null}
              style={{ textDecoration: 'none' }}
            >
              <PokemonCard pokemon={pokemon} index={index} />
            </Link>
          );
        })}
      </div>

      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
            paddingBottom: '2rem',
          }}
        >
          <span
            style={{
              fontWeight: '700',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#CC2936',
            }}
          >
            Carregando mais pokémons...
          </span>
        </div>
      )}
    </>
  );
}

function PokemonCard({ pokemon, index }: { pokemon: PokemonBase; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F5C800' : '#FFFEF9',
        padding: '1.75rem 1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        position: 'relative',
        minHeight: '220px',
        justifyContent: 'flex-end',
        borderRight: '1.5px solid #1a1a1a',
        borderBottom: '1.5px solid #1a1a1a',
      }}
    >
      {/* ID tag top-left */}
      <span
        style={{
          position: 'absolute',
          top: '0.9rem',
          left: '1rem',
          fontSize: '0.65rem',
          fontWeight: '700',
          letterSpacing: '0.12em',
          color: hovered ? '#1a1a1a' : '#999',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          transition: 'color 0.2s',
        }}
      >
        #{pokemon.id.padStart(3, '0')}
      </span>

      {/* Pokémon image */}
      <div style={{ marginBottom: '0.75rem', marginTop: '1rem' }}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          width={110}
          height={110}
          style={{
            transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.25s ease',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
          }}
          priority={index < 10}
        />
      </div>

      {/* Name */}
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: '700',
          textTransform: 'capitalize',
          color: '#1a1a1a',
          letterSpacing: '0.04em',
          margin: 0,
          textAlign: 'center',
        }}
      >
        {pokemon.name}
      </h2>

      {/* Bottom accent line on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: hovered ? '#CC2936' : 'transparent',
          transition: 'background 0.2s',
        }}
      />
    </div>
  );
}
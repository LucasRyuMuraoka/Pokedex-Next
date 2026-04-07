'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim() || '';
    if (val) {
      router.push(`/?q=${val}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', marginBottom: '2.5rem', justifyContent: 'center' }}>
      <input
        key={urlQuery}
        ref={inputRef}
        type="text"
        defaultValue={urlQuery}
        placeholder="Nome ou ID — ex: charizard, 6"
        style={{
          padding: '0.75rem 1.25rem',
          border: '1.5px solid #1a1a1a',
          borderRight: 'none',
          width: '100%',
          maxWidth: '420px',
          fontSize: '0.9rem',
          letterSpacing: '0.03em',
          background: '#FFFEF9',
          color: '#1a1a1a',
          outline: 'none',
          fontFamily: 'inherit',
        }}
        onFocus={e => (e.target.style.borderColor = '#CC2936')}
        onBlur={e => (e.target.style.borderColor = '#1a1a1a')}
      />
      <button
        type="submit"
        style={{
          background: '#CC2936',
          color: '#FFFEF9',
          padding: '0.75rem 1.5rem',
          border: '1.5px solid #CC2936',
          fontWeight: '700',
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => ((e.target as HTMLButtonElement).style.background = '#a81f29')}
        onMouseLeave={e => ((e.target as HTMLButtonElement).style.background = '#CC2936')}
      >
        Buscar
      </button>
    </form>
  );
}
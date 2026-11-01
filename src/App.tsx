import { useCallback, useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Principles } from './components/Principles';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { Contact } from './components/Contact';
import { useReveal } from './hooks/useReveal';

export function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useReveal();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable]');
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <TopBar onOpenPalette={openPalette} />
      <main>
        <Hero onOpenPalette={openPalette} />
        <Ticker />
        <Principles />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}

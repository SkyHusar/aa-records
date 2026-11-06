/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  ArrowRight, AudioWaveform, Disc3, Heart, Headphones, Image as ImageIcon,
  Layers3, Music2, SlidersHorizontal, Sparkles, X, Video, Play
} from 'lucide-react';
import './aa-showcase.css';
import './aa-reference-hero.css';

const featuredAlbums = [
  { title:'After 4 AM', label:'15 nowych utworów', cover:'/covers/zielone-swiatla.webp', target:'after4am' },
  { title:'Aditi EP', label:'EP · 3 utwory', cover:'/covers/aditi.png', target:'aditi-ep' },
  { title:'Ziomale Sojuszu', label:'Album · 7 utworów', cover:'/covers/ziomalesojuszu.png', target:'ziomale' },
  { title:'Terra Infinita', label:'Projekt specjalny', cover:'/covers/terrainfinita.png', target:'terrainfinita' }
];
const featuredStories = [
  { title: 'Automat z Kawą', category: 'ALBUM · HISTORIA', cover: '/covers/automat-z-kawa.webp' },
  { title: 'Dziewczyna z Piekarni', category: 'SINGIEL · HISTORIA', cover: '/covers/dziewczyna-z-piekarni.webp' },
  { title: 'Zielone Światła', category: 'ALBUM · HISTORIA', cover: '/covers/zielone-swiatla.webp' }
];

const services = [
  { Icon: AudioWaveform, title: 'Produkcja utworów', note: 'Autorskie, oryginalne tracki', target: 'album' },
  { Icon: ImageIcon, title: 'Okładki i grafiki', note: 'Spójna, klimatyczna oprawa', target: 'services' },
  { Icon: Layers3, title: 'Klimat i storytelling', note: 'Muzyka z emocją i historią', target: 'mission' },
  { Icon: SlidersHorizontal, title: 'Własne zamówienia', note: 'Utwory tworzone na życzenie', target: 'create' }
];

function NeonWave({ compact = false }) {
  return (
    <div className={compact ? 'aash-wave aash-wave--compact' : 'aash-wave'} aria-hidden="true">
      {Array.from({ length: 68 }, (_, index) => {
        const center = Math.sin(index * .185) * .36 + Math.sin(index * .41) * .21;
        return <i key={index} style={{ height: (20 + Math.abs(center) * 72) + '%', animationDelay: (index * -.045) + 's' }} />;
      })}
    </div>
  );
}

export default function AAShowcase({ trackCount, onNavigate, after4amReady, onPlayAfter4am, onOpenIntro, onPlaySingle }) {
  const [activeArtwork, setActiveArtwork] = useState(null);
  return (
    <main className="aash">
      <section className="aash-hero" aria-labelledby="aash-heading">
        <div className="aash-hero-shade" />
        <div className="aash-hero-content">
          <span className="aash-kicker">AA RECORDS · MUSIC 4 LIFE</span>
          <span className="aash-hero-crown" aria-hidden="true">♛</span>
          <h1 id="aash-heading" className="aash-hero-brand">AA RECORDS <em>Music 4 Life ♡</em></h1>
          <p>Muzyka · Wizja · Wolność · Ziomale</p>
          <div className="aash-hero-tiles" aria-label="Odkryj AA Records">
            <button type="button" onClick={() => onNavigate('after4am')}><Disc3 size={27}/><strong>Albumy</strong><small>Nasza muzyka</small></button>
            <button type="button" onClick={() => onNavigate('mission')}><Heart size={27}/><strong>Misja</strong><small>Wizja i historia</small></button>
            <button type="button" onClick={() => onNavigate('create')}><AudioWaveform size={27}/><strong>Utwórz Track</strong><small>Twój własny numer</small></button>
            <button type="button" onClick={() => onNavigate('services')}><Headphones size={27}/><strong>O nas</strong><small>AA Records</small></button>
          </div>
          {onOpenIntro && <button type="button" className="aash-intro-trigger" onClick={onOpenIntro}><Video size={17}/> Obejrzyj intro · 30 s</button>}
        </div>
        <div className="aash-hero-wave"><NeonWave /></div>
      </section>

      <div className="aash-inner">
        <section className="aash-release-strip" aria-labelledby="aash-release-title">
          <div className="aash-section-top"><h2 id="aash-release-title">Najnowsze wydania</h2><button type="button" className="aash-text-button" onClick={() => onNavigate('after4am')}>After 4 AM <ArrowRight size={16}/></button></div>
          <div className="aash-release-grid">
            {featuredAlbums.map((album) => <button key={album.target} type="button" className="aash-release" onClick={() => onNavigate(album.target)}>
              <img src={album.cover} loading="lazy" alt="" />
              <span><strong>{album.title}</strong><small>{album.label}</small></span><span className="aash-release-play"><Disc3 size={20}/></span>
            </button>)}
          </div>
        </section>
        {onPlaySingle && <section className="aash-new-song" aria-label="Premiera utworu Bez Rakiet"><img src="/covers/bez-rakiet.jpg" alt="Okładka singla Bez Rakiet" /><div><span>NOWOŚĆ · 14 / 50</span><h2>Bez Rakiet</h2><p>Nie trzeba zdobywać gwiazd, żeby trochę światła dać. 💜</p></div><button type="button" onClick={onPlaySingle}><Play size={16} fill="currentColor" /> Posłuchaj</button></section>}
        <section className="aash-featured" aria-labelledby="aash-featured-title">
          <div className="aash-section-top">
            <h2 id="aash-featured-title">Muzyczne historie</h2>
            <button type="button" onClick={() => onNavigate('album')} className="aash-text-button">Zobacz wszystkie albumy <ArrowRight size={16} /></button>
          </div>
          <div className="aash-story-grid">
            {featuredStories.map((story) => (
              <article className="aash-story" key={story.title}>
                <button type="button" className="aash-story-picture" onClick={() => { if (after4amReady) onPlayAfter4am({ 'Automat z Kawą': 2, 'Dziewczyna z Piekarni': 5, 'Zielone Światła': 14 }[story.title]); else setActiveArtwork(story); }} aria-label={(after4amReady ? 'Odtwórz: ' : 'Powiększ okładkę: ') + story.title}>
                  <img src={story.cover} alt={'Grafika utworu ' + story.title} loading="lazy" />
                  <span className="aash-story-shade" />
                  <span className="aash-story-title">{story.title}<small>{story.category}</small></span>
                  <span className="aash-story-action">{after4amReady ? <Disc3 size={21} /> : <ImageIcon size={21} />}</span>
                </button>
              </article>
            ))}
          </div>
          <p className="aash-release-note">{after4amReady ? 'Kliknij okładkę, by odtworzyć utwór w odtwarzaczu AA Records.' : 'Nowe utwory pojawią się tutaj po zaimportowaniu paczki audio After 4 AM.'}</p>
        </section>

        <section className="aash-mission" aria-label="Nasza misja">
          <button type="button" onClick={() => onNavigate('mission')} className="aash-mission-title">Nasza misja</button>
          <NeonWave compact />
          <div className="aash-mission-items">
            <button type="button" onClick={() => onNavigate('album')}><Music2 /> Tworzyć <strong>muzykę</strong></button>
            <button type="button" onClick={() => onNavigate('mission')}><Sparkles /> Budować <strong>klimat</strong></button>
            <button type="button" onClick={() => onNavigate('mission')}><Heart /> Opowiadać <strong>historie</strong></button>
          </div>
        </section>

        <section className="aash-services" aria-labelledby="aash-services-title">
          <h2 id="aash-services-title">Czym się zajmujemy <span /></h2>
          <div className="aash-service-grid">
            {services.map(({ Icon, title, note, target }) => (
              <button type="button" className="aash-service" key={title} onClick={() => onNavigate(target)}>
                <Icon aria-hidden="true" />
                <span><strong>{title}</strong><small>{note}</small></span>
                <ArrowRight className="aash-service-arrow" aria-hidden="true" size={16} />
              </button>
            ))}
          </div>
        </section>

        <section className="aash-cta">
          <div className="aash-cta-image" aria-hidden="true"><Headphones size={54} /></div>
          <div className="aash-cta-copy"><h2>Masz pomysł na <em>własny utwór?</em></h2><p>Zamów spersonalizowany track — my zajmiemy się resztą!</p></div>
          <NeonWave compact />
          <button type="button" className="aash-button aash-button--pink" onClick={() => onNavigate('create')}><AudioWaveform size={17} /> Stwórz własny track <ArrowRight size={16} /></button>
        </section>
        <div className="aash-footer-links">
          <span><Disc3 size={14} /> {trackCount} utworów w odtwarzaczu</span>
          <button type="button" onClick={() => onNavigate('visualizer')}>Otwórz Wizjonarium <ArrowRight size={15} /></button>
        </div>
      </div>
      {activeArtwork && (
        <div className="aash-artwork-backdrop" role="presentation" onClick={() => setActiveArtwork(null)}>
          <section className="aash-artwork-dialog" role="dialog" aria-modal="true" aria-label={'Okładka ' + activeArtwork.title} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="aash-artwork-close" onClick={() => setActiveArtwork(null)} aria-label="Zamknij podgląd okładki"><X size={20} /></button>
            <img src={activeArtwork.cover} alt={'Okładka ' + activeArtwork.title} />
            <h2>{activeArtwork.title}</h2><p>AA Records · muzyczna historia</p>
          </section>
        </div>
      )}
    </main>
  );
}

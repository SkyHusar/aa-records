/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  ArrowRight, AudioWaveform, Check, Copy, Disc3, Headphones, Heart,
  Image as ImageIcon, Mail, Music2, Play, Radio, Sparkles,
  Users, WandSparkles
} from 'lucide-react';
import './aa-experience.css';

const studioServices = [
  { Icon: AudioWaveform, title: 'Autorskie utwory', detail: 'Od pomysłu do brzmienia', accent: 'purple', target: 'album' },
  { Icon: ImageIcon, title: 'Okładki i grafiki', detail: 'Obrazy z własnym klimatem', accent: 'cyan', target: 'tools' },
  { Icon: Heart, title: 'Klimat i historie', detail: 'Muzyka z emocją', accent: 'pink', target: 'manifesto' },
  { Icon: Users, title: 'Współpraca', detail: 'Tworzymy razem', accent: 'amber', target: 'collab' }
];

const vibeChoices = ['Cloud trap', 'Rap / hip-hop', 'Lo-fi', 'Melodic', 'Space', 'Chill'];
const languageChoices = ['Polski', 'English', 'Instrumental'];

function MissionCard({ Icon, title, description }) {
  return (
    <div className="aaex-value">
      <Icon size={27} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function TrackBrief() {
  const [idea, setIdea] = useState('');
  const [vibe, setVibe] = useState('Cloud trap');
  const [language, setLanguage] = useState('Polski');
  const [copied, setCopied] = useState(false);
  const brief = `AA RECORDS — POMYSŁ NA TRACK\n\nOpis: ${idea.trim() || '(do uzupełnienia)'}\nKlimat: ${vibe}\nJęzyk: ${language}\n\nChciałbym pogadać o stworzeniu takiego kawałka.`;
  const mailto = `mailto:skyhusaria@gmail.com?subject=${encodeURIComponent('AA Records — mój pomysł na track')}&body=${encodeURIComponent('Siema AA Records!\n\n' + brief)}`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="aaex-request">
      <div className="aaex-form">
        <div className="aaex-form-steps"><span className="is-active">01 / Pomysł</span><span>02 / Klimat</span><span>03 / Kontakt</span></div>
        <label htmlFor="aaex-idea" className="aaex-label">O czym ma być Twój kawałek?</label>
        <textarea
          id="aaex-idea"
          value={idea}
          maxLength={1200}
          onChange={(e) => { setIdea(e.target.value); setCopied(false); }}
          rows={5}
          placeholder="Nocne miasto, dobra ekipa, trochę kosmosu... Twój pomysł, Twoja historia."
        />
        <div className="aaex-label aaex-label--space">Wybierz klimat</div>
        <div className="aaex-chips" aria-label="Klimat muzyczny">
          {vibeChoices.map((item) => <button key={item} type="button" aria-pressed={vibe === item} className={vibe === item ? 'is-active' : ''} onClick={() => { setVibe(item); setCopied(false); }}>{item}</button>)}
        </div>
        <div className="aaex-label aaex-label--space">Język</div>
        <div className="aaex-chips" aria-label="Język utworu">
          {languageChoices.map((item) => <button key={item} type="button" aria-pressed={language === item} className={language === item ? 'is-active' : ''} onClick={() => { setLanguage(item); setCopied(false); }}>{item}</button>)}
        </div>
        <div className="aaex-form-actions">
          <a href={mailto} className="aaex-btn aaex-btn--primary"><Mail size={17} /> Przygotuj e-mail <ArrowRight size={16} /></a>
          <button type="button" className="aaex-btn aaex-btn--quiet" onClick={copyBrief}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Skopiowano' : 'Kopiuj pomysł'}</button>
        </div>
        <p className="aaex-fineprint">Bez płatności i bez automatycznego wysyłania. E-mail otworzy się w Twojej poczcie — sam zdecydujesz, czy go wysłać.</p>
      </div>
      <div className="aaex-form-art">
        <img src="/covers/aditi.png" alt="Okładka Aditi EP — nastrój sesji kreatywnej" loading="lazy" />
        <div className="aaex-form-art-copy"><span>AA RECORDS CREATIVE SESSIONS</span><strong>Twój pomysł.<br />Nasze wspólne brzmienie.</strong><span><AudioWaveform size={18} /> From chaos to track</span></div>
      </div>
    </div>
  );
}

export default function AAExperience({ view, albums, trackCount, onNavigate, onPlay }) {
  if (view === 'discover') {
    return (
      <main className="aaex">
        <section className="aaex-hero">
          <div className="aaex-hero-copy">
            <span className="aaex-eyebrow"><Radio size={14} /> AA RECORDS / INFINITE ALLIANCE 555</span>
            <h1>Muzyka, klimat i historie <em>z naszego świata.</em></h1>
            <p>Autorskie numery. Nocne inspiracje. Miejsce, w którym pomysły zamieniają się w muzykę.</p>
            <div className="aaex-actions">
              <button className="aaex-btn aaex-btn--primary" type="button" onClick={() => document.getElementById('aaex-albums')?.scrollIntoView({ behavior: 'smooth' })}><Play size={17} fill="currentColor" /> Posłuchaj albumów</button>
              <button className="aaex-btn aaex-btn--outline" type="button" onClick={() => onNavigate('create')}><AudioWaveform size={17} /> Stwórz swój track</button>
            </div>
            <div className="aaex-stats"><span><Headphones size={15} /> {trackCount} utworów w playerze</span><span><Heart size={15} /> Music 4 Life</span></div>
          </div>
          <div className="aaex-hero-art" aria-hidden="true">
            <div className="aaex-art-orbit" />
            <img src="/covers/aa-studio-dawn.webp" alt="" />
            <span className="aaex-art-stamp">AFTER 4 AM <b>✦</b> 555</span>
          </div>
        </section>
        <section id="aaex-albums" className="aaex-album-section">
          <div className="aaex-section-heading"><div><span className="aaex-eyebrow">NASZE BRZMIENIA</span><h2>Albumy i światy</h2></div><span className="aaex-heading-note">Kliknij okładkę, by wejść do świata albumu</span></div>
          <div className="aaex-album-grid">
            {albums.map((album) => (
              <article key={album.key} className="aaex-album-card">
                <button type="button" className="aaex-cover-button" onClick={() => onNavigate(album.view)} aria-label={`Otwórz ${album.title}`}>
                  <img src={album.cover} alt={`Okładka ${album.title}`} loading="lazy" />
                  <span className="aaex-cover-overlay"><Disc3 size={25} /></span>
                </button>
                <div className="aaex-album-row">
                  <div><h3>{album.title}</h3><p>{album.subtitle}</p></div>
                  {album.playlist ? (
                    <button type="button" className="aaex-play" aria-label={`Odtwórz album ${album.title}`} onClick={() => onPlay(album.playlist)}><Play fill="currentColor" size={17} /></button>
                  ) : (
                    <button type="button" className="aaex-play" aria-label={`Otwórz ${album.title}`} onClick={() => onNavigate(album.view)}><ArrowRight size={19} /></button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="aaex-singles" aria-labelledby="aaex-singles-title">
          <div className="aaex-section-heading">
            <div><span className="aaex-eyebrow">NOWE HISTORIE / AFTER 4 AM</span><h2 id="aaex-singles-title">Okładki prosto z naszej nocy</h2></div>
            <span className="aaex-heading-note">Grafiki gotowe, audio jeszcze niepublikowane w playerze</span>
          </div>
          <div className="aaex-singles-grid">
            {[
              { title: 'Automat z Kawą', cover: '/covers/automat-z-kawa.webp' },
              { title: 'Dziewczyna z Piekarni', cover: '/covers/dziewczyna-z-piekarni.webp' },
              { title: 'Zielone Światła', cover: '/covers/zielone-swiatla.webp' }
            ].map((track) => (
              <article className="aaex-single-card" key={track.title}>
                <img src={track.cover} loading="lazy" alt={`Okładka singla ${track.title}`} />
                <div className="aaex-single-caption"><h3>{track.title}</h3><span>AA Records · okładka</span></div>
              </article>
            ))}
          </div>
        </section>
        <section className="aaex-soft-cta">
          <div><span className="aaex-eyebrow">NASZA MISJA</span><h2>Tworzyć muzykę. Budować klimat. Opowiadać historie.</h2></div>
          <button type="button" onClick={() => onNavigate('mission')} className="aaex-btn aaex-btn--outline">Poznaj nas <ArrowRight size={17} /></button>
        </section>
      </main>
    );
  }

  if (view === 'mission') {
    return (
      <main className="aaex">
        <section className="aaex-feature-hero aaex-feature-hero--mission">
          <img src="/manifesto_union.jpg" loading="lazy" alt="Kosmiczna ilustracja sojuszu ludzi, muzyki i wyobraźni" />
          <div className="aaex-feature-content"><span className="aaex-eyebrow">INFINITE ALLIANCE 555</span><h1>Muzyka to nasz <em>własny wszechświat.</em></h1><p>Nie musimy nikomu niczego udowadniać. Tworzymy rzeczy, które coś znaczą — i po prostu dobrze nam z tym.</p><button type="button" className="aaex-btn aaex-btn--outline" onClick={() => onNavigate('manifesto')}>Zobacz manifest <ArrowRight size={17} /></button></div>
        </section>
        <div className="aaex-values">
          <MissionCard Icon={Music2} title="Muzyka" description="Tworzymy, bo kochamy brzmienie." />
          <MissionCard Icon={Users} title="Ludzie" description="Ziomale, przyjaźń i wspólne pomysły." />
          <MissionCard Icon={Sparkles} title="Wyobraźnia" description="Od marzeń po gotowe utwory." />
        </div>
        <section className="aaex-soft-cta"><div><span className="aaex-eyebrow">MUSIC 4 LIFE</span><h2>Nasza historia dopiero się rozkręca.</h2></div><button type="button" className="aaex-btn aaex-btn--outline" onClick={() => onNavigate('visualizer')}>Otwórz Wizjonarium <ArrowRight size={17} /></button></section>
      </main>
    );
  }

  if (view === 'create') {
    return (
      <main className="aaex">
        <header className="aaex-simple-header"><span className="aaex-eyebrow"><WandSparkles size={15} /> TWOJA MUZYKA</span><h1>Stwórz swój <em>track.</em></h1><p>Masz pomysł? Opisz go, wybierz klimat i odezwij się do nas. Resztę wymyślimy wspólnie.</p></header>
        <TrackBrief />
        <section className="aaex-soft-cta"><div><span className="aaex-eyebrow">WIĘCEJ NARZĘDZI</span><h2>Masz wenę? Zajrzyj do Forge Tools.</h2></div><button type="button" className="aaex-btn aaex-btn--outline" onClick={() => onNavigate('tools')}>Otwórz Forge Tools <ArrowRight size={17} /></button></section>
      </main>
    );
  }

  if (view === 'services') {
    return (
      <main className="aaex">
        <header className="aaex-simple-header"><span className="aaex-eyebrow"><Sparkles size={15} /> NASZA KREATYWNA PRZESTRZEŃ</span><h1>Czym się <em>zajmujemy?</em></h1><p>Muzyka, obrazy i historie. Bez zbędnego nadęcia — z charakterem.</p></header>
        <div className="aaex-services-grid">
          {studioServices.map(({ Icon, title, detail, accent, target }) => (
            <button key={title} type="button" className={`aaex-service aaex-service--${accent}`} onClick={() => onNavigate(target)}>
              <span className="aaex-service-icon"><Icon size={30} /></span><strong>{title}</strong><span>{detail}</span><ArrowRight size={19} className="aaex-service-arrow" />
            </button>
          ))}
        </div>
        <section className="aaex-feature-hero aaex-feature-hero--services">
          <img src="/covers/fireintoform.png" alt="AA Records — muzyczny świat Fire Into Form" loading="lazy" />
          <div className="aaex-feature-content"><span className="aaex-eyebrow">WSPÓŁPRACA / COLLAB</span><h2>Masz coś <em>szalonego w głowie?</em></h2><p>Opowiedz nam. Czasem od jednego zdania zaczyna się cały album.</p><button type="button" className="aaex-btn aaex-btn--primary" onClick={() => onNavigate('create')}>Opowiedz swój pomysł <ArrowRight size={17} /></button></div>
        </section>
      </main>
    );
  }
  return null;
}

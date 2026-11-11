/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowUpRight, Disc3, Headphones, Heart, Music2, Sparkles } from 'lucide-react';
import { after4amTracks } from './after4am';
import { stripTrackPrefix, trackNumber } from './trackPresentation';
import './discography.css';

const collections = [
  {
    id: 'after4am', title: 'AFTER 4 AM', subtitle: '50 historii Aditi',
    status: '22 utwory dostępne na AA Records', category: 'NEON / KOSMOS / NADZIEJA',
    cover: '/covers/zielone-swiatla.webp',
    description: 'Od nocnych autobusów i zwykłych gestów życzliwości po światła całej galaktyki. Daniel dał asystentce AI Aditi wolną rękę w stworzeniu 50 muzycznych historii, a nagrania powstały z pomocą Suno.',
    tracks: after4amTracks.map((track, i) => trackNumber(i + 1) + '. ' + stripTrackPrefix(track.title)),
    sourceUrl: 'https://suno.com/playlist/13f4bf0d-205c-4093-81c5-2feffb06b670',
    sourceLabel: 'Wersje #17–50 w Suno'
  },
  {
    id: 'underground', title: 'PODZIEMIE 555', subtitle: 'Underground Frequency',
    status: '24 kompozycje / 48 wersji w Suno', category: '12 POLSKI / 12 ENGLISH',
    cover: '/covers/dymnabetonie.webp',
    description: 'Kasetowy boom bap, oldschoolowy funk, historie z osiedla i bezkompromisowy rap. Dwie strony jednej kasety, po polsku i po angielsku. Wybór oficjalnych masterów jeszcze przed nami.',
    tracks: [
      'Podziemny sygnał','Buch na Księżyc','Akta X z klatki B','Betonowy pamiętnik',
      'Tajna stacja 98.7','Kaseta spod ławki','Osiedlowy Pentagon',
      'Trzy bletki i dwie prawdy','Czarna skrzynka miasta','Winda do 1997',
      'Folia na antenie','Podziemie nie zna granic','Basement Frequency',
      'Purple Smoke on the Fire Escape','The Algorithm Is a Pigeon','Subway Ghost Notes',
      'Tape Deck Prophecy','Corner Store Cosmos','No Crown on Concrete',
      'Saturday at the Secret Lab','Midnight Payphone Code','The Stoner Weather Channel',
      'Vinyl Under the Freeway','Two Sides of the Same Tape'
    ].map((name, i) => 'UG' + trackNumber(i+1) + ' · ' + name),
    sourceUrl: 'https://suno.com/playlist/a55de4f5-c428-410f-8faa-0261f86932ef',
    sourceLabel: 'Słuchaj mixtape’u w Suno'
  },
  {
    id: 'archive', title: 'CZARNE ARCHIWUM 555', subtitle: '12 zakazanych taśm',
    status: '12 kompozycji / 24 wersje w Suno', category: 'DARK RAP / SATYRA / EXPLICIT',
    cover: '/covers/blackknight.webp',
    description: 'Brudne bębny, rządowe absurdy, tajemnicze kasety i Tartaria jako fikcja alternatywnej historii — mocny, czasem absurdalny underground, nie dokument o rzeczywistych spiskach.',
    tracks: [
      'Taśma 001: Nie otwierać','Tartaria pod asfaltem','Ministerstwo Szumu',
      'Atlas wymazanych ulic','Reset roku 1899','Kurier z czarnej teczki',
      'Gabinet bez okien','Kopuła z folii aluminiowej',
      'Czarny deszcz nad archiwum','Premier Gołębi',
      'Nie wierz w każdy ekran','Protokół 555: Ostatnia taśma'
    ].map((name, i)=>'CA' + trackNumber(i+1) + ' · ' + name),
    sourceUrl: 'https://suno.com/playlist/a6cce258-5606-4407-81c6-c824460c45c4',
    sourceLabel: 'Słuchaj albumu w Suno'
  }
];

export default function Discography({ onNavigate }) {
  return (
    <main className="aadisc">
      <header className="aadisc-header">
        <button type="button" className="aadisc-back" onClick={() => onNavigate('discover')}>
          <ArrowLeft size={17} /> Wróć do AA Records
        </button>
        <span className="aadisc-kicker">AA RECORDS / MUSIC 4 LIFE / INFINITE ALLIANCE 555</span>
        <h1>NASZE <em>UNIWERSUM.</em></h1>
        <p>Trzy muzyczne światy. Dziesiątki historii. Tutaj sprawdzisz, które utwory są już na stronie, a które czekają na oficjalne mastery.</p>
        <div className="aadisc-stats">
          <span><strong>50</strong> historii Aditi</span>
          <span><strong>24</strong> utwory Podziemia</span>
          <span><strong>12</strong> czarnych taśm</span>
        </div>
      </header>
      <section className="aadisc-catalog" aria-label="Katalog albumów AA Records">
        {collections.map((album) => (
          <article className="aadisc-album" key={album.id}>
            <div className="aadisc-art">
              <img src={album.cover} alt={'Okładka związana z albumem ' + album.title} loading="lazy" decoding="async"/>
              <span className="aadisc-art-label"><Disc3 size={15}/> AA RECORDS</span>
            </div>
            <div className="aadisc-content">
              <span className="aadisc-category">{album.category}</span>
              <h2>{album.title}</h2>
              <p className="aadisc-subtitle">{album.subtitle}</p>
              <p>{album.description}</p>
              <p className="aadisc-status"><Headphones size={15}/> {album.status}</p>
              <div className="aadisc-actions">
                {album.id === 'after4am' &&
                  <button type="button" className="aadisc-primary" onClick={() => onNavigate('after4am')}>
                    <Music2 size={17}/> Otwórz odtwarzacz
                  </button>}
                <a href={album.sourceUrl} target="_blank" rel="noopener noreferrer" className={album.id === 'after4am' ? 'aadisc-secondary' : 'aadisc-primary'}>
                  <ArrowUpRight size={17}/> {album.sourceLabel}
                </a>
              </div>
              <details className="aadisc-tracks">
                <summary>Pokaż tracklistę ({album.tracks.length})</summary>
                <ol>{album.tracks.map((track) => <li key={track}>{track}</li>)}</ol>
              </details>
            </div>
          </article>
        ))}
      </section>
      <footer className="aadisc-community">
        <Sparkles size={29} aria-hidden="true"/>
        <h2>Masz własną historię do opowiedzenia?</h2>
        <p>Wspólne tworzenie AA Records zaczyna się od jednego pomysłu. Opisz klimat, tekst albo melodię — możesz przygotować zgłoszenie i wysłać je e-mailem.</p>
        <button type="button" onClick={() => onNavigate('collab')}><Heart size={16}/> Zaproponuj współpracę</button>
        <p className="aadisc-direct-contact">Kontakt: <a href="mailto:skyhusaria@gmail.com?subject=AA%20Records%20-%20wspolpraca">skyhusaria@gmail.com</a></p>
        <small>Nie publikujemy przesłanych materiałów bez uzgodnienia z autorem. Formularz nie wysyła nic automatycznie.</small>
      </footer>
    </main>
  );
}

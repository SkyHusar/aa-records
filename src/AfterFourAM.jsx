/* eslint-disable react/prop-types */
import { Disc3, Play, ArrowLeft, Headphones } from 'lucide-react';
import './after4am.css';
export default function After4AM({ tracks, ready, onPlay, onNavigate }) {
 return <main className="aa4am">
   <section className="aa4am-hero">
     <div className="aa4am-hero-copy">
       <button type="button" className="aa4am-back" onClick={() => onNavigate('discover')}><ArrowLeft size={15}/> Wróć do AA Records</button>
       <span className="aa4am-eyebrow">AA RECORDS / 2026 / NOWA KOLEKCJA</span>
       <h1>AFTER <em>4 AM</em></h1>
       <p>Światła miasta. Droga bez pośpiechu. Historie, które najlepiej brzmią po czwartej rano.</p>
       <button className="aa4am-play-all" type="button" disabled={!ready} onClick={() => onPlay(0)}><Play size={17} fill="currentColor"/> {ready ? 'Odtwórz kolekcję' : 'Audio czeka na import'}</button>
       <div className="aa4am-stats"><Disc3 size={16}/> {tracks.length} nowych utworów <span>·</span> MUSIC 4 LIFE</div>
     </div>
   </section>
   <section className="aa4am-list" aria-label="Lista utworów After 4 AM">
     {!ready && <p className="aa4am-import-note" role="status">Kolekcja jest przygotowana. Aby odtwarzać nagrania, zaimportuj paczkę After 4 AM do katalogu public/music i odśwież stronę. Dotychczasowe 28 utworów działa bez zmian.</p>}
     <div className="aa4am-head"><h2>Nasza nocna playlista</h2><span>{tracks.length} TRACKÓW</span></div>
     <div className="aa4am-grid">
       {tracks.map((track,index)=><article className="aa4am-track" key={track.file}>
         <div className="aa4am-cover"><img src={track.cover} alt="" loading="lazy"/><span>{String(index+1).padStart(2,'0')}</span></div>
         <div className="aa4am-track-meta"><h3>{track.title}</h3><p>{track.artist}</p></div>
         <span className="aa4am-duration">{track.duration}</span>
         <button type="button" disabled={!ready} onClick={() => onPlay(index)} aria-label={'Odtwórz '+track.title} className="aa4am-track-play"><Play size={17} fill="currentColor"/></button>
       </article>)}
     </div>
     <div className="aa4am-note"><Headphones size={18}/><p>Utwory odtwarzają się w stałym odtwarzaczu AA Records. Nie musisz zatrzymywać muzyki, przechodząc między podstronami.</p></div>
   </section>
 </main>;
}

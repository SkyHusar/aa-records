/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ArrowDown, BookOpen, CheckCircle2, FileText, Sparkles, WandSparkles } from 'lucide-react';
import ContactForm from './ContactForm';
import './forge-workbench.css';

const EMPTY = { title:'', artist:'', concept:'', style:'', language:'Polski', cover:'', pack:'' };

function composeForgeScript({brief,rapNames,hype,sunoPrompt,coverPacks}) {
  const title=brief.title.trim() || 'Roboczy tytuł';
  const alias=brief.artist.trim() || rapNames[0] || 'Autor projektu';
  const concept=brief.concept.trim() || 'Opisz pomysł i emocję utworu.';
  const style=brief.style.trim() || sunoPrompt.trim() || 'Określ gatunek, brzmienie i tempo.';
  const chosenCover=coverPacks.find(x=>x.title===brief.cover);
  const english = brief.language === 'English';
  const defaultVerse = english
    ? ['Streetlights flicker, I can hear the city breathe,','Another late-night story in the echoes underneath,','We write the next chapter on the pavement in the rain,','And turn the little moments into melodies again.']
    : ['Neon mruga, a na mieście budzi się kolejny świt,','Pod butami stary chodnik, w moich słuchawkach nowy bit,','Każda drobna opowieść niesie własny ciężar i blask,','Dziś zamieniam ją w melodię, żeby została wśród nas.'];
  const verse = hype?.verse?.length ? hype.verse.join('\n') : defaultVerse.join('\n');
  const hook = hype?.hook ? hype.hook.replace(/^Hook:\s*/i,'') : (english
    ? title+', turn the silence into sound,\nWe keep the sparks alive when the night comes down.'
    : title+', niech usłyszy nas ten świat,\nZapalimy małe światło, kiedy wokół gaśnie blask.');
  const secondVerse = english
    ? ['No perfect map can tell us where the road will go,','We keep a little fire even when the lights are low,','If tomorrow feels uncertain, let the rhythm be our guide,','One more song to let somebody know we stand beside.'].join('\n')
    : ['Nie mam mapy na to jutro, ale w kieszeni mam ten wers,','Podzielę się z tobą światłem, jeśli znowu zabraknie miejsc,','Przez osiedla i galaktyki płynie nasz nieśmiały głos,','Nawet zwykła mała chwila potrafi odmienić los.'].join('\n');
  const pieces=[
    'AA RECORDS / FORGE STUDIO 555 — PROJEKT AUTORA',
    'Tytuł: '+title,
    'Pseudonim: '+alias,
    'Język: '+brief.language,
    'Historia / pomysł: '+concept,
    '',
    '[STYLE / SUNO PROMPT]',
    style,
    '',
    '[INTRO]',
    english ? 'AA Records on the frequency, another story in the sky.' : 'AA Records na częstotliwości, jeszcze jedna noc i kolejny świt.',
    '',
    '[VERSE 1]',
    verse,
    '',
    '[CHORUS]',
    hook,
    '',
    '[VERSE 2]',
    secondVerse,
    '',
    '[OUTRO]',
    english ? 'One last light in the night. This is only the beginning.' : 'Ostatnie światło w tej nocy. A to dopiero początek.'
  ];
  if(hype?.sunoPrompt)pieces.push('','[ALTERNATYWNY PROMPT BEATU]',hype.sunoPrompt);
  if(chosenCover)pieces.push('','[POMYSŁ NA OKŁADKĘ]',chosenCover.prompt);
  if(brief.pack)pieces.push('','[WYBRANY PAKIET INSPIRACJI]',brief.pack);
  pieces.push('','[UWAGI DLA AA RECORDS]','Sprawdź rymy, dopracuj swoją historię i podpisz pomysł. Całość możesz edytować w formularzu.');
  return pieces.join('\n');
}

export default function ForgeWorkbench({rapNames,hype,sunoPrompt,coverPacks,selectedPack}) {
  const [brief,setBrief]=useState(EMPTY);
  const [draft,setDraft]=useState(null);
  const [info,setInfo]=useState('');
  const update=(key,value)=>setBrief(old=>({...old,[key]:value}));

  useEffect(()=>{
    if(!selectedPack?.revision)return;
    setBrief(old=>({...old,pack:selectedPack.name + ' — '+selectedPack.text}));
    setInfo('Dodano inspirację: '+selectedPack.name+'. Użyj „Przygotuj szkic”, aby przenieść ją do formularza.');
  },[selectedPack]);

  const build=()=>{
    const text=composeForgeScript({brief,rapNames,hype,sunoPrompt,coverPacks});
    if(text.length>3900){
      setInfo('Projekt jest długi — wybierz mniej sekcji lub skróć opis przed przekazaniem.');
      return;
    }
    setDraft(previous=>({version:(previous?.version??0)+1,text}));
    setInfo('Szkic gotowy! Jest w formularzu poniżej. Możesz go edytować przed wysłaniem.');
    document.getElementById('aa-forge-send')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  const clear=()=>{
    setBrief(EMPTY);
    setDraft(prev=>({version:(prev?.version??0)+1,text:''}));
    setInfo('Wyczyszczono roboczy projekt.');
  };
  return (
    <div id="aa-forge-workbench" className="aa-forge-workbench rounded-[2rem] border border-fuchsia-400/25 bg-[#080611]/95 p-5 md:p-7 shadow-[0_0_55px_rgba(217,70,239,0.10)]">
      <div className="flex flex-wrap justify-between gap-4 items-start">
        <div>
          <span className="text-[10px] font-black tracking-[0.24em] uppercase text-fuchsia-300">AA RECORDS · FORGE STUDIO 555</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight flex items-center gap-2"><WandSparkles size={23} className="text-fuchsia-300"/> Twój utwór. Twój pomysł.</h2>
          <p className="max-w-xl mt-3 text-zinc-300 text-sm leading-relaxed">Skorzystaj z generatorów powyżej, zbuduj szkic piosenki i wyślij go bezpośrednio do AA Records. Możesz go poprawić, zmienić tekst i dodać własną historię przed wysłaniem.</p>
        </div>
        <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-[10px] text-emerald-300 font-bold">Bez opłat • bez publikacji automatycznej</span>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mt-6">
        <label className="aa-forge-label">Tytuł utworu
          <input className="aa-collab-field mt-2" value={brief.title} maxLength={100} onChange={e=>update('title',e.target.value)} placeholder="np. Ostatni Neon"/>
        </label>
        <label className="aa-forge-label">Alias / pseudonim
          <input className="aa-collab-field mt-2" value={brief.artist} maxLength={90} onChange={e=>update('artist',e.target.value)} placeholder={rapNames[0]||'np. Neon Voyager'}/>
        </label>
        <label className="aa-forge-label">Język
          <select className="aa-collab-field mt-2" value={brief.language} onChange={e=>update('language',e.target.value)}>
            <option>Polski</option><option>English</option><option>Polski + English</option>
          </select>
        </label>
        <label className="aa-forge-label">Styl / tempo / klimat
          <input className="aa-collab-field mt-2" value={brief.style} maxLength={250} onChange={e=>update('style',e.target.value)} placeholder={sunoPrompt?'Wypełni się z Suno Generatora':'np. mroczny boom bap, 94 BPM'}/>
        </label>
        <label className="aa-forge-label md:col-span-2">O czym jest ta historia?
          <textarea className="aa-collab-field mt-2 min-h-24 resize-y" value={brief.concept} maxLength={600} onChange={e=>update('concept',e.target.value)} placeholder="Opowiedz, co chcesz przekazać słuchaczom..."/>
        </label>
        <label className="aa-forge-label md:col-span-2">Opcjonalny prompt do okładki
          <select className="aa-collab-field mt-2" value={brief.cover} onChange={e=>update('cover',e.target.value)}>
            <option value="">Bez promptu okładki</option>
            {coverPacks.map(x=><option key={x.title} value={x.title}>{x.title}</option>)}
          </select>
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-2 mt-5 text-xs text-zinc-300">
        <p className="aa-forge-signal"><CheckCircle2 size={15} className={rapNames.length?'text-emerald-300':'text-zinc-600'}/> Alias {rapNames.length?'gotowy':'opcjonalny'}</p>
        <p className="aa-forge-signal"><CheckCircle2 size={15} className={hype?'text-emerald-300':'text-zinc-600'}/> Wersy {hype?'gotowe':'opcjonalne'}</p>
        <p className="aa-forge-signal"><CheckCircle2 size={15} className={sunoPrompt?'text-emerald-300':'text-zinc-600'}/> Suno prompt {sunoPrompt?'gotowy':'opcjonalny'}</p>
      </div>
      {brief.pack && <p className="text-xs text-fuchsia-200 mt-3"><BookOpen size={14} className="inline mr-1"/> Pakiet inspiracji: {brief.pack}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="aa-forge-primary" onClick={build}><Sparkles size={17}/> Przygotuj szkic i wypełnij formularz <ArrowDown size={16}/></button>
        <button type="button" className="aa-forge-secondary" onClick={clear}>Wyczyść projekt</button>
      </div>
      <p aria-live="polite" className="text-xs text-fuchsia-200 min-h-5 mt-3">{info}</p>
      <div id="aa-forge-send" className="aa-forge-send mt-7 pt-7 border-t border-fuchsia-400/20">
        <h3 className="text-lg text-white font-black flex items-center gap-2"><FileText size={19} className="text-emerald-300"/> Podgląd tekstu i wysyłka</h3>
        <p className="text-xs text-zinc-400 mt-2 mb-5 leading-relaxed">Przed wysłaniem sprawdź szkic w polu „Opowiedz nam o swoim pomyśle”. To szablon do uzupełnienia, a nie automatycznie ukończony tekst piosenki. Formularz wyśle dokładnie tę treść, którą pozostawisz w polu.</p>
        <ContactForm forgeDraft={draft}/>
      </div>
    </div>
  );
}

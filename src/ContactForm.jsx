import { useState } from 'react';
import { CheckCircle2, ExternalLink, Mail, Send, ShieldCheck } from 'lucide-react';
import './contact-form.css';

const CONTACT_EMAIL = 'skyhusaria@gmail.com';
const ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;
const TYPES = ['Demo / własny utwór','Wspólna piosenka','Produkcja / beat','Wizualizacje / teledysk','Inny pomysł'];
const initial = {name:'',email:'',type:TYPES[0],demo:'',message:'',consent:false,honey:''};

export default function ContactForm() {
  const [data,setData] = useState(initial);
  const [status,setStatus] = useState('idle');
  const [error,setError] = useState('');
  const update = (key,value) => {
    setData(old=>({...old,[key]:value}));
    if (status==='error') setStatus('idle');
  };
  const send = async (event) => {
    event.preventDefault();
    if(status==='sending'||status==='success')return;
    if(!data.consent||data.message.trim().length<12){
      setError('Wpisz wiadomość (minimum 12 znaków) i zaakceptuj przekazanie danych do usługi formularza.');
      setStatus('error');return;
    }
    if(data.honey.trim())return;
    setStatus('sending');setError('');
    try {
      const payload = {
        name:data.name.trim(),
        email:data.email.trim(),
        category:data.type,
        demo_link:data.demo.trim()||'brak',
        message:data.message.trim(),
        _subject:'AA Records · nowe zgłoszenie: '+data.type,
        _template:'table',
        _honey:data.honey,
        _url:'https://aa-records.vercel.app/'
      };
      const response=await fetch(ENDPOINT,{
        method:'POST',
        headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify(payload)
      });
      const result=await response.json().catch(()=>null);
      const accepted=result?.success===true||result?.success==='true';
      if(!response.ok||!accepted)throw Error('FormSubmit rejected request');
      setStatus('success');
    }catch{
      setStatus('error');
      setError('Nie udało się przekazać zgłoszenia. Spróbuj ponownie albo skorzystaj ze zwykłego e-maila.');
    }
  };
  const body=['Cześć AA Records!','','Imię / pseudonim: '+data.name,'E-mail: '+data.email,'Rodzaj współpracy: '+data.type,'Link do demo: '+data.demo,'',data.message].join('\n');
  const fallback='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('AA Records — propozycja współpracy')+'&body='+encodeURIComponent(body);
  return (
    <form onSubmit={send} className="space-y-4" aria-label="Formularz współpracy z AA Records">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[11px] text-emerald-200 font-black uppercase tracking-[0.18em]">Wyślij zgłoszenie</span>
        <span className="text-[10px] text-zinc-500">Bez otwierania aplikacji pocztowej</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block text-xs text-zinc-200 font-semibold">Imię lub pseudonim *
          <input className="aa-collab-field mt-2" name="name" autoComplete="name" required minLength={2} maxLength={90}
            value={data.name} onChange={e=>update('name',e.target.value)} placeholder="Jak mamy się do Ciebie zwracać?"/>
        </label>
        <label className="block text-xs text-zinc-200 font-semibold">E-mail kontaktowy *
          <input className="aa-collab-field mt-2" name="email" type="email" autoComplete="email" required maxLength={200}
            value={data.email} onChange={e=>update('email',e.target.value)} placeholder="twoj@email.com"/>
        </label>
      </div>
      <label className="block text-xs text-zinc-200 font-semibold">Co chcesz stworzyć?
        <select className="aa-collab-field mt-2" name="category" value={data.type} onChange={e=>update('type',e.target.value)}>
          {TYPES.map(t=><option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-xs text-zinc-200 font-semibold">Link do demo (opcjonalnie)
        <input className="aa-collab-field mt-2" name="demo" type="url" maxLength={500} value={data.demo}
          onChange={e=>update('demo',e.target.value)} placeholder="https://suno.com/song/..."/>
      </label>
      <label className="block text-xs text-zinc-200 font-semibold">Opowiedz nam o swoim pomyśle *
        <textarea className="aa-collab-field mt-2 min-h-32 resize-y" name="message" minLength={12} maxLength={4000}
          required value={data.message} onChange={e=>update('message',e.target.value)}
          placeholder="Jaki styl, jaka historia, co możemy razem nagrać?"/>
      </label>
      <div className="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
        <label>Leave this blank <input type="text" tabIndex={-1} autoComplete="off" value={data.honey} onChange={e=>update('honey',e.target.value)}/></label>
      </div>
      <label className="flex items-start gap-3 text-[11px] text-zinc-400 leading-relaxed cursor-pointer">
        <input type="checkbox" required checked={data.consent} onChange={e=>update('consent',e.target.checked)}
          className="mt-0.5 accent-emerald-400 flex-shrink-0"/>
        <span>Zgadzam się na przekazanie mojego imienia, e-maila i treści wiadomości do usługi FormSubmit w celu dostarczenia zgłoszenia do AA Records. Nie przesyłaj danych wrażliwych.</span>
      </label>
      {status==='success'&&<p role="status" className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200 flex gap-2">
        <CheckCircle2 size={18} className="flex-shrink-0"/> Zgłoszenie przyjęte przez usługę formularza! Dostarczenie na skrzynkę może wymagać jednorazowej aktywacji adresu AA Records.
      </p>}
      {status==='error'&&<p role="alert" className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
      <button type="submit" disabled={status==='sending'||status==='success'}
        className="w-full flex justify-center items-center gap-3 rounded-xl px-5 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-black text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {status==='sending'?'Wysyłanie…':status==='success'?'Zgłoszenie przyjęte':'Wyślij do AA Records'} <Send size={17}/>
      </button>
      <p className="flex items-start gap-2 text-[11px] text-zinc-400 leading-relaxed">
        <ShieldCheck size={16} className="text-emerald-300 flex-shrink-0"/>
        Formularz obsługuje zewnętrzny serwis FormSubmit. Przy pierwszym użyciu właściciel skrzynki musi zatwierdzić adres odbiorcy.
      </p>
      <p className="text-xs text-zinc-400 leading-relaxed">
        Wolisz zwykły e-mail? <a className="text-emerald-200 underline underline-offset-4 hover:text-white" href={fallback}>
          Napisz na {CONTACT_EMAIL} <ExternalLink size={12} className="inline"/>
        </a>
      </p>
      <p className="text-[10px] text-zinc-500 flex items-center gap-2"><Mail size={13}/> Wiadomości nie są publikowane automatycznie.</p>
    </form>
  );
}

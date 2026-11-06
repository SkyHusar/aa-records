/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, X, Play, ArrowRight } from 'lucide-react';
import './aa-intro.css';

const VIDEO_URL = '/videos/aa-universe-remembers-us.mp4';
const POSTER_URL = '/covers/aa-intro-poster.webp';

export default function AAIntro({ onClose, onEnableSound }) {
  const videoRef = useRef(null);
  const skipRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    skipRef.current?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const playPromise = video?.play();
    playPromise?.then(() => setStarted(true)).catch(() => setAutoplayBlocked(true));
    return () => {
      video?.pause();
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const enableSound = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!soundOn) {
      onEnableSound?.();
      v.muted = false;
      setSoundOn(true);
    } else {
      v.muted = true;
      setSoundOn(false);
    }
    if (v.paused) v.play().then(() => setStarted(true)).catch(() => setAutoplayBlocked(true));
  };

  const playFromStart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => { setAutoplayBlocked(false); setStarted(true); }).catch(() => setAutoplayBlocked(true));
    }
  };

  return (
    <div className="aacin" role="dialog" aria-modal="true" aria-label="Filmowe intro AA Records">
      <video
        ref={videoRef} className="aacin-video" src={VIDEO_URL} poster={POSTER_URL}
        autoPlay muted playsInline preload="auto"
        onTimeUpdate={(e) => setProgress((e.currentTarget.currentTime / (e.currentTarget.duration || 30)) * 100)}
        onEnded={onClose} onError={onClose}
        aria-label="AA Records: The Universe Remembers Us"
      />
      <div className="aacin-vignette" aria-hidden="true" />
      <div className="aacin-top">
        <span className="aacin-brand">AA RECORDS <small>INFINITE ALLIANCE 555</small></span>
        <button ref={skipRef} type="button" className="aacin-skip" onClick={onClose}>Pomiń intro <X size={18} /></button>
      </div>
      <div className="aacin-bottom">
        <div className="aacin-bottom-copy">
          <span>AA RECORDS / CINEMATIC EXPERIENCE</span>
          <h2>THE UNIVERSE <em>REMEMBERS US</em></h2>
          <p>Music 4 Life · Nocne historie · Nasz świat</p>
        </div>
        <div className="aacin-controls">
          {autoplayBlocked && <button type="button" className="aacin-control" onClick={playFromStart}><Play size={16}/> Uruchom film</button>}
          {!autoplayBlocked && <button type="button" className="aacin-control" onClick={enableSound}>{soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>} {soundOn ? 'Wycisz' : 'Włącz muzykę #15'}</button>}
          <button type="button" className="aacin-enter" onClick={onClose}>Wejdź do AA Records <ArrowRight size={16}/></button>
        </div>
      </div>
      <div className="aacin-progress" aria-hidden="true"><span style={{ width: (started ? progress : 0) + '%' }} /></div>
    </div>
  );
}

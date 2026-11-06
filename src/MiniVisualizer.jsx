/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import './mini-visualizer.css';

export default function MiniVisualizer({ analyserRef, isPlaying, onOpen }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    let frame = 0;
    let raf = 0;
    const update = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = canvas.clientWidth || 120;
      const h = canvas.clientHeight || 36;
      if (canvas.width !== Math.floor(w*ratio) || canvas.height !== Math.floor(h*ratio)) {
        canvas.width = Math.floor(w*ratio);
        canvas.height = Math.floor(h*ratio);
        ctx.setTransform(ratio,0,0,ratio,0,0);
      }
      ctx.clearRect(0,0,w,h);
      const analyser = analyserRef.current;
      const bins = 45;
      let data;
      if (isPlaying && analyser) {
        data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
      }
      const gap=2;
      const bw=Math.max(1,(w-(bins-1)*gap)/bins);
      for (let i=0;i<bins;i++) {
        const index = data ? Math.min(data.length-1,Math.round((i/bins)**1.45*data.length*.72)) : i;
        const value = data ? data[index]/255 : (Math.sin(i*.3+frame*.015)+1)*.075+.06;
        const strength = Math.max(.055,value);
        const height=Math.max(2,strength*(h-2));
        const gradient=ctx.createLinearGradient(0,0,w,0);
        gradient.addColorStop(0,'#ed6bf0');
        gradient.addColorStop(.5,'#a93cff');
        gradient.addColorStop(1,'#49f0ed');
        ctx.fillStyle=gradient;
        ctx.fillRect(i*(bw+gap),(h-height)/2,bw,height);
      }
      frame++;
      raf = requestAnimationFrame(update);
    };
    update();
    return ()=>cancelAnimationFrame(raf);
  },[analyserRef,isPlaying]);
  return <button type="button" className="aa-mini-visualizer" onClick={onOpen} aria-label="Otwórz Wizjonarium — wizualizacje muzyczne" title="Wizjonarium 555"><canvas ref={canvasRef} aria-hidden="true" /></button>;
}

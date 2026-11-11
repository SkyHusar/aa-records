import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { after4amTracks } from '../src/after4am.js';

const root=path.resolve(import.meta.dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const exists=(p)=>fs.existsSync(path.join(root,p));
const optimized=[
'manifesto_pov.webp','manifesto_union.webp',
'covers/aditi.webp','covers/ziomalesojuszu.webp',
'covers/terrainfinita.webp','covers/blackknight.webp',
'covers/dymnabetonie.webp','covers/fireintoform.webp'
];
for(const item of optimized) {
  assert.ok(exists('public/'+item), 'missing optimized '+item);
  assert.ok(fs.statSync(path.join(root,'public',item)).size < 1024*1024,'large '+item);
}
assert.equal(after4amTracks.length,22);
for(const track of after4amTracks) assert.ok(exists('public/music/'+track.file),'missing MP3 '+track.file);
const app=read('src/App.jsx');
assert.ok(app.includes("Object.fromEntries(after4amTracks.map"), 'build-time manifest missing');
assert.ok(!app.includes("Promise.all(after4amTracks.map"), 'extra startup HEAD requests remain');
assert.ok(app.includes("if (!canPlayTrack(playlistType, targetTrack)) return;"));
assert.ok(app.includes("setVizMode('stars')"));
assert.ok(app.includes("currentView === 'catalog'"));
const catalog=read('src/Discography.jsx');
for(const url of [
'https://suno.com/playlist/a55de4f5-c428-410f-8faa-0261f86932ef',
'https://suno.com/playlist/a6cce258-5606-4407-81c6-c824460c45c4'
])assert.ok(catalog.includes(url));
const html=read('index.html');
for(const field of ['og-aa-records.jpg','og:image:width','twitter:card','description','rel="canonical"'])assert.ok(html.includes(field));
assert.ok(exists('public/og-aa-records.jpg'));
assert.ok(read('public/robots.txt').includes('/sitemap.xml'));
assert.ok(read('public/sitemap.xml').includes('https://aa-records.vercel.app/'));
console.log('EXPERIENCE PASS: 22 independent audio items, 8 optimized assets, 3 collections, galaxy mode, SEO.');

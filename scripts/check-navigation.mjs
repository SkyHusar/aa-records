import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const app=fs.readFileSync(path.join(root,'src/App.jsx'),'utf8');
const fragment=(from,to)=>app.slice(app.indexOf(from),app.indexOf(to));

const album=fragment('{/* --- ALBUM VIEW: ONLY OUR RECORD --- */}','{/* --- ADITI EP VIEW');
assert.ok(album.includes("albumTracks.map((track, index)"),'Missing 11-track render');
assert.ok(album.includes('Odtwórz płytę'),'Missing album play control');
assert.ok(album.includes('Kopiuj link do'),'Missing per-track share link');
for(const stale of ['Custom Track Lab','Featured Transmissions','Codex Kitchen','Buchon 555 Arcade','Open Forge Tools','Zamów custom track','Mini Lore Timeline']) {
  assert.ok(!album.includes(stale), 'Unexpected additional content in album: '+stale);
}
assert.ok(app.includes("create: [],"),'Extra creative subtabs remain');
assert.ok(app.includes("activeMainSection !== 'create'") || app.includes('activeMainSection !== "create"'),'Create subnav not hidden');
assert.ok(app.includes("view === 'create' || view === 'collab' ? 'tools' : view"),'Old create route not redirected to single studio');
assert.ok(app.includes("onClick={() => navigateTo(id)}"),'Main navigation not using route normalization');
assert.ok(app.includes("onNavigate={navigateTo}"),'Landing buttons bypass forge redirection');
assert.ok(!app.includes("['mission', 'create', 'services'].includes(currentView)"),'Duplicated Create landing still accessible');
assert.ok(app.includes("mission: ['mission', 'manifesto', 'base']"),'Misja route modified');
assert.ok(app.includes("id: 'mission', label: 'Misja'"),'Misja tab removed');
assert.ok(app.includes('Buchon 555 Arcade'),'Arcade must remain on Forge');
assert.ok(app.includes('<ForgeWorkbench'),'Forge integration must remain');
assert.ok(!app.includes('showConfetti'),'Album-only confetti should be gone');
console.log('NAVIGATION PASS: one Forge entry, Misja preserved, Płyta is only 11 playable tracks');

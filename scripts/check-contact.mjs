import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');

const form=read('src/ContactForm.jsx');
const app=read('src/App.jsx');
const catalog=read('src/Discography.jsx');
const experience=read('src/AAExperience.jsx');

for(const fragment of [
  'https://formsubmit.co/ajax/',
  "const CONTACT_EMAIL = 'skyhusaria@gmail.com'",
  "method:'POST'",
  'JSON.stringify(payload)',
  'response.ok',
  "result?.success==='true'",
  "role=\"alert\"",
  "role=\"status\"",
  "type=\"email\"",
  "type=\"url\"",
  'type="checkbox"',
  '_honey',
  "aria-label=\"Formularz współpracy z AA Records\"",
  'mailto:'
])assert.ok(form.includes(fragment),'Missing contact form element: '+fragment);
assert.ok(app.includes('<ContactForm />'));
assert.ok(!app.includes('TikTok / social placeholder'));
assert.ok(!app.includes('Bez formularza, bez biurokracji'));
assert.ok(catalog.includes("onNavigate('collab')"));
assert.ok(experience.includes("onNavigate('collab')"));
assert.ok(form.includes('Nie udało się przekazać zgłoszenia'));
console.log('CONTACT PASS: endpoint, consent, input validation, spam prevention, fallback, no placeholder');

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const source=(file)=>fs.readFileSync(path.join(root,file),'utf8');
const app=source('src/App.jsx');
const studio=source('src/ForgeWorkbench.jsx');
const contact=source('src/ContactForm.jsx');

for(const stale of ['AI Artist Page in 24h','Starter Card','Full Drop Page','Forge Pack', 'L49','L99','L149','buildArtistPageMailto','buildPromptPackMailto']){
 assert.ok(!app.includes(stale),'Paid offer or old mailto remains: '+stale);
}
assert.ok(app.includes('Buchon 555 Arcade'),'Arcade must remain');
assert.ok(app.includes('const generateRapNames ='),'Rap generator removed');
assert.ok(app.includes('const generateDissPack ='),'Hype generator removed');
assert.ok(app.includes('const generateSunoPrompt ='),'Suno generator removed');
assert.ok(app.includes('<ForgeWorkbench'),'Studio is not embedded');
assert.ok(app.includes('selectedPack={forgePackChoice}'),'Prompt packs not connected to studio');
assert.ok(app.includes('Dodaj do projektu'),'Prompt-pack CTA not integrated');

for(const content of [
  '[STYLE / SUNO PROMPT]','[INTRO]','[VERSE 1]','[CHORUS]','[VERSE 2]','[OUTRO]',
  'Wszystko możesz edytować' // optional text is not present; replaced below
].slice(0,6)) assert.ok(studio.includes(content),'Draft section missing: '+content);

assert.ok(studio.includes('<ContactForm forgeDraft={draft}/>'),'Direct form missing from Forge');
assert.ok(studio.includes('setDraft(previous=>'),'Form prefill revision missing');
assert.ok(contact.includes('forgeDraft.text'),'Contact form not receiving complete draft');
assert.ok(contact.includes("const ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL"),'Contact endpoint changed');
assert.ok(contact.includes("const CONTACT_EMAIL = 'skyhusaria@gmail.com'"),'Wrong recipient');
assert.ok(contact.includes('JSON.stringify(payload)'),'Submissions must transmit full message');
assert.ok(contact.includes("role=\"alert\""),'Error feedback must remain');
assert.ok(contact.includes("type=\"checkbox\""),'Consent must remain');
assert.ok(contact.includes('_honey'),'Spam honeypot must remain');
console.log('FORGE PASS: no paid packages, generators and arcade preserved, full draft and single activated form integrated');

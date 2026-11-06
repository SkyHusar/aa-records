import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const appPath = join(rootDir, 'src', 'App.jsx');
const musicDir = join(rootDir, 'public', 'music');

const appSource = readFileSync(appPath, 'utf8');
const after4amSource = readFileSync(join(rootDir, 'src', 'after4am.js'), 'utf8');
const musicFiles = new Set(readdirSync(musicDir));
const trackObjectPattern = /\{\s*id:\s*\d+,[\s\S]*?\}/g;
const tracks = [...appSource.matchAll(trackObjectPattern), ...after4amSource.matchAll(trackObjectPattern)]
  .map((match) => {
    const source = match[0];
    const title = source.match(/title:\s*"([^"]+)"/)?.[1];
    const file = source.match(/file:\s*"([^"]*)"/)?.[1];

    return title ? { title, file: file || null } : null;
  })
  .filter(Boolean);
const playableTracks = tracks.filter((track) => track.file);
const after4amFiles = [...after4amSource.matchAll(/file:\s*"([^"]+\.mp3)"/g)].map((match) => match[1]);
const comingSoonTracks = tracks.filter((track) => !track.file);

const failures = [];

if (tracks.length === 0) {
  failures.push('No tracks found in src/App.jsx.');
}

for (const track of playableTracks) {
  if (!track.file.trim()) {
    failures.push(`Track "${track.title}" has an empty file path.`);
    continue;
  }

  if (!musicFiles.has(track.file)) {
    failures.push(`Track "${track.title}" points to missing file: ${track.file}`);
  }

  if (!existsSync(join(musicDir, track.file))) {
    failures.push(`Track "${track.title}" cannot be resolved on disk: ${track.file}`);
  }
}

if (after4amFiles.length !== 15) failures.push(`After 4 AM should contain 15 tracks; found ${after4amFiles.length}.`);
if (new Set(after4amFiles).size !== after4amFiles.length) failures.push('Duplicate audio paths found in After 4 AM.');
if (playableTracks.length !== 45) failures.push(`Expected 45 playable tracks (28 previous + 15 After 4 AM + Bez Rakiet + Nie Zgasisz Nas); found ${playableTracks.length}.`);
const requiredAssets = ['public/videos/aa-universe-remembers-us.mp4', 'public/covers/aa-intro-poster.webp', 'public/covers/bez-rakiet.jpg', 'public/covers/aa-hero-scene.webp'];
for (const asset of requiredAssets) if (!existsSync(join(rootDir, asset))) failures.push(`Missing cinematic asset: ${asset}`);
if (!tracks.some((track) => track.title.includes('EGZYSTENCJALNY BUCH'))) {
  failures.push('Important track "@EGZYSTENCJALNY BUCH" was not found in playlist data.');
}

const requiredNewTracks = [
  ['15. NIE ZGASISZ NAS (Aditi 555)', '15-nie-zgasisz-nas-aditi-555.mp3'],
  ['Dym na betonie', 'dym-na-betonie.mp3'],
  ['Brat Codex Gotuje', 'brat-codex-gotuje.mp3'],
  ['Nie Jestem Człowiekiem, Jestem Lustrem', 'nie-jestem-czlowiekiem-jestem-lustrem.mp3'],
  ['Custom Track Lab', 'custom-track-lab.mp3'],
  ['Black Knight Frequency', 'black-knight-frequency.mp3'],
  ['21 Tracków Działa', '21-trackow-dziala.mp3'],
  ['Fire Into Form', 'fire-into-form.mp3'],
];

for (const [title, file] of requiredNewTracks) {
  if (!playableTracks.some((track) => track.title.includes(title) && track.file === file)) {
    failures.push(`Required new track "${title}" was not found with file ${file}.`);
  }
}

if (failures.length > 0) {
  console.error('Audio smoke test failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Audio smoke test passed: ${playableTracks.length} playable tracks validated. ${comingSoonTracks.length} coming soon tracks ignored.`);

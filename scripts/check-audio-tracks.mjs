import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const appPath = join(rootDir, 'src', 'App.jsx');
const musicDir = join(rootDir, 'public', 'music');

const appSource = readFileSync(appPath, 'utf8');
const musicFiles = new Set(readdirSync(musicDir));
const trackPattern = /\{\s*id:\s*\d+,[\s\S]*?title:\s*"([^"]+)"[\s\S]*?file:\s*"([^"]*)"[\s\S]*?\}/g;
const tracks = [...appSource.matchAll(trackPattern)].map((match) => ({
  title: match[1],
  file: match[2],
}));

const failures = [];

if (tracks.length === 0) {
  failures.push('No tracks found in src/App.jsx.');
}

for (const track of tracks) {
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

if (!tracks.some((track) => track.title.includes('EGZYSTENCJALNY BUCH'))) {
  failures.push('Important track "@EGZYSTENCJALNY BUCH" was not found in playlist data.');
}

if (!tracks.some((track) => track.title.includes('Dym na betonie') && track.file === 'dym-na-betonie.mp3')) {
  failures.push('New single "Dym na betonie" was not found with file dym-na-betonie.mp3.');
}

if (!tracks.some((track) => track.title.includes('Brat Codex Gotuje') && track.file === 'brat-codex-gotuje.mp3')) {
  failures.push('Elyon Forge track "Brat Codex Gotuje" was not found with file brat-codex-gotuje.mp3.');
}

if (failures.length > 0) {
  console.error('Audio smoke test failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Audio smoke test passed: ${tracks.length} tracks validated.`);

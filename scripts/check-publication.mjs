import { execFileSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

// New PDF paths require an explicit publication review before expanding this list.
const approved = new Set(['public/resume.pdf']);
const entries = execFileSync('git', ['ls-files', '--stage', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean).map(entry => {
  const tab = entry.indexOf('\t');
  return { file: entry.slice(tab + 1), sha: entry.slice(0, tab).split(' ')[1] };
});
const sensitiveBlobs = new Set(['e477245b1e7934632016958a97db204cba4f1182']);
for (const { file, sha } of entries) assert.ok(!sensitiveBlobs.has(sha), `Known sensitive source blob must not be tracked: ${file}`);
const tracked = entries.map(entry => entry.file);
for (const file of tracked) {
  assert.ok(!file.toLowerCase().endsWith('.pdf') || approved.has(file), `Unreviewed tracked PDF: ${file}`);
}
async function inspect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.posix.join(dir, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Review public symlink before publication: ${file}`);
    if (entry.isDirectory()) await inspect(file);
    else assert.ok(!file.toLowerCase().endsWith('.pdf') || approved.has(file), `Unreviewed public PDF: ${file}`);
  }
}
await inspect('public');
assert.ok(tracked.includes('public/resume.pdf'), 'Reviewed resume must remain tracked');
console.log('Publication check passed: only the reviewed redacted PDF is tracked or eligible as a public PDF asset. Git history is outside this check.');

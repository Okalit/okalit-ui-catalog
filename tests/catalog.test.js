import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const registry = JSON.parse(readFileSync(path.join(root, 'registry.json'), 'utf8'));

test('each catalog component is independently installable', () => {
  assert.equal(Object.keys(registry.components).length, 39);
  for (const [name, entry] of Object.entries(registry.components)) {
    assert.match(name, /^ok-ui-[a-z-]+$/);
    assert.equal(entry.path, `components/${name}`);
    assert.deepEqual(entry.files, [`${name}.js`, `${name}.css`]);
    for (const file of entry.files) {
      const location = path.resolve(root, entry.path, file);
      assert.ok(location.startsWith(path.resolve(root, 'components') + path.sep));
      assert.ok(existsSync(location), `${name}: missing ${file}`);
    }
    const source = readFileSync(path.resolve(root, entry.path, `${name}.js`), 'utf8');
    assert.ok(source.includes(`./${name}.css?inline`), `${name}: missing standalone stylesheet`);
    assert.deepEqual(entry.dependencies, []);
  }
});
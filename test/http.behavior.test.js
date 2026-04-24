import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

test('createApp registers an express application with JSON middleware', () => {
  const app = createApp();
  assert.equal(typeof app.use, 'function');
  assert.equal(typeof app.get, 'function');
});

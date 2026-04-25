import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { closeDatabasePool, createApp } from '../src/app.js';

after(async () => {
  await closeDatabasePool();
});

test('app returns health response', async () => {
  const body = await requestJson('/healthz');
  assert.equal(body.status, 'ok');
});

test('app includes pod name in api response', async () => {
  const body = await requestJson('/');
  assert.equal(typeof body.podName, 'string');
});

test('app returns work response', async () => {
  const body = await requestJson('/work');
  assert.equal(body.status, 'worked');
  assert.equal(typeof body.podName, 'string');
});

test('app returns not found for unknown path', async () => {
  const result = await requestJson('/missing', true);
  assert.equal(result.statusCode, 404);
  assert.equal(result.body.error, 'Not found');
});

function requestJson(path, includeStatus = false) {
  const app = createApp();
  const chunks = [];

  const request = {
    method: 'GET',
    url: path,
    headers: {},
  };

  const response = {
    statusCode: 200,
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    getHeader(name) {
      return this.headers[name.toLowerCase()];
    },
    removeHeader(name) {
      delete this.headers[name.toLowerCase()];
    },
    writeHead(statusCode) {
      this.statusCode = statusCode;
    },
    write(chunk) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk.toString('utf8') : chunk);
    },
    end(chunk = '') {
      if (chunk) {
        this.write(chunk);
      }
      this.finished = true;
      this.emitFinish();
    },
    on() {},
    once(event, callback) {
      if (event === 'finish') {
        this.finishCallback = callback;
      }
    },
    emitFinish() {
      if (this.finishCallback) {
        this.finishCallback();
      }
    },
  };

  return new Promise((resolve, reject) => {
    response.once('finish', () => {
      try {
        const body = JSON.parse(chunks.join(''));

        if (includeStatus) {
          resolve({ statusCode: response.statusCode, body });
          return;
        }

        resolve(body);
      } catch (error) {
        reject(error);
      }
    });

    app.handle(request, response, reject);
  });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { createApp } from '../src/app.js';
import { initializeSchema } from '../src/db/schema.js';
import { pool } from '../src/db/pool.js';

const integrationEnabled = process.env.RUN_INTEGRATION_TESTS === '1';

test('integration tests are opt-in when PostgreSQL is available', { skip: integrationEnabled }, () => {
  assert.equal(process.env.RUN_INTEGRATION_TESTS, undefined);
});

test(
  'creates and reads a member through the HTTP API',
  { skip: !integrationEnabled },
  async (t) => {
    await initializeSchema();

    const app = createApp();
    const server = http.createServer(app);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');

    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    t.after(async () => {
      server.close();
      await pool.query('DELETE FROM claims');
      await pool.query('DELETE FROM hospitals');
      await pool.query('DELETE FROM members');
      await pool.end();
    });

    const createResponse = await fetch(`${baseUrl}/api/members`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        member_number: 'MBR-INT-1001',
        first_name: 'Integration',
        last_name: 'User',
        status: 'active',
      }),
    });

    assert.equal(createResponse.status, 201);
    const createdPayload = await createResponse.json();
    assert.equal(createdPayload.data.member_number, 'MBR-INT-1001');

    const readResponse = await fetch(`${baseUrl}/api/members/${createdPayload.data.id}`);
    assert.equal(readResponse.status, 200);
    const readPayload = await readResponse.json();
    assert.equal(readPayload.data.first_name, 'Integration');
  }
);

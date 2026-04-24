import test from 'node:test';
import assert from 'node:assert/strict';
import { HttpError } from '../src/http/errors.js';
import {
  validateMember,
  validateHospital,
  validateClaim,
  validateListQuery,
} from '../src/http/validators.js';

test('validateMember rejects missing required identifiers', () => {
  assert.throws(
    () => validateMember({ first_name: 'Ada', last_name: 'Lovelace' }),
    (error) =>
      error instanceof HttpError &&
      error.statusCode === 400 &&
      error.message === 'Missing required field: member_number'
  );
});

test('validateHospital accepts a minimal valid payload', () => {
  assert.doesNotThrow(() =>
    validateHospital({
      provider_code: 'HSP-1001',
      name: 'General Hospital',
      status: 'active',
    })
  );
});

test('validateClaim requires updated_by during updates', () => {
  assert.throws(
    () => validateClaim({ status: 'approved' }, { partial: true }),
    (error) =>
      error instanceof HttpError &&
      error.statusCode === 400 &&
      error.message === 'Missing required field: updated_by'
  );
});

test('validateClaim rejects negative amounts', () => {
  assert.throws(
    () =>
      validateClaim({
        claim_number: 'CLM-1',
        member_id: '00000000-0000-0000-0000-000000000001',
        hospital_id: '00000000-0000-0000-0000-000000000002',
        service_date: '2026-04-24',
        amount: -1,
        currency: 'USD',
        created_by: 'system',
        updated_by: 'system',
      }),
    (error) =>
      error instanceof HttpError &&
      error.statusCode === 400 &&
      error.message === 'Invalid numeric value for amount'
  );
});

test('validateListQuery rejects invalid pagination', () => {
  assert.throws(
    () => validateListQuery({ limit: 0, offset: -1 }),
    (error) =>
      error instanceof HttpError &&
      error.statusCode === 400 &&
      error.message === 'Invalid numeric value for limit'
  );
});

test('validateListQuery accepts positive limit and zero offset', () => {
  assert.doesNotThrow(() => validateListQuery({ limit: 20, offset: 0 }));
});

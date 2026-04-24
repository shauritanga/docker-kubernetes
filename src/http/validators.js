import { HttpError } from './errors.js';

const memberStatuses = new Set(['active', 'inactive']);
const hospitalStatuses = new Set(['active', 'inactive']);
const claimStatuses = new Set(['submitted', 'approved', 'rejected', 'paid']);

function assertRequired(value, field) {
  if (value === undefined || value === null || value === '') {
    throw new HttpError(400, `Missing required field: ${field}`);
  }
}

function assertEnum(value, field, allowed) {
  if (value !== undefined && !allowed.has(value)) {
    throw new HttpError(400, `Invalid value for ${field}`, {
      allowed: Array.from(allowed),
      received: value,
    });
  }
}

function assertDate(value, field) {
  if (value !== undefined && Number.isNaN(Date.parse(value))) {
    throw new HttpError(400, `Invalid date for ${field}`);
  }
}

function assertNonNegativeNumber(value, field) {
  if (value !== undefined && (!Number.isFinite(Number(value)) || Number(value) < 0)) {
    throw new HttpError(400, `Invalid numeric value for ${field}`);
  }
}

function assertPositiveInteger(value, field) {
  if (!Number.isInteger(value) || value < 1) {
    throw new HttpError(400, `Invalid numeric value for ${field}`);
  }
}

export function validateMember(payload, { partial = false } = {}) {
  if (!partial) {
    assertRequired(payload.member_number, 'member_number');
    assertRequired(payload.first_name, 'first_name');
    assertRequired(payload.last_name, 'last_name');
  }

  assertEnum(payload.status, 'status', memberStatuses);
  assertDate(payload.date_of_birth, 'date_of_birth');
}

export function validateHospital(payload, { partial = false } = {}) {
  if (!partial) {
    assertRequired(payload.provider_code, 'provider_code');
    assertRequired(payload.name, 'name');
  }

  assertEnum(payload.status, 'status', hospitalStatuses);
}

export function validateClaim(payload, { partial = false } = {}) {
  if (!partial) {
    assertRequired(payload.claim_number, 'claim_number');
    assertRequired(payload.member_id, 'member_id');
    assertRequired(payload.hospital_id, 'hospital_id');
    assertRequired(payload.service_date, 'service_date');
    assertRequired(payload.amount, 'amount');
    assertRequired(payload.currency, 'currency');
    assertRequired(payload.created_by, 'created_by');
    assertRequired(payload.updated_by, 'updated_by');
  }
  if (partial) {
    assertRequired(payload.updated_by, 'updated_by');
  }

  assertDate(payload.service_date, 'service_date');
  assertEnum(payload.status, 'status', claimStatuses);
  assertNonNegativeNumber(payload.amount, 'amount');
}

export function validateListQuery({ limit, offset }) {
  assertPositiveInteger(limit, 'limit');
  if (!Number.isInteger(offset) || offset < 0) {
    throw new HttpError(400, 'Invalid numeric value for offset');
  }
}

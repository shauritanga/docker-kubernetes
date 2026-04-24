import { createRecord, findById, listRecords, updateRecord } from '../db/repository.js';
import { HttpError } from './errors.js';
import {
  validateMember,
  validateHospital,
  validateClaim,
  validateListQuery,
} from './validators.js';

const definitions = {
  members: {
    table: 'members',
    validate: validateMember,
    createColumns: [
      'member_number',
      'first_name',
      'last_name',
      'date_of_birth',
      'gender',
      'phone',
      'email',
      'status',
    ],
    updateColumns: [
      'member_number',
      'first_name',
      'last_name',
      'date_of_birth',
      'gender',
      'phone',
      'email',
      'status',
    ],
    filterColumns: ['member_number', 'status'],
  },
  hospitals: {
    table: 'hospitals',
    validate: validateHospital,
    createColumns: [
      'provider_code',
      'name',
      'hospital_type',
      'email',
      'phone',
      'address_line',
      'city',
      'country',
      'status',
    ],
    updateColumns: [
      'provider_code',
      'name',
      'hospital_type',
      'email',
      'phone',
      'address_line',
      'city',
      'country',
      'status',
    ],
    filterColumns: ['provider_code', 'status', 'city', 'country'],
  },
  claims: {
    table: 'claims',
    validate: validateClaim,
    createColumns: [
      'claim_number',
      'member_id',
      'hospital_id',
      'service_date',
      'amount',
      'currency',
      'diagnosis_code',
      'status',
      'created_by',
      'updated_by',
    ],
    updateColumns: [
      'member_id',
      'hospital_id',
      'service_date',
      'amount',
      'currency',
      'diagnosis_code',
      'status',
      'updated_by',
    ],
    filterColumns: ['claim_number', 'member_id', 'hospital_id', 'status', 'currency'],
  },
};

function pickColumns(payload, columns) {
  return columns.filter((column) => payload[column] !== undefined);
}

function parseListOptions(query, definition) {
  const limit = query.limit === undefined ? 20 : Number(query.limit);
  const offset = query.offset === undefined ? 0 : Number(query.offset);
  validateListQuery({ limit, offset });

  const filters = {};
  for (const column of definition.filterColumns) {
    if (query[column] !== undefined) {
      filters[column] = query[column];
    }
  }

  return { limit, offset, filters };
}

export function createResourceRouter(express, name) {
  const router = express.Router();
  const definition = definitions[name];

  router.get('/', async (req, res) => {
    const rows = await listRecords(definition.table, parseListOptions(req.query, definition));
    res.json({
      data: rows,
      meta: {
        count: rows.length,
        limit: req.query.limit === undefined ? 20 : Number(req.query.limit),
        offset: req.query.offset === undefined ? 0 : Number(req.query.offset),
      },
    });
  });

  router.post('/', async (req, res) => {
    const payload = req.body || {};
    definition.validate(payload);
    const row = await createRecord(
      definition.table,
      definition.createColumns.filter((column) => payload[column] !== undefined),
      payload
    );
    res.status(201).json({ data: row });
  });

  router.get('/:id', async (req, res) => {
    const row = await findById(definition.table, req.params.id);
    if (!row) {
      throw new HttpError(404, `${name.slice(0, -1)} not found`);
    }
    res.json({ data: row });
  });

  router.put('/:id', async (req, res) => {
    const payload = req.body || {};
    definition.validate(payload, { partial: true });
    const updateColumns = pickColumns(payload, definition.updateColumns);
    if (updateColumns.length === 0) {
      throw new HttpError(400, 'Request body did not contain any updatable fields');
    }
    const row = await updateRecord(definition.table, req.params.id, updateColumns, payload);
    if (!row) {
      throw new HttpError(404, `${name.slice(0, -1)} not found`);
    }
    res.json({ data: row });
  });

  return router;
}

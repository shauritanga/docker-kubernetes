import { pool } from './pool.js';

export async function createRecord(table, columns, payload, returning = '*') {
  const values = columns.map((column) => payload[column]);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
  const sql = `
    INSERT INTO ${table} (${columns.join(', ')})
    VALUES (${placeholders})
    RETURNING ${returning}
  `;
  const result = await pool.query(sql, values);
  return result.rows[0];
}

export async function findById(table, id) {
  const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

export async function listRecords(
  table,
  {
    filters = {},
    limit = 20,
    offset = 0,
    orderBy = 'created_at DESC',
  } = {}
) {
  const filterEntries = Object.entries(filters).filter(([, value]) => value !== undefined);
  const whereClause =
    filterEntries.length === 0
      ? ''
      : `WHERE ${filterEntries
          .map(([column], index) => `${column} = $${index + 1}`)
          .join(' AND ')}`;

  const limitIndex = filterEntries.length + 1;
  const offsetIndex = filterEntries.length + 2;
  const values = [...filterEntries.map(([, value]) => value), limit, offset];
  const sql = `
    SELECT *
    FROM ${table}
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  const result = await pool.query(sql, values);
  return result.rows;
}

export async function updateRecord(table, id, columns, payload, returning = '*') {
  const assignments = columns.map((column, index) => `${column} = $${index + 2}`);
  const values = [id, ...columns.map((column) => payload[column])];
  const sql = `
    UPDATE ${table}
    SET ${assignments.join(', ')}, updated_at = NOW()
    WHERE id = $1
    RETURNING ${returning}
  `;
  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

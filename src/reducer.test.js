import { describe, it, expect } from 'vitest';
import { reducer } from './reducer.js';

const base = [{ id: 'a', title: 'A', note: '', status: 'todo' }];

describe('reducer', () => {
  it('adds a task to To do at the top', () => {
    const out = reducer(base, { type: 'add', id: 'b', title: 'B', note: 'n' });
    expect(out[0]).toMatchObject({ id: 'b', status: 'todo' });
    expect(out).toHaveLength(2);
  });
  it('moves a task', () => {
    expect(reducer(base, { type: 'move', id: 'a', status: 'done' })[0].status).toBe('done');
  });
  it('edits a task', () => {
    expect(reducer(base, { type: 'edit', id: 'a', title: 'New', note: 'x' })[0]).toMatchObject({ title: 'New', note: 'x' });
  });
  it('deletes a task', () => {
    expect(reducer(base, { type: 'delete', id: 'a' })).toEqual([]);
  });
  it('does not mutate the original array', () => {
    const copy = JSON.stringify(base);
    reducer(base, { type: 'move', id: 'a', status: 'doing' });
    expect(JSON.stringify(base)).toBe(copy);
  });
  it('skips duplicate imports', () => {
    const list = [{ id: 'a', title: 'dup', note: '', status: 'todo' }, { id: 'z', title: 'new', note: '', status: 'todo' }];
    expect(reducer(base, { type: 'import', tasks: list }).map((t) => t.id).sort()).toEqual(['a', 'z']);
  });
});

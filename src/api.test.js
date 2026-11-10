import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchSampleTasks } from './api.js';

afterEach(() => vi.unstubAllGlobals());

describe('fetchSampleTasks', () => {
  it('maps API todos to tasks', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [{ id: 1, title: 'buy milk', completed: true }] }));
    const [t] = await fetchSampleTasks();
    expect(t).toMatchObject({ id: 'api-1', title: 'Buy milk', status: 'done' });
  });
  it('throws on a bad response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(fetchSampleTasks()).rejects.toThrow('Request failed (500)');
  });
});

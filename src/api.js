const URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

export async function fetchSampleTasks(signal) {
  const res = await fetch(URL, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  return data.map((t) => ({
    id: `api-${t.id}`,
    title: t.title.charAt(0).toUpperCase() + t.title.slice(1),
    note: 'Imported sample task',
    status: t.completed ? 'done' : 'todo',
  }));
}

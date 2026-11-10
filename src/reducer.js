export const COLS = [
  { id: 'todo', name: 'To do', empty: 'No tasks waiting. Add one above.' },
  { id: 'doing', name: 'Doing', empty: 'Nothing in progress. Start a task from To do.' },
  { id: 'done', name: 'Done', empty: 'Finished tasks appear here.' },
];
export const NEXT = { todo: ['doing', 'Start'], doing: ['done', 'Finish'] };
export const PREV = { doing: ['todo', 'Back to To do'], done: ['doing', 'Reopen'] };

export const SEED = [
  { id: 's1', title: 'Sketch mobile wireframes', note: 'Start with the smallest screen', status: 'done' },
  { id: 's2', title: 'Build the task card component', note: 'Title, note, move buttons', status: 'doing' },
  { id: 's3', title: 'Run a keyboard-only test', note: 'Tab through the whole page', status: 'todo' },
];

export function reducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [{ id: action.id, title: action.title, note: action.note, status: 'todo' }, ...tasks];
    case 'edit':
      return tasks.map((t) => (t.id === action.id ? { ...t, title: action.title, note: action.note } : t));
    case 'move':
      return tasks.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
    case 'delete':
      return tasks.filter((t) => t.id !== action.id);
    case 'import': {
      const have = new Set(tasks.map((t) => t.id));
      return [...action.tasks.filter((t) => !have.has(t.id)), ...tasks]; // no duplicates
    }
    default:
      return tasks;
  }
}

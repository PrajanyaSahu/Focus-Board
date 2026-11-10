import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { COLS, SEED, reducer } from './reducer.js';
import { useImport, useTheme } from './hooks.js';
import TaskForm from './TaskForm.jsx';
import Toolbar from './Toolbar.jsx';
import Column from './Column.jsx';

const KEY = 'focusboard.tasks.v1';
const load = () => {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch { /* fall through */ }
  return SEED;
};

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, null, load);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const { current, toggle } = useTheme();
  const onImported = useCallback((list) => dispatch({ type: 'import', tasks: list }), []);
  const sample = useImport(onImported);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch { /* storage can fail */ }
  }, [tasks]);

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () => tasks.filter((t) => !q || `${t.title} ${t.note}`.toLowerCase().includes(q)),
    [tasks, q],
  );

  return (
    <div className="wrap">
      <header>
        <div>
          <h1>Focus Board</h1>
          <p className="sub">See what to work on next. Add a task, move it across, finish it.</p>
        </div>
        <button className="btn" type="button" aria-pressed={current === 'dark'} onClick={toggle}>
          {current === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <TaskForm onAdd={(title, note) => dispatch({ type: 'add', id: crypto.randomUUID(), title, note })} />

      <div className="note-bar">
        <button className="btn small" type="button" onClick={sample.run} disabled={sample.status === 'loading'}>
          {sample.status === 'loading' ? 'Importing…' : 'Import sample tasks'}
        </button>
        {sample.status === 'error' && (
          <span className="error" role="alert">
            {sample.error}. <button className="btn small" type="button" onClick={sample.run}>Try again</button>
          </span>
        )}
      </div>

      <Toolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />

      <main className="board">
        {COLS.filter((c) => filter === 'all' || filter === c.id).map((c) => (
          <Column key={c.id} col={c} dispatch={dispatch}
            tasks={matches.filter((t) => t.status === c.id)}
            emptyText={q ? 'No matches in this column.' : c.empty} />
        ))}
      </main>
      <p className="foot">Tasks are saved in this browser only. Drag cards between columns, or use the buttons.</p>
      <div className="sr" role="status">{matches.length} tasks shown</div>
    </div>
  );
}

import { useState } from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ col, tasks, dispatch, emptyText }) {
  const [over, setOver] = useState(false);
  const drop = (e) => {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) dispatch({ type: 'move', id, status: col.id });
  };
  return (
    <section className={`col${over ? ' over' : ''}`} data-col={col.id} aria-labelledby={`h-${col.id}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={drop}>
      <h2 id={`h-${col.id}`}>{col.name}<span className="count" aria-label={`${tasks.length} tasks`}>{tasks.length}</span></h2>
      {tasks.length
        ? <ul>{tasks.map((t) => <TaskCard key={t.id} task={t} dispatch={dispatch} />)}</ul>
        : <p className="empty">{emptyText}</p>}
    </section>
  );
}

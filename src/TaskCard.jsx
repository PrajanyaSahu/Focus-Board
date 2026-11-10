import { useState } from 'react';
import { NEXT, PREV } from './reducer.js';

export default function TaskCard({ task, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [note, setNote] = useState(task.note);
  const prev = PREV[task.status];
  const next = NEXT[task.status];

  if (editing) {
    const save = (e) => {
      e.preventDefault();
      if (!title.trim()) return;
      dispatch({ type: 'edit', id: task.id, title: title.trim(), note: note.trim() });
      setEditing(false);
    };
    return (
      <li className="card">
        <form className="editform" onSubmit={save}>
          <label className="sr" htmlFor={`t-${task.id}`}>Task title</label>
          <input id={`t-${task.id}`} type="text" autoFocus required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="sr" htmlFor={`n-${task.id}`}>Note</label>
          <input id={`n-${task.id}`} type="text" maxLength={140} value={note} onChange={(e) => setNote(e.target.value)} />
          <div className="acts">
            <button className="btn small primary" type="submit">Save</button>
            <button className="btn small" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`card${task.status === 'done' ? ' is-done' : ''}`} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}>
      <h3>{task.title}</h3>
      {task.note && <p>{task.note}</p>}
      <div className="acts">
        {prev && <button className="btn small" onClick={() => dispatch({ type: 'move', id: task.id, status: prev[0] })}>{prev[1]}</button>}
        {next && <button className="btn small primary" onClick={() => dispatch({ type: 'move', id: task.id, status: next[0] })}>{next[1]}</button>}
        <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
        <button className="btn small danger" onClick={() => window.confirm(`Delete “${task.title}”?`) && dispatch({ type: 'delete', id: task.id })}>Delete</button>
      </div>
    </li>
  );
}

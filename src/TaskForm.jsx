import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), note.trim());
    setTitle('');
    setNote('');
  };
  return (
    <form className="add" onSubmit={submit} autoComplete="off">
      <div className="field">
        <label htmlFor="title">Task title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} required placeholder="Finish portfolio README" />
      </div>
      <div className="field">
        <label htmlFor="note">Note (optional)</label>
        <input type="text" id="note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={140} placeholder="Add a screenshot and live link" />
      </div>
      <button className="btn primary" type="submit">Add task</button>
    </form>
  );
}

import { COLS } from './reducer.js';

export default function Toolbar({ query, setQuery, filter, setFilter }) {
  return (
    <div className="tools">
      <div className="field">
        <label htmlFor="search">Search tasks</label>
        <input type="search" id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to filter" />
      </div>
      <div className="field">
        <label htmlFor="filter">Show</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All columns</option>
          {COLS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
    </div>
  );
}

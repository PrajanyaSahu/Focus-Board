import { useCallback, useEffect, useState } from 'react';
import { fetchSampleTasks } from './api.js';

const THEME_KEY = 'focusboard.theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
  });
  useEffect(() => { if (theme) document.documentElement.dataset.theme = theme; }, [theme]);
  const system = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
  const current = theme || system;
  const toggle = () => {
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage can fail */ }
  };
  return { current, toggle };
}

// Loading / error / retry state for the API call
export function useImport(onDone) {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const run = useCallback(async () => {
    setState({ status: 'loading', error: '' });
    try {
      onDone(await fetchSampleTasks());
      setState({ status: 'idle', error: '' });
    } catch (e) {
      setState({ status: 'error', error: e.message || 'Something went wrong' });
    }
  }, [onDone]);
  return { ...state, run };
}

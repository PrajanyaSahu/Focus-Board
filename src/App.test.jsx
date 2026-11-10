import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App.jsx';

beforeEach(() => localStorage.clear());

describe('App', () => {
  it('adds a task to To do', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/task title/i), 'Write tests');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    expect(within(screen.getByRole('region', { name: /to do/i })).getByText('Write tests')).toBeInTheDocument();
  });

  it('moves a task from To do to Doing', async () => {
    const user = userEvent.setup();
    render(<App />);
    const card = screen.getByText('Run a keyboard-only test').closest('li');
    await user.click(within(card).getByRole('button', { name: 'Start' }));
    expect(within(screen.getByRole('region', { name: /doing/i })).getByText('Run a keyboard-only test')).toBeInTheDocument();
  });

  it('filters tasks by search text', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/search tasks/i), 'keyboard');
    expect(screen.queryByText('Sketch mobile wireframes')).not.toBeInTheDocument();
    expect(screen.getByText('Run a keyboard-only test')).toBeInTheDocument();
  });
});

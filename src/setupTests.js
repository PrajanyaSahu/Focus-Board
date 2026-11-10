import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest has no globals here, so unmount rendered components between tests ourselves
afterEach(cleanup);

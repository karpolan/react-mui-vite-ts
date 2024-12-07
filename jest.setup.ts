import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import matchers from '@testing-library/jest-dom/matchers';
// import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Solves "ReferenceError: TextEncoder is not defined"
import { TextEncoder } from 'node:util';
global.TextEncoder = TextEncoder;

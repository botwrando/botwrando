import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* Avoid useLayoutEffect warnings in test...
 * https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
 */
import React from 'react';
React.useLayoutEffect = React.useEffect;

// Add setup or global before or after hooks (to be run before/after all test suites) here.
beforeAll(() => {
  /* Mock window.matchMedia, which doesn't exist in JSDOM testing library
   * https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
   */
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  /* Setup Enzyme component testing */
  configure({ adapter: new Adapter() });
});

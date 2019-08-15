/**
 * Suppress React 16.8 act() warnings globally.
 * The react teams fix won't be out of alpha until 16.9.0.
 */
const consoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Warning: An update to %s inside a test was not wrapped in act'
      )
    ) {
      consoleError(...args);
    }
  });
});

/**
 * Suppress Canvas warnings globally.
 * Canvas current uses componentWillMount.
 */
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes(
        'Not implemented: HTMLCanvasElement.prototype.getContext'
      )
    ) {
      consoleError(...args);
    }
  });
});

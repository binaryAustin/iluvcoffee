import { LoggingMiddleware } from './logging.middleware';

describe('LogginMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingMiddleware()).toBeDefined();
  });
});

import { InertiaMiddleware } from './inertia.middleware';

describe('InertiaMiddleware', () => {
  it('should be defined', () => {
    expect(new InertiaMiddleware()).toBeDefined();
  });
});

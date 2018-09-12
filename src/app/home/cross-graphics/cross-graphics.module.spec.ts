import { CrossGraphicsModule } from './cross-graphics.module';

describe('CrossGraphicsModule', () => {
  let crossGraphicsModule: CrossGraphicsModule;

  beforeEach(() => {
    crossGraphicsModule = new CrossGraphicsModule();
  });

  it('should create an instance', () => {
    expect(crossGraphicsModule).toBeTruthy();
  });
});

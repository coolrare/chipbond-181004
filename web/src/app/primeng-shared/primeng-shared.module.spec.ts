import { PrimengSharedModule } from './primeng-shared.module';

describe('PrimengSharedModule', () => {
  let primengSharedModule: PrimengSharedModule;

  beforeEach(() => {
    primengSharedModule = new PrimengSharedModule();
  });

  it('should create an instance', () => {
    expect(primengSharedModule).toBeTruthy();
  });
});

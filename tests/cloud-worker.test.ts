import { jest } from '@jest/globals';

globalThis.self = { onmessage: null } as any;
let init: any, resize: any;
beforeAll(async () => {
  const mod = await import('../components/cloud-worker');
  init = mod.init;
  resize = mod.resize;
});

let errorSpy: jest.SpiedFunction<(...args: any[]) => void>;
beforeEach(() => {
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  errorSpy.mockRestore();
});

test('init handles undefined canvas gracefully', async () => {
  await expect(init(undefined as any, 100, 100)).resolves.toBeUndefined();
});

test('init creates fallback canvas when OffscreenCanvas exists', async () => {
  class DummyOffscreen {
    width: number;
    height: number;
    constructor(w: number, h: number) {
      this.width = w;
      this.height = h;
    }
    getContext() {
      return {} as any;
    }
  }
  (globalThis as any).OffscreenCanvas = DummyOffscreen as any;
  await expect(init(undefined as any, 50, 50)).resolves.toBeUndefined();
  delete (globalThis as any).OffscreenCanvas;
});

test('resize before init does nothing', () => {
  expect(() => resize(100, 100)).not.toThrow();
});

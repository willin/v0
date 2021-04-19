import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { cacheable } from '../../src';

describe('cacheable', () => {
  test('cacheable timeout', (complete) => {
    const fn = (): Observable<number> => of(1);
    const fn2 = cacheable(fn, 1);
    fn2()
      .pipe(
        delay(200),
        mergeMap(() => fn2())
      )
      .subscribe({
        next: (val) => {
          expect(val).toEqual(1);
        },
        complete
      });
  }, 60e3);

  test('cacheable reject promise', (complete) => {
    const fn = (): Promise<any> => Promise.reject(new Error('test'));
    const fn2 = cacheable(fn, 1, true);
    fn2().catch((err: Error) => {
      expect(err.message).toEqual('test');
      complete();
    });
  });

  test('cacheable reject observable', (complete) => {
    const fn = (): Observable<any> => throwError(new Error('test'));
    const fn2 = cacheable(fn);
    fn2().subscribe({
      error: (err: Error) => {
        expect(err.message).toEqual('test');
        complete();
      }
    });
  });
});

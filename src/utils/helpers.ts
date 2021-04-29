import { Observable, from } from 'rxjs';
import crypto from 'crypto';
import { ResultType } from '../types';

export function hash(target: any): string {
  return crypto.createHash('md5').update(JSON.stringify(target)).digest('hex');
}

export function checkPromise(target: any, key: string | symbol, resultType: ResultType): boolean {
  let isPromise = false;
  if (resultType === ResultType.Detect) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const type = Reflect.getMetadata('design:returntype', target, key);
    isPromise = type === Promise;
  } else {
    isPromise = resultType === ResultType.Promise;
  }
  return isPromise;
}

export async function toPromise<T>(fn: (...arg: any[]) => Observable<T> | Promise<T>, args: any[]): Promise<T> {
  // eslint-disable-next-line no-return-await
  return await new Promise((resolve, reject) => {
    from(fn(...args)).subscribe(
      (val) => resolve(val),
      (error) => reject(error)
    );
  });
}

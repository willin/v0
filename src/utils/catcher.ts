import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toPromise } from './helpers';
import { ErrorHandler } from '../types';

function handleError(ctx: any, errorClass: any, handler: ErrorHandler, error: any): void {
  // check if error is instance of passed error class
  if (typeof handler === 'function' && error instanceof errorClass) {
    // run handler with error object
    // and class context as second argument
    handler.call(null, error, ctx);
  } else {
    // throw error further,
    // next decorator in chain can catch it
    throw error;
  }
}

export function catcher<T extends (...args: any[]) => Observable<any> | Promise<any>>(
  func: T,
  errorClass: any,
  errorHandler: ErrorHandler
): T {
  return function (this: any, ...args: any[]) {
    const rawResult = toPromise(func.bind(this), args);
    const result = from(rawResult).pipe(
      catchError<void, any>((error) => {
        handleError(this, errorClass, errorHandler, error);
      })
    );
    return result;
  } as T;
}

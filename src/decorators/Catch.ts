import { ErrorHandler } from '../types';
import { catcher } from '../utils/catcher';

export function Catch(errorClass: any, handler: ErrorHandler) {
  return function CatchDecorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    // eslint-disable-next-line
    descriptor.value = catcher(descriptor.value, errorClass, handler);
    return descriptor;
  };
}

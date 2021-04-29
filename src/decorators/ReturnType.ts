import { ResultType } from '../types';
import { toPromise, checkPromise } from '../utils/helpers';

export function ReturnType(resultType = ResultType.Detect) {
  return function ReturnTypeDecorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    if (checkPromise(target, key, resultType)) {
      // eslint-disable-next-line
      descriptor.value = toPromise(descriptor.value);
    }
    return descriptor;
  };
}

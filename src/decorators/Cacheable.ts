import { ResultType } from '../types';
import { cacheable } from '../utils/cacheable';
import { checkPromise } from '../utils/helpers';

export function Cacheable(timeout = 0, resultType = ResultType.Detect) {
  return function CacheDecorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    // eslint-disable-next-line
    descriptor.value = cacheable(descriptor.value, timeout, checkPromise(target, key, resultType));
    return descriptor;
  };
}

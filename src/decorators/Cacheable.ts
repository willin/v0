import { ResultType } from '../types';
import { cacheable } from '../utils/cacheable';

export function Cacheable(timeout = 0, resultType = ResultType.Detect) {
  return function CacheDecorator(
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    let isPromise = false;
    if (resultType === ResultType.Detect) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const type = Reflect.getMetadata('design:returntype', target, key);
      isPromise = type === Promise;
    } else {
      isPromise = resultType === ResultType.Promise;
    }

    // eslint-disable-next-line
    descriptor.value = cacheable(descriptor.value, timeout, isPromise);
    return descriptor;
  };
}

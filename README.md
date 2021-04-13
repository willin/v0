# v0

Useful Rxjs Operators & Utils.

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/v0.svg)](https://npmjs.org/package/v0) [![npm](https://img.shields.io/npm/dm/v0.svg)](https://npmjs.org/package/v0) [![npm](https://img.shields.io/npm/dt/v0.svg)](https://npmjs.org/package/v0) [![Maintainability](https://api.codeclimate.com/v1/badges/e7da4dfd45eeaa59402a/maintainability)](https://codeclimate.com/github/willin/v0/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/e7da4dfd45eeaa59402a/test_coverage)](https://codeclimate.com/github/willin/v0/test_coverage)

> 你的`关注`是我最大的动力。 Your `Star` is the best gift.

## Install

```bash
npm i --save rxjs v0
# or
yarn add rxjs v0
```

## Usage

中文文档参考： [rx.js.cool](https://rx.js.cool/) 中的【[进阶（Advanced）](http://rx.js.cool/v0)】章节系列文章

Operators:

- delayRetry
- tapAsync

Utils:

- RxPromise

### delayRetry

```ts
{
  maxAttempts?: number;
  duration?: number;
}
```

Defaults:

```
{
  maxAttempts = 3,
  duration = 1000
}
```

Usage:

```ts
import { delayRetry } from 'v0';

source$.pipe(
  // ...
  // Retry all options in current pipe
  delayRetry({
    maxAttempts: 2,
    duration: 200
  }),
  // catchError is needed
  catchError((error) => of(error))
);
```

### tapAsync

Just like tap, support async/await (promise) function.

Usage:

```ts
import { tapAsync } from 'v0';

source$.pipe(
  tapAsync(async (val) => {
    await SomeFn(val);
  })
);
```

### RxPromise

```ts
// RxPromise<T, R = Error> extends Observable<T>
const mockedPromise = new RxPromise(resolver);
```

Type of `resolver`:

```ts
(resolve: (r: T) => void, reject: (r: R) => void) => void
```

Example，transform mongoose `exec` to observable:

```ts
import mongoose from 'mongoose';
import { RxPromise } from 'v0';

mongoose.Promise = RxPromise;

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);

const s$ = <Observable<Record<string, unknown>[]>>(<any>Kitten.find().exec());
// or
// const s$ = (Kitten.find().exec()) as any) as Observable<Record<string, unknown>[]>;

s$.subscribe({
  next(v) {
    console.log(v);
  },
  complete() {
    console.log('ended');
  }
});
```

## Contribute

1. Add your own operator
2. Update Readme Doc (List / Usage)
3. Make a PR

## License

Apache 2.0

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)

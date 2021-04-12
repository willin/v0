# v0

Useful Rxjs Operators.

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/v0.svg)](https://npmjs.org/package/v0) [![npm](https://img.shields.io/npm/dm/v0.svg)](https://npmjs.org/package/v0) [![npm](https://img.shields.io/npm/dt/v0.svg)](https://npmjs.org/package/v0)

> 你的`关注`是我最大的动力。 Your `Star` is the best gift.

## Install

```bash
npm i --save rxjs v0
# or
yarn add rxjs v0
```

## Usage

中文文档参考： [rx.js.cool](https://rx.js.cool/) 中的【[进阶（Advanced）](http://rx.js.cool/advanced/tapAsync)】章节系列文章

Operator List:

- tapAsync

### tapAsync

Just like tap, support async/await (promise) function.

Demo:

```ts
import { tapAsync } from 'v0';

source$.pipe(
  tapAsync(async (val) => {
    await SomeFn(val);
  })
);
```

## Contribute

1. Add your own operator
2. Update Readme Doc (List / Usage)
3. Make a PR

## License

Apache 2.0

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)

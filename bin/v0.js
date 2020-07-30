#!/usr/bin/env node

const init = require('../src');

init()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

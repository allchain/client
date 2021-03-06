#!/usr/bin/env node
// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const fs = require('fs');
const { input, output } = require('yargs').argv;

if (!input) {
  console.error('Usage: wasm2js --input <file> --output <file>');
  process.exit(1);
}

if (!fs.existsSync(input)) {
  console.error(input, 'does not exist');
  process.exit(1);
}

const buffer = fs.readFileSync(input);
fs.writeFileSync(output, `// Copyright 2017-2018 Jaco Greeff\n// This software may be modified and distributed under the terms\n// of the ISC license. See the LICENSE file for details.\n// @flow\n\n// Generated with polkadot-wasm-wasm2js (${buffer.length} bytes)\n\nconst hexToU8a = require('@polkadot/util/hex/toU8a');\n\nmodule.exports = hexToU8a('0x${buffer.toString('hex')}');\n`);

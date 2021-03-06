// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Config } from '../types';

const getArgv = require('./argv');

function keyToCamel (key: string, startIndex: number = 0): string {
  return key.split('-').reduce((name, part, index) => {
    if (index <= startIndex) {
      return part;
    }

    return `${name}${part.substr(0, 1).toUpperCase()}${part.substr(1).toLowerCase()}`;
  }, '');
}

module.exports = function cli (params?: string): Config {
  const argv = getArgv(params);

  return Object
    .keys(argv)
    .reduce((config, key) => {
      if (/^(db|dev|p2p|rpc|wasm)-/.test(key)) {
        const section = key.substr(0, key.indexOf('-'));
        const name = keyToCamel(key, 1);

        config[section] = config[section] || {};
        config[section][name] = argv[key];
      } else if (!/^(db|dev|p2p|rpc|wasm)[A-Z]/.test(key)) {
        const name = keyToCamel(key);

        config[name] = argv[key];
      }

      return config;
    }, ({}: $Shape<Config>));
};

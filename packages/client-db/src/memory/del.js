// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Memory$Storage } from './types';

module.exports = function del (storage: Memory$Storage, k: Uint8Array): void {
  delete storage[k];
};

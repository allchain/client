// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Rpc } from './types';

const PATH: string = '/';
const PORT: number = 9933;
const TYPES: Array<Rpc> = ['http', 'ws'];

module.exports = {
  PATH,
  PORT,
  TYPES
};

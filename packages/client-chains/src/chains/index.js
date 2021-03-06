// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { ChainConfigLoose, ChainName } from '../types';

const nelson = require('./nelson');

module.exports = ({
  nelson
}: { [ChainName]: ChainConfigLoose });

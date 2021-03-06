// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type PackageJson = {
  name: string,
  version: string
};

const npmQuery = require('package-json');

const DEVELOPMENT = 'development';

const name = '@polkadot';
let pkgJson: PackageJson;
let stability = 'release';

try {
  // $FlowFixMe production version
  pkgJson = require('./package.json');
} catch (error) {
  stability = DEVELOPMENT;
  // flowlint-next-line untyped-import:off
  pkgJson = require('../package.json');
}

const isDevelopment = stability === DEVELOPMENT;

async function getNpmVersion (): Promise<string> {
  return npmQuery(pkgJson.name)
    .then((npmJson: PackageJson) => npmJson.version)
    .catch(() => 'unknown');
}

async function getNpmStatus (): Promise<string> {
  const verNpm = await getNpmVersion();

  switch (verNpm) {
    case pkgJson.version:
      return 'up to date';

    case 'unknown':
      return 'cannot retrieve from npmjs.org';

    default:
      return `outdated, ${verNpm} available`;
  }
}

module.exports = {
  clientId: `${name}/${pkgJson.version}-${stability}`,
  isDevelopment,
  getNpmStatus,
  getNpmVersion,
  name,
  stability,
  version: pkgJson.version
};

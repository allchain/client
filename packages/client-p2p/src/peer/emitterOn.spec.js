// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const EventEmitter = require('eventemitter3');

const emitterOn = require('./emitterOn');

describe('emitterOn', () => {
  let self;

  beforeEach(() => {
    self = {
      emitter: new EventEmitter()
    };
  });

  it('wraps event emitter handlers', (done) => {
    emitterOn(self)('message', (message) => {
      expect(message).toEqual('something');

      done();
    });

    self.emitter.emit('message', 'something');
  });
});

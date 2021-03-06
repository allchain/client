// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { RuntimeEnv$Heap, Pointer } from '../../types';
import type { Memory, Memory$Buffer } from './types';

const allocate = require('./allocate');
const deallocate = require('./deallocate');
const setMemory = require('./setMemory');

function reduceSize (buffer: Memory$Buffer): number {
  return Object
    .values(buffer)
    // flowlint-next-line unclear-type:off
    .reduce((total, size) => total + ((size: any): number), 0);
}

module.exports = function envHeap (): RuntimeEnv$Heap {
  let memory: Memory;

  return {
    allocate: (size: number): Pointer =>
      allocate(memory, size),
    deallocate: (ptr: Pointer): number =>
      deallocate(memory, ptr),
    dup: (ptr: Pointer, len: number): Uint8Array =>
      memory.uint8.slice(ptr, ptr + len),
    fill: (ptr: Pointer, value: number, len: number): Uint8Array =>
      memory.uint8.fill(value, ptr, len),
    get: (ptr: Pointer, len: number): Uint8Array =>
      memory.uint8.subarray(ptr, ptr + len),
    getU32: (ptr: Pointer): number =>
      memory.view.getUint32(ptr, true),
    set: (ptr: Pointer, data: Uint8Array): Pointer => {
      memory.uint8.set(data, ptr);

      return ptr;
    },
    setU32: (ptr: Pointer, value: number): Pointer => {
      memory.view.setUint32(ptr, value, true);

      return ptr;
    },
    setWasmMemory: (wasmMemory: WebAssembly.Memory, offset?: number): void => {
      memory = setMemory(wasmMemory, offset);
    },
    size: (): number =>
      memory.size,
    sizeAllocated: (): number =>
      reduceSize(memory.allocated),
    sizeDeallocated: (): number =>
      reduceSize(memory.deallocated)
  };
};

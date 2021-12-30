/*
 * @Author:  Findly <wenbinqiu42@gmail.com>
 * @Date: 2021-12-30 10:29:21
 * @LastEditors: Findly
 * @LastEditTime: 2021-12-30 11:40:07
 * @Description:
 */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

/* eslint-disable react-internal/invariant-args */

// import invariant from 'shared/invariant';

// // We expect that our Rollup, Jest, and Flow configurations
// // always shim this module with the corresponding host config
// // (either provided by a renderer, or a generic shim for npm).
// //
// // We should never resolve to this file, but it exists to make
// // sure that if we *do* accidentally break the configuration,
// // the failure isn't silent.

// invariant(false, 'This module must be shimmed by a specific renderer.');
export * from './forks/ReactFiberHostConfig.dom';

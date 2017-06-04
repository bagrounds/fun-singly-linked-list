;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var scalar = require('fun-scalar')

  var equalityTests = [
    [[{ value: 3 }], { value: 3 }, 'copy'],
    [[scalar.sum, 0, { value: 3 }], 3, 'fold'],
    [[scalar.sum, 0, { value: 8, next: { value: 6 }}], 14, 'fold'],
    [[{ value: 8, next: { value: 6 }}], [8, 6], 'toArray'],
    [
      [
        { value: 1, next: { value: 3 }},
        { value: 2, next: { value: 4 }}
      ],
      { value: 1, next: { value: 3, next: { value: 2, next: { value: 4 }}}},
      'concat'
    ],
    [
      [
        scalar.sum,
        { value: 1, next: { value: 3 }},
        { value: 2, next: { value: 4 }}
      ],
      { value: 3, next: { value: 7 }},
      'zipWith'
    ],
    [
      [{ value: 8, next: { value: 8 }}, { value: 8 }],
      false,
      'equal'
    ],
    [
      [{ value: 8 }, { value: 8, next: { value: 8 }}],
      false,
      'equal'
    ],
    [
      [{ value: 8, next: { value: 9 }}, { value: 8, next: { value: 8 }}],
      false,
      'equal'
    ],
    [
      [{ value: 7, next: { value: 9 }}, { value: 8, next: { value: 9 }}],
      false,
      'equal'
    ],
    [
      [{ value: 8, next: { value: 9 }}, { value: 8, next: { value: 9 }}],
      true,
      'equal'
    ],
    [[{ value: 8 }, { value: 8 }], true, 'equal'],
    [[9, { value: 8 }], { value: 8, next: { value: 9 }}, 'append'],
    [
      [9, { value: 1, next: { value: 8 }}],
      { value: 1, next: { value: 8, next: { value: 9 }}},
      'append'
    ],
    [
      [9, { value: 1, next: { value: 8 }}],
      { value: 9, next: { value: 1, next: { value: 8 }}},
      'prepend'
    ],
    [[9, { value: 8 }], { value: 9, next: { value: 8 }}, 'prepend'],
    [
      [{ value: 8, next: { value: 9 }}],
      { value: 9, next: { value: 8 }},
      'reverse'
    ],
    [[{ value: 8 }], { value: 8 }, 'reverse'],
    [[scalar.sum(1), { value: 8 }], { value: 9 }, 'map'],
    [[{ value: 9, next: { value: 8 }}], 2, 'length'],
    [[{ value: 1 }], 1, 'length'],
    [[9], { value: 9 }, 'of']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  /* exports */
  module.exports = equalityTests.map(funTest.sync)
})()


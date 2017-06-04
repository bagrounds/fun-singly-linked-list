/**
 *
 * @module fun-singly-linked-list
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('fun-function')
  var object = require('fun-object')
  var scalar = require('fun-scalar')
  var predicate = require('fun-predicate')

  /* exports */
  module.exports = {
    of: of,
    forEach: forEach,
    forEachNode: forEachNode,
    map: map,
    concat: concat,
    copy: copy,
    toArray: toArray,
    fold: fold,
    length: length,
    reverse: fn.compose(reverse, copy),
    prepend: prepend,
    append: append,
    equal: equal,
    zipWith: zipWith
  }

  /**
   *
   * @function fun-singly-linked-list.zipWith
   *
   * @param {Function} f - (*, *) -> *
   * @param {List} a - first list
   * @param {List} b - second list
   *
   * @return {List} f(a[0], b[0]), f(a[1], b[1]), ...
   */
  function zipWith (f, a, b) {
    var result = of(f(a.value, b.value))
    var cursors = [result, a.next, b.next]

    while (cursors[1] && cursors[2]) {
      cursors[0].next = of(f(cursors[1].value, cursors[2].value))
      cursors = cursors.map(object.get('next'))
    }

    return result
  }

  /**
   *
   * @function fun-singly-linked-list.equal
   *
   * @param {List} a - first list
   * @param {List} b - second list
   *
   * @return {Boolean} if a and b are equal element-wise
   */
  function equal (a, b) {
    return length(a) === length(b) &&
      toArray(zipWith(predicate.equal, a, b)).reduce(predicate.equal, true)
  }

  /**
   *
   * @function fun-singly-linked-list.append
   *
   * @param {*} value - to append
   * @param {List} list - to append to
   *
   * @return {List} a new list appended with value
   */
  function append (value, list) {
    var result = copy(list)
    var cursor = result

    while (cursor.next) {
      cursor = cursor.next
    }

    cursor.next = of(value)

    return result
  }

  /**
   *
   * @function fun-singly-linked-list.prepend
   *
   * @param {*} value - to prepend
   * @param {List} list - to prepend to
   *
   * @return {List} a new list prepended with value
   */
  function prepend (value, list) {
    return { value: value, next: copy(list) }
  }

  /**
   *
   * @function fun-singly-linked-list.reverse
   *
   * @param {List} list - to prepend to
   *
   * @return {List} a new list that is the reverse of list
   */
  function reverse (list) {
    var temp = [undefined, of(list.value), list.next]

    while (temp[2]) {
      temp = [temp[1], temp[2], temp[2].next]
      temp[1].next = temp[0]
    }

    return temp[1]
  }

  /**
   *
   * @function fun-singly-linked-list.length
   *
   * @param {List} list - to measure
   *
   * @return {Number} the length of list
   */
  function length (list) {
    return fold(scalar.sum(1), 0, list)
  }

  /**
   *
   * @function fun-singly-linked-list.fold
   *
   * @param {Function} combine - (*, *) -> *
   * @param {*} init - initial value for combine
   * @param {List} source - list to fold
   *
   * @return {*} the result of folding source with combine and init
   */
  function fold (combine, init, source) {
    return toArray(source).reduce(combine, init)
  }

  /**
   *
   * @function fun-singly-linked-list.toArray
   *
   * @param {List} list - to convert
   *
   * @return {Array} all of the elements of list in an array
   */
  function toArray (list) {
    var array = []
    forEach(appendToArray, list)

    function appendToArray (value) {
      array.push(value)
    }

    return array
  }

  /**
   *
   * @function fun-singly-linked-list.of
   *
   * @param {*} value - to put in a new list
   *
   * @return {List} containing only value
   */
  function of (value) {
    return { value: value }
  }

  /**
   *
   * @function fun-singly-linked-list.forEach
   *
   * @param {Function} f - to put in a new list
   * @param {List} list - source of elements to call f on
   */
  function forEach (f, list) {
    forEachNode(fn.compose(f, object.get('value')), list)
  }

  /**
   *
   * @function fun-singly-linked-list.forEachNode
   *
   * @param {Function} f - to put in a new list
   * @param {List} list - source of nodes to call f on
   */
  function forEachNode (f, list) {
    do {
      f(list)
      list = list.next
    } while (list != null)
  }

  /**
   *
   * @function fun-singly-linked-list.concat
   *
   * @param {List} a - first list
   * @param {List} b - second list
   *
   * @return {List} a new list a ++ b
   */
  function concat (a, b) {
    var head = copy(a)
    var cursor = head

    while (cursor.next) {
      cursor = cursor.next
    }

    cursor.next = copy(b)

    return head
  }

  /**
   *
   * @function fun-singly-linked-list.copy
   *
   * @param {List} list - to copy
   *
   * @return {List} a new copy of list
   */
  function copy (list) {
    return map(fn.id, list)
  }

  /**
   *
   * @function fun-singly-linked-list.map
   *
   * @param {Function} f - function to map over list
   * @param {List} list - to map f over
   *
   * @return {List} f mapped over list
   */
  function map (f, list) {
    var head = of(f(list.value))
    var cursor = head

    while (list.next != null) {
      cursor.next = of(f(list.next.value))
      cursor = cursor.next
      list = list.next
    }

    return head
  }
})()


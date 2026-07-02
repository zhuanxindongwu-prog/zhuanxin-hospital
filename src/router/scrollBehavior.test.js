import assert from 'node:assert/strict'
import test from 'node:test'

import { createScrollBehavior } from './scrollBehavior.js'

test('scrolls to hash targets with room for the fixed navbar', () => {
  const scrollBehavior = createScrollBehavior()

  assert.deepEqual(scrollBehavior({ hash: '#contact' }, {}, null), {
    el: '#contact',
    top: 96,
    behavior: 'smooth'
  })
})

test('restores saved browser positions', () => {
  const scrollBehavior = createScrollBehavior()
  const savedPosition = { left: 0, top: 640 }

  assert.equal(scrollBehavior({}, {}, savedPosition), savedPosition)
})

test('scrolls to page top when there is no hash or saved position', () => {
  const scrollBehavior = createScrollBehavior()

  assert.deepEqual(scrollBehavior({}, {}, null), { top: 0 })
})

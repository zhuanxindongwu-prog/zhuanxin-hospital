import assert from 'node:assert/strict'
import test from 'node:test'

import { createLineAddFriendClickHandler, isLineMobileContext } from './lineNavigation.js'

test('detects mobile LINE navigation contexts', () => {
  assert.equal(isLineMobileContext({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' }), true)
  assert.equal(isLineMobileContext({ userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8)' }), true)
  assert.equal(isLineMobileContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)' }), false)
  assert.equal(isLineMobileContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)', isCoarsePointer: true }), true)
})

test('mobile LINE clicks navigate in the current tab', () => {
  let prevented = false
  let navigatedTo = ''
  const handler = createLineAddFriendClickHandler('https://line.me/R/ti/p/%40921gquih', {
    getContext: () => ({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' }),
    navigate: (url) => {
      navigatedTo = url
    }
  })

  handler({
    preventDefault: () => {
      prevented = true
    }
  })

  assert.equal(prevented, true)
  assert.equal(navigatedTo, 'https://line.me/R/ti/p/%40921gquih')
})

test('desktop LINE clicks keep the original anchor behavior', () => {
  let prevented = false
  let navigatedTo = ''
  const handler = createLineAddFriendClickHandler('https://line.me/R/ti/p/%40921gquih', {
    getContext: () => ({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)' }),
    navigate: (url) => {
      navigatedTo = url
    }
  })

  handler({
    preventDefault: () => {
      prevented = true
    }
  })

  assert.equal(prevented, false)
  assert.equal(navigatedTo, '')
})

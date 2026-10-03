import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

// Independently transcribed doctor rows from the supplied October 2026 sheet.
// Blue and black stars both mean working. October 4 is a one-off Sunday clinic.
const roster = {
    洪榮偉: { 2: '早午', 3: '早午', 16: '早午', 17: '早午', 20: '午晚', 23: '早午', 24: '早午', 27: '午晚', 30: '早午' },
    林正: { 5: '早午晚', 8: '早午晚', 12: '早午晚', 15: '早午晚', 16: '早午', 17: '早午', 19: '早午晚', 22: '早午晚', 23: '早午', 24: '早午', 29: '早午晚', 30: '早午' },
    李繼忠: { 7: '早午', 14: '早午', 21: '早午', 28: '早午' },
    顏士容: { 2: '早午晚', 3: '早午', 4: '早午', 5: '早午晚', 6: '午晚', 9: '早午晚', 12: '早午晚', 13: '午晚', 19: '早午晚', 20: '午晚', 23: '早午晚', 27: '午晚', 30: '早午晚' },
    吳冠勳: { 3: '早午', 4: '早午', 5: '早午晚', 6: '午晚', 7: '早午', 8: '早午晚', 12: '早午晚', 13: '午晚', 14: '早午', 17: '早午', 19: '早午晚', 20: '午晚', 21: '早午', 22: '早午晚', 27: '午晚', 28: '早午', 29: '早午晚' },
    陳詩婷: { 1: '早午晚', 2: '午晚', 5: '早午', 6: '午', 7: '早午', 8: '早午晚', 9: '早午晚', 12: '早午', 13: '午', 14: '早午', 15: '早午晚', 16: '早午晚', 19: '早午', 20: '午', 21: '早午', 22: '早午晚', 23: '早午晚', 27: '午', 28: '早午', 29: '早午晚', 30: '早午晚' },
    陳炫甄: { 1: '早午', 2: '早午', 3: '早午', 6: '晚', 7: '早午', 8: '早午', 9: '早午', 13: '午晚', 14: '早午', 15: '午晚', 16: '早午', 17: '早午', 20: '午晚', 21: '早午', 22: '早午', 23: '早午', 24: '早午', 27: '午晚', 28: '早午', 29: '午晚', 30: '早午' },
    陳品齊: { 1: '午晚', 2: '早午', 3: '早午', 4: '早午', 6: '午晚', 7: '早午', 8: '午晚', 9: '早午', 13: '午晚', 14: '早午', 15: '早午', 16: '早午', 17: '早午', 20: '午晚', 21: '早午', 27: '午晚', 28: '早午', 29: '早午', 30: '早午' },
}
const specialHours = {
    '8-午-林正': '14:00–17:00', '8-晚-林正': '19:00–22:00',
    ...Object.fromEntries([5, 7, 12, 14, 19, 21, 28].map(day => [`${day}-午-陳詩婷`, '14:00–16:00'])),
}

let server, html, cards
const text = value => value.replace(/<[^>]*>/g, '').trim()
const names = value => [...value.matchAll(/<(?:span|div)[^>]*>([^<]+)<\/(?:span|div)>/g)].map(match => match[1].trim())
before(async () => {
    server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
    const { default: Schedule } = await server.ssrLoadModule('/src/components/DoctorSchedule.vue')
    html = await renderToString(createSSRApp(Schedule))
    cards = [...html.matchAll(/<article[^>]*class="day-card"[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1])
})
after(async () => { await server?.close() })

test('October schedule renders all 31 dates in order with the actual weekdays', () => {
    assert.match(html, /<h1[^>]*>2026 年 10 月獸醫師班表<\/h1>/)
    assert.equal(cards.length, 31)
    cards.forEach((card, index) => {
        assert.equal(text(card.match(/<h2[^>]*>(.*?)<\/h2>/)[1]), `10月${index + 1}日`)
        const weekday = '日一二三四五六'[new Date(Date.UTC(2026, 9, index + 1)).getUTCDay()]
        assert.match(card, new RegExp(`週${weekday}`))
    })
})

test('all 93 rendered shifts match the photographed roster including custom hours', () => {
    assert.equal(cards.length, 31)
    cards.forEach((card, index) => {
        const shifts = [...card.matchAll(/<section[^>]*class="[^"]*\bshift-row\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)]
        assert.equal(shifts.length, 3)
        shifts.forEach((shift, periodIndex) => {
            const period = '早午晚'[periodIndex]
            const expected = Object.entries(roster).filter(([, days]) => days[index + 1]?.includes(period)).map(([doctor]) => {
                const time = specialHours[`${index + 1}-${period}-${doctor}`]
                return doctor + (time ? `（${time}）` : '')
            }).sort()
            assert.deepEqual(names(shift[1]).map(name => name.replace(/\s/g, '')).sort(), expected.length ? expected : ['休診'], `10/${index + 1} ${period}診`)
        })
    })
})

test('October 4 is labelled a special Sunday clinic and other Sundays stay closed', () => {
    assert.match(cards[3], /週日/)
    assert.match(cards[3], /本月加開/)
    assert.doesNotMatch(cards[3], /全日休診/)
    for (const day of [10, 11, 18, 25, 26, 31]) assert.match(cards[day - 1], /全日休診/, `10/${day}`)
    assert.match(html, /週日[^<]*<\/dt>[\s\S]*?10\/4[^<]*加開/)
    assert.match(html, /10\/8[^<]*林正[^<]*14:00–17:00[^<]*19:00–22:00/)
})

test('desktop weeks follow calendar boundaries and expose the same roster as mobile', () => {
    const tables = [...html.matchAll(/<table[^>]*class="schedule-table"[^>]*>([\s\S]*?)<\/table>/g)]
    assert.equal(tables.length, 5)
    const ranges = [[1, 4], [5, 11], [12, 18], [19, 25], [26, 31]]
    tables.forEach((table, index) => {
        const dates = [...table[1].matchAll(/<strong[^>]*>(.*?)<\/strong>/g)].map(match => text(match[1]))
        const [first, last] = ranges[index]
        assert.deepEqual(dates, Array.from({ length: last - first + 1 }, (_, offset) => `10月${first + offset}日`))
        const rows = [...table[1].matchAll(/<tbody[^>]*>([\s\S]*?)<\/tbody>/g)][0][1]
        const periods = [...rows.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
        periods.forEach((row, period) => {
            const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)]
            assert.equal(cells.length, dates.length)
            cells.forEach((cell, offset) => {
                const mobile = [...cards[first + offset - 1].matchAll(/<section[^>]*class="[^"]*\bshift-row\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)][period][1]
                assert.deepEqual(names(cell[1]), names(mobile), `${dates[offset]} ${'早午晚'[period]}診`)
            })
        })
    })
    assert.match(tables[0][1], /本月加開/)
})

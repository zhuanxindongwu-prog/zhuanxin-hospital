import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

// Independently transcribed doctor rows from the supplied November 2026 sheet.
// Blue and black stars both mean working; green 特 marks are not clinic shifts.
// The photograph covers November 2–28. Sundays follow the existing closed rule;
// November 30 must remain explicitly pending until its roster is supplied.
const roster = {
    洪榮偉: { 3: '午晚', 6: '早午', 7: '早午', 13: '早午', 14: '早午', 20: '早午', 21: '早午', 24: '午晚', 27: '早午' },
    林正: { 13: '早午', 14: '早午', 16: '早午晚', 19: '早午晚', 20: '早午', 21: '早午', 23: '早午晚', 26: '早午晚', 27: '早午' },
    李繼忠: { 11: '早午', 18: '早午', 25: '早午' },
    顏士容: { 3: '午晚', 6: '早午晚', 7: '早午', 9: '早午晚', 10: '午晚', 12: '早午晚', 13: '早午晚', 14: '早午', 16: '晚', 17: '午晚', 20: '早午晚', 23: '早午晚', 24: '午晚', 27: '早午晚' },
    吳冠勳: { 3: '午晚', 4: '早午', 5: '早午晚', 9: '早午晚', 10: '午晚', 11: '早午', 14: '早午', 16: '早午晚', 17: '午晚', 18: '早午', 19: '早午晚', 23: '早午晚', 24: '午晚', 25: '早午' },
    陳詩婷: { 3: '午', 4: '早午', 5: '早午晚', 9: '早午', 10: '午', 11: '早午', 12: '早午晚', 13: '早午晚', 16: '早午', 17: '午', 18: '早午', 19: '早午晚', 20: '早午晚', 23: '早午', 24: '午', 25: '早午', 26: '早午晚', 27: '早午晚' },
    陳炫甄: { 3: '午晚', 4: '早午', 13: '早午', 14: '早午', 17: '午晚', 18: '早午', 19: '午晚', 20: '早午', 21: '早午', 24: '午晚', 25: '早午', 26: '午晚', 27: '早午' },
    陳品齊: { 3: '午晚', 4: '早午', 5: '午晚', 6: '早午', 7: '早午', 10: '午晚', 11: '早午', 12: '午晚', 13: '早午', 14: '早午', 17: '午晚', 18: '早午', 19: '早午', 20: '早午', 21: '早午', 24: '午晚', 25: '早午', 26: '早午', 27: '早午' },
}
const specialHours = {
    ...Object.fromEntries([4, 9, 11, 16, 18, 23, 25].map(day => [`${day}-午-陳詩婷`, '14:00–16:00'])),
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

test('November schedule renders all 30 dates in order with the actual weekdays', () => {
    assert.match(html, /<h1[^>]*>2026 年 11 月獸醫師班表<\/h1>/)
    assert.equal(cards.length, 30)
    cards.forEach((card, index) => {
        assert.equal(text(card.match(/<h2[^>]*>(.*?)<\/h2>/)[1]), `11月${index + 1}日`)
        const weekday = '日一二三四五六'[new Date(Date.UTC(2026, 10, index + 1)).getUTCDay()]
        assert.match(card, new RegExp(`週${weekday}`))
    })
})

test('published shifts match the photographed November roster including custom hours', () => {
    assert.equal(cards.length, 30)
    cards.slice(0, 29).forEach((card, index) => {
        const shifts = [...card.matchAll(/<section[^>]*class="[^"]*\bshift-row\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)]
        assert.equal(shifts.length, 3)
        shifts.forEach((shift, periodIndex) => {
            const period = '早午晚'[periodIndex]
            const expected = Object.entries(roster).filter(([, days]) => days[index + 1]?.includes(period)).map(([doctor]) => {
                const time = specialHours[`${index + 1}-${period}-${doctor}`]
                return doctor + (time ? `（${time}）` : '')
            }).sort()
            assert.deepEqual(names(shift[1]).map(name => name.replace(/\s/g, '')).sort(), expected.length ? expected : ['休診'], `11/${index + 1} ${period}診`)
        })
    })
})

test('Sundays and blank clinic days stay closed while the unprovided November 30 stays pending', () => {
    for (const day of [1, 2, 8, 15, 22, 28, 29]) assert.match(cards[day - 1], /全日休診/, `11/${day}`)
    assert.match(html, /週日[^<]*<\/dt>[\s\S]*?休診/)
    assert.match(html, /11\/30[^<]*班表待公告/)
    assert.match(cards[29], /班表待公告/)
    assert.doesNotMatch(cards[29], /全日休診/)
    const shifts = [...cards[29].matchAll(/<section[^>]*class="[^"]*\bshift-row\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)]
    assert.equal(shifts.length, 3)
    for (const shift of shifts) assert.deepEqual(names(shift[1]), ['班表待公告，請來電確認'])
    assert.doesNotMatch(html, /2026 年 10 月|10\/4|10\/8|本月加開/)
})

test('desktop weeks follow calendar boundaries and expose the same roster as mobile', () => {
    const tables = [...html.matchAll(/<table[^>]*class="schedule-table"[^>]*>([\s\S]*?)<\/table>/g)]
    assert.equal(tables.length, 6)
    const ranges = [[1, 1], [2, 8], [9, 15], [16, 22], [23, 29], [30, 30]]
    tables.forEach((table, index) => {
        const dates = [...table[1].matchAll(/<strong[^>]*>(.*?)<\/strong>/g)].map(match => text(match[1]))
        const [first, last] = ranges[index]
        assert.deepEqual(dates, Array.from({ length: last - first + 1 }, (_, offset) => `11月${first + offset}日`))
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
})

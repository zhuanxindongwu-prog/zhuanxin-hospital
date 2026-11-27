import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

// Independently transcribed doctor rows from the supplied December 2026 sheet.
// Blue and black stars both mean working; green 特 marks are not clinic shifts.
const roster = {
    洪榮偉: { 1: '午晚', 4: '早午', 5: '早午', 8: '午晚', 11: '早午', 15: '午晚', 18: '早午', 19: '早午', 22: '午晚', 26: '早午', 29: '午晚' },
    林正: { 3: '早午晚', 4: '早午', 5: '早午', 7: '早午晚', 10: '早午晚', 11: '早午', 14: '早午晚', 17: '早午晚', 18: '早午', 19: '早午', 21: '早午晚', 24: '早午晚', 28: '早午晚', 31: '早午晚' },
    李繼忠: { 2: '早午', 9: '早午', 16: '早午', 23: '早午', 30: '早午' },
    顏士容: { 1: '午晚', 4: '早午晚', 5: '早午', 7: '早午晚', 8: '午晚', 11: '早午晚', 14: '早午晚', 15: '午晚', 18: '早午晚', 21: '晚', 22: '午晚', 26: '早午', 28: '晚', 29: '午晚' },
    吳冠勳: { 1: '午晚', 2: '早午', 5: '早午', 7: '早午晚', 8: '午晚', 9: '早午', 10: '早午晚', 14: '早午晚', 15: '午晚', 16: '早午', 17: '早午晚', 19: '早午', 21: '早午晚', 22: '午晚', 28: '早午晚', 29: '午晚' },
    陳詩婷: { 1: '午', 2: '早午', 4: '早午晚', 7: '早午', 8: '午', 9: '早午', 10: '早午晚', 11: '早午晚', 14: '早午', 15: '午', 16: '早午', 17: '早午晚', 18: '早', 21: '早午', 22: '午', 23: '早午', 24: '早午晚', 28: '早午', 29: '午', 30: '早午', 31: '早午晚' },
    陳炫甄: { 1: '午晚', 2: '早午', 4: '早午', 5: '早午', 8: '午晚', 9: '早午', 10: '早午', 11: '早午', 15: '午晚', 16: '早午', 17: '早午', 19: '早午', 22: '午晚', 23: '早午', 24: '午晚', 29: '午晚', 30: '早午', 31: '早午' },
    陳品齊: { 1: '午晚', 2: '早午', 4: '早午', 5: '早午', 8: '午晚', 9: '早午', 10: '午晚', 11: '早午', 15: '午晚', 16: '早午', 17: '午晚', 18: '早午', 19: '早午', 22: '午晚', 23: '早午', 24: '早午', 26: '早午', 29: '午晚', 30: '早午', 31: '午晚' },
}
const specialHours = {
    ...Object.fromEntries([2, 7, 9, 14, 16, 21, 23, 28, 30].map(day => [`${day}-午-陳詩婷`, '14:00–16:00'])),
    '24-早-陳詩婷': '12:00–14:00',
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

test('December schedule renders all 31 dates in order with the actual weekdays', () => {
    assert.match(html, /<h1[^>]*>2026 年 12 月獸醫師班表<\/h1>/)
    assert.equal(cards.length, 31)
    cards.forEach((card, index) => {
        assert.equal(text(card.match(/<h2[^>]*>(.*?)<\/h2>/)[1]), `12月${index + 1}日`)
        const weekday = '日一二三四五六'[new Date(Date.UTC(2026, 11, index + 1)).getUTCDay()]
        assert.match(card, new RegExp(`週${weekday}`))
    })
})

test('published shifts match the photographed December roster including custom hours', () => {
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
            assert.deepEqual(names(shift[1]).map(name => name.replace(/\s/g, '')).sort(), expected.length ? expected : ['休診'], `12/${index + 1} ${period}診`)
        })
    })
})

test('the notice and calendar show full-day closures on Sundays, December 12 and December 25', () => {
    const closedDays = cards.flatMap((card, index) => card.includes('全日休診') ? [index + 1] : [])
    assert.deepEqual(closedDays, [6, 12, 13, 20, 25, 27])
    assert.match(html, /週日[^<]*<\/dt>[\s\S]*?休診/)
    assert.match(html, /12\/12（六）、12\/25（五）及每週日全日休診/)
    assert.doesNotMatch(html, /2026 年 11 月|班表待公告/)
})

test('desktop weeks follow calendar boundaries and expose the same roster as mobile', () => {
    const tables = [...html.matchAll(/<table[^>]*class="schedule-table"[^>]*>([\s\S]*?)<\/table>/g)]
    assert.equal(tables.length, 5)
    const ranges = [[1, 6], [7, 13], [14, 20], [21, 27], [28, 31]]
    tables.forEach((table, index) => {
        const dates = [...table[1].matchAll(/<strong[^>]*>(.*?)<\/strong>/g)].map(match => text(match[1]))
        const [first, last] = ranges[index]
        assert.deepEqual(dates, Array.from({ length: last - first + 1 }, (_, offset) => `12月${first + offset}日`))
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

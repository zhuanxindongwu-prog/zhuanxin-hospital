<template>
    <main class="schedule-page">
        <div class="container">
            <section class="schedule-hero">
                <div>
                    <p class="schedule-label">Doctor Schedule</p>
                    <h1>2026 年 6 月醫師班表</h1>
                    <p class="schedule-intro">
                        查詢每日早、午、晚門診醫師。班表如有臨時異動，請於來院前電話確認。
                    </p>
                </div>

                <aside class="hours-panel">
                    <p>門診時間</p>
                    <dl>
                        <div>
                            <dt>週一、四、五</dt>
                            <dd>10:00 - 21:30</dd>
                        </div>
                        <div>
                            <dt>週二</dt>
                            <dd>13:00 - 21:00</dd>
                        </div>
                        <div>
                            <dt>週三、六</dt>
                            <dd>10:00 - 18:00</dd>
                        </div>
                        <div>
                            <dt>週日</dt>
                            <dd>休診</dd>
                        </div>
                    </dl>
                </aside>
            </section>

            <section class="schedule-notice">
                <i class="bi bi-info-circle"></i>
                <p>本頁為 2026 年 6 月班表。實際門診仍以院內公告與電話確認為準。</p>
                <a href="tel:0223633016">02-2363-3016</a>
            </section>

            <section class="desktop-schedule" aria-label="2026 年 6 月桌機版醫師班表">
                <article v-for="week in weeks" :key="week.id" class="week-card">
                    <header class="week-heading">
                        <p>{{ week.label }}</p>
                        <span>{{ week.range }}</span>
                    </header>

                    <div class="table-scroll">
                        <table class="schedule-table">
                            <thead>
                                <tr>
                                    <th class="period-heading">時段</th>
                                    <th v-for="day in week.days" :key="day.date">
                                        <span>{{ day.weekday }}</span>
                                        <strong>{{ day.date }}</strong>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="period in periods" :key="period.key">
                                    <th class="period">{{ period.label }}</th>
                                    <td v-for="day in week.days" :key="day.date + period.key"
                                        :class="{ closed: isClosed(day, period.key) }">
                                        <div v-for="doctor in day.shifts[period.key]" :key="doctor" class="doctor">
                                            {{ doctor }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>

            <section class="mobile-schedule" aria-label="2026 年 6 月手機版醫師班表">
                <article v-for="day in days" :key="day.date" class="day-card">
                    <header>
                        <div>
                            <p>{{ day.weekday }}</p>
                            <h2>{{ day.date }}</h2>
                        </div>
                        <span v-if="isFullDayClosed(day)" class="closed-badge">全日休診</span>
                    </header>

                    <div class="shift-list">
                        <section v-for="period in periods" :key="period.key" class="shift-row"
                            :class="{ closed: isClosed(day, period.key) }">
                            <h3>{{ period.label }}</h3>
                            <div>
                                <span v-for="doctor in day.shifts[period.key]" :key="doctor">{{ doctor }}</span>
                            </div>
                        </section>
                    </div>
                </article>
            </section>
        </div>
    </main>
</template>

<script setup>
const periods = [
    { key: 'morning', label: '早診' },
    { key: 'afternoon', label: '午診' },
    { key: 'evening', label: '晚診' },
]

const closed = ['休診']

const rawDays = [
    ['6月1日', '週一', ['顏士容', '吳冠勳', '陳詩婷'], ['顏士容', '吳冠勳', '陳詩婷'], ['顏士容', '吳冠勳']],
    ['6月2日', '週二', closed, ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊']],
    ['6月3日', '週三', ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], closed],
    ['6月4日', '週四', ['林　正', '陳詩婷', '陳品齊'], ['林　正', '陳詩婷', '陳炫甄', '陳品齊'], ['林　正', '吳冠勳', '陳詩婷', '陳炫甄']],
    ['6月5日', '週五', ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['顏士容', '陳詩婷']],
    ['6月6日', '週六', ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'], closed],
    ['6月7日', '週日', closed, closed, closed],
    ['6月8日', '週一', ['林　正', '顏士容', '吳冠勳', '陳詩婷'], ['林　正', '顏士容', '吳冠勳', '陳詩婷'], ['林　正', '顏士容', '吳冠勳']],
    ['6月9日', '週二', closed, ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊']],
    ['6月10日', '週三', ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], closed],
    ['6月11日', '週四', ['林　正', '陳詩婷', '陳炫甄'], ['林　正', '陳詩婷', '陳炫甄', '陳品齊'], ['林　正', '陳詩婷', '陳品齊']],
    ['6月12日', '週五', ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['顏士容', '陳詩婷']],
    ['6月13日', '週六', ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'], closed],
    ['6月14日', '週日', closed, closed, closed],
    ['6月15日', '週一', ['林　正', '顏士容', '吳冠勳', '陳詩婷', '陳品齊'], ['林　正', '顏士容', '吳冠勳', '陳詩婷', '陳品齊'], ['林　正', '顏士容', '吳冠勳']],
    ['6月16日', '週二', closed, ['顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['顏士容', '吳冠勳', '陳炫甄', '陳品齊']],
    ['6月17日', '週三', ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], closed],
    ['6月18日', '週四', ['林　正', '陳詩婷', '陳品齊'], ['林　正', '陳詩婷', '陳炫甄', '陳品齊'], ['林　正', '吳冠勳', '陳詩婷', '陳炫甄']],
    ['6月19日', '週五', closed, closed, closed],
    ['6月20日', '週六', ['洪榮偉', '林　正', '吳冠勳', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '吳冠勳', '陳炫甄', '陳品齊'], closed],
    ['6月21日', '週日', closed, closed, closed],
    ['6月22日', '週一', ['林　正', '顏士容', '吳冠勳', '陳詩婷'], ['林　正', '顏士容', '吳冠勳', '陳詩婷'], ['林　正', '顏士容', '吳冠勳']],
    ['6月23日', '週二', closed, ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊']],
    ['6月24日', '週三', ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], closed],
    ['6月25日', '週四', ['林　正', '陳詩婷', '陳炫甄'], ['林　正', '陳詩婷', '陳炫甄', '陳品齊'], ['林　正', '吳冠勳', '陳詩婷', '陳品齊']],
    ['6月26日', '週五', ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'], ['顏士容', '陳詩婷']],
    ['6月27日', '週六', closed, closed, closed],
    ['6月28日', '週日', closed, closed, closed],
    ['6月29日', '週一', ['林　正', '顏士容', '吳冠勳', '陳詩婷', '陳品齊'], ['林　正', '顏士容', '吳冠勳', '陳詩婷', '陳品齊'], ['林　正', '顏士容', '吳冠勳']],
    ['6月30日', '週二', closed, ['顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'], ['顏士容', '吳冠勳', '陳炫甄', '陳品齊']],
]

const days = rawDays.map(([date, weekday, morning, afternoon, evening]) => ({
    date,
    weekday,
    shifts: { morning, afternoon, evening },
}))

const weeks = Array.from({ length: 5 }, (_, index) => {
    const weekDays = days.slice(index * 7, index * 7 + 7)
    return {
        id: index + 1,
        label: `第 ${index + 1} 週`,
        range: `${weekDays[0].date} - ${weekDays[weekDays.length - 1].date}`,
        days: weekDays,
    }
})

const isClosed = (day, period) => day.shifts[period].includes('休診')
const isFullDayClosed = day => periods.every(period => isClosed(day, period.key))
</script>

<style scoped>
.schedule-page {
    padding: 7.5rem 0 5rem;
    background: #f4f8f6;
    color: #173b3d;
}

.schedule-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 2rem;
    align-items: end;
    margin-bottom: 1.25rem;
    padding: 2.2rem;
    border-radius: 0.5rem;
    background: #ffffff;
    border-top: 5px solid #116d70;
    box-shadow: 0 1rem 2.5rem rgba(19, 79, 78, 0.08);
}

.schedule-label,
.hours-panel > p,
.week-heading p {
    color: #6f9e53;
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.schedule-hero h1 {
    margin: 0.4rem 0 0;
    color: #116d70;
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.12;
}

.schedule-intro {
    max-width: 720px;
    margin: 1rem 0 0;
    color: #527173;
    line-height: 1.8;
}

.hours-panel {
    padding: 1.1rem 1.2rem;
    border-radius: 0.4rem;
    background: #edf5ec;
}

.hours-panel dl {
    display: grid;
    gap: 0.45rem;
    margin: 0.7rem 0 0;
}

.hours-panel dl > div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.hours-panel dt,
.hours-panel dd {
    color: #285d60;
    font-size: 0.88rem;
    font-weight: 800;
}

.hours-panel dd {
    margin: 0;
}

.schedule-notice {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.5rem;
    padding: 0.95rem 1rem;
    border-left: 4px solid #6f9e53;
    background: #e7f1e5;
    color: #3c6868;
}

.schedule-notice p {
    margin: 0;
    line-height: 1.7;
}

.schedule-notice a {
    margin-left: auto;
    color: #116d70;
    font-weight: 900;
    text-decoration: none;
    white-space: nowrap;
}

.week-card {
    margin-top: 1rem;
    overflow: hidden;
    border: 1px solid rgba(29, 105, 101, 0.18);
    border-radius: 0.5rem;
    background: #ffffff;
}

.week-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid rgba(29, 105, 101, 0.12);
}

.week-heading p,
.week-heading span {
    margin: 0;
}

.week-heading span {
    color: #527173;
    font-size: 0.9rem;
    font-weight: 800;
}

.schedule-table {
    width: 100%;
    min-width: 960px;
    border-collapse: collapse;
    table-layout: fixed;
}

.schedule-table th,
.schedule-table td {
    border: 1px solid rgba(29, 105, 101, 0.12);
    padding: 0.8rem 0.45rem;
    text-align: center;
    vertical-align: middle;
}

.schedule-table thead th {
    background: #e5f0e2;
}

.schedule-table thead span,
.schedule-table thead strong {
    display: block;
}

.schedule-table thead span {
    color: #6f9e53;
    font-size: 0.76rem;
}

.schedule-table thead strong {
    color: #285d60;
    font-size: 0.95rem;
}

.period-heading,
.period {
    width: 62px;
}

.period {
    background: #f3f8f1;
    color: #285d60;
    font-weight: 900;
}

.doctor {
    color: #116d70;
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.55;
    white-space: nowrap;
}

.closed {
    background: #f7faf5;
}

.closed .doctor {
    color: #7d948d;
}

.mobile-schedule {
    display: none;
}

@media (max-width: 991px) {
    .schedule-hero {
        grid-template-columns: 1fr;
        align-items: start;
    }

    .desktop-schedule {
        display: none;
    }

    .mobile-schedule {
        display: grid;
        gap: 0.85rem;
    }

    .day-card {
        padding: 1rem;
        border: 1px solid rgba(29, 105, 101, 0.18);
        border-radius: 0.45rem;
        background: #ffffff;
    }

    .day-card header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(29, 105, 101, 0.12);
    }

    .day-card header p {
        margin: 0;
        color: #6f9e53;
        font-size: 0.8rem;
        font-weight: 900;
    }

    .day-card h2 {
        margin: 0.15rem 0 0;
        color: #116d70;
        font-size: 1.2rem;
        font-weight: 900;
    }

    .closed-badge {
        padding: 0.35rem 0.65rem;
        border-radius: 999px;
        background: #edf3ec;
        color: #6c807b;
        font-size: 0.78rem;
        font-weight: 900;
    }

    .shift-list {
        display: grid;
        gap: 0.55rem;
        margin-top: 0.75rem;
    }

    .shift-row {
        display: grid;
        grid-template-columns: 52px minmax(0, 1fr);
        gap: 0.7rem;
        padding: 0.65rem 0.7rem;
        border-radius: 0.35rem;
        background: #f5f9f4;
    }

    .shift-row h3 {
        margin: 0;
        color: #527173;
        font-size: 0.9rem;
        font-weight: 900;
    }

    .shift-row div {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 0.65rem;
    }

    .shift-row span {
        color: #116d70;
        font-size: 0.9rem;
        font-weight: 800;
    }

    .shift-row.closed span {
        color: #7d948d;
    }
}

@media (max-width: 576px) {
    .schedule-page {
        padding: 5.75rem 0 3.5rem;
    }

    .schedule-hero {
        padding: 1.35rem;
    }

    .schedule-hero h1 {
        font-size: 2.15rem;
    }

    .schedule-notice {
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .schedule-notice a {
        width: 100%;
        margin-left: 1.65rem;
    }
}
</style>

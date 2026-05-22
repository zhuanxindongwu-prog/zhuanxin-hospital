<template>
    <section class="schedule-page">
        <div class="container">
            <div class="schedule-card">
                <header class="schedule-header">
                    <div>
                        <p class="schedule-label">Doctor Schedule</p>
                        <h1>2026年5月份班表</h1>
                        <p>
                            週一、四、五：10:00 - 21:30<br />
                            週二：13:00 - 21:00<br />
                            週三、六：10:00 - 18:00
                        </p>
                    </div>
                </header>

                <div v-for="week in weeks" :key="week.id" class="week-block">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th v-for="day in week.days" :key="day.date">
                                    {{ day.date }}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="period in periods" :key="period">
                                <th class="period">{{ period }}</th>

                                <td v-for="day in week.days" :key="day.date + period"
                                    :class="{ closed: getShift(day.date, period).includes('休診') }">
                                    <div v-for="doctor in getShift(day.date, period)" :key="doctor" class="doctor">
                                        {{ doctor }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="schedule-note">
                    實際門診仍以院內公告與電話預約為準。
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
const periods = ['早', '午', '晚']

const weeks = [
    {
        id: 1,
        days: [
            { date: '5月1日' },
            { date: '5月2日' },
            { date: '5月3日' },
        ],
    },
    {
        id: 2,
        days: [
            { date: '5月4日' },
            { date: '5月5日' },
            { date: '5月6日' },
            { date: '5月7日' },
            { date: '5月8日' },
            { date: '5月9日' },
            { date: '5月10日' },
        ],
    },
    {
        id: 3,
        days: [
            { date: '5月11日' },
            { date: '5月12日' },
            { date: '5月13日' },
            { date: '5月14日' },
            { date: '5月15日' },
            { date: '5月16日' },
            { date: '5月17日' },
        ],
    },
    {
        id: 4,
        days: [
            { date: '5月18日' },
            { date: '5月19日' },
            { date: '5月20日' },
            { date: '5月21日' },
            { date: '5月22日' },
            { date: '5月23日' },
            { date: '5月24日' },
        ],
    },
    {
        id: 5,
        days: [
            { date: '5月25日' },
            { date: '5月26日' },
            { date: '5月27日' },
            { date: '5月28日' },
            { date: '5月29日' },
            { date: '5月30日' },
            { date: '5月31日' },
        ],
    },
]

const schedule = {
    '5月1日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },
    '5月2日': {
        早: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },
    '5月3日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },

    '5月4日': {
        早: ['林　正', '顏士容', '吳冠勳', '陳詩婷'],
        午: ['林　正', '顏士容', '吳冠勳', '陳詩婷'],
        晚: ['林　正', '顏士容', '吳冠勳'],
    },
    '5月5日': {
        早: ['休診'],
        午: ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
    },
    '5月6日': {
        早: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },
    '5月7日': {
        早: ['林　正', '陳詩婷', '陳炫甄'],
        午: ['林　正', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['林　正', '陳詩婷', '陳品齊'],
    },
    '5月8日': {
        早: ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['顏士容', '陳詩婷'],
    },
    '5月9日': {
        早: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳品齊'],
        午: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳品齊'],
        晚: ['休診'],
    },
    '5月10日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },
    '5月11日': {
        早: ['林　正', '陳詩婷'],
        午: ['林　正', '陳詩婷'],
        晚: ['林　正', '陳炫甄', '陳品齊'],
    },
    '5月12日': {
        早: ['休診'],
        午: ['陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['林　正', '陳炫甄', '陳品齊'],
    },
    '5月13日': {
        早: ['李繼忠', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['李繼忠', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },
    '5月14日': {
        早: ['林　正', '陳詩婷', '陳品齊'],
        午: ['林　正', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['林　正', '陳詩婷', '陳炫甄'],
    },
    '5月15日': {
        早: ['洪榮偉', '林　正', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '林　正', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['陳詩婷'],
    },
    '5月16日': {
        早: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },
    '5月17日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },
    '5月18日': {
        早: ['林　正', '顏士容', '吳冠勳', '陳詩婷'],
        午: ['林　正', '顏士容', '吳冠勳', '陳詩婷'],
        晚: ['林　正', '顏士容', '吳冠勳'],
    },
    '5月19日': {
        早: ['休診'],
        午: ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
    },
    '5月20日': {
        早: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },
    '5月21日': {
        早: ['林　正', '陳詩婷', '陳品齊'],
        午: ['林　正', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['林　正', '吳冠勳', '陳詩婷', '陳炫甄'],
    },
    '5月22日': {
        早: ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄'],
        午: ['洪榮偉', '林　正', '顏士容', '陳詩婷', '陳炫甄'],
        晚: ['顏士容', '陳詩婷'],
    },
    '5月23日': {
        早: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄'],
        午: ['洪榮偉', '林　正', '顏士容', '吳冠勳', '陳炫甄'],
        晚: ['休診'],
    },
    '5月24日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },
    '5月25日': {
        早: ['林　正', '顏士容', '吳冠勳', '陳詩婷'],
        午: ['顏士容', '吳冠勳', '陳詩婷'],
        晚: ['顏士容', '吳冠勳'],
    },

    '5月26日': {
        早: ['休診'],
        午: ['洪榮偉', '顏士容', '吳冠勳', '陳詩婷', '陳炫甄'],
        晚: ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄'],
    },

    '5月27日': {
        早: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['李繼忠', '吳冠勳', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },

    '5月28日': {
        早: ['陳詩婷', '陳炫甄'],
        午: ['陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['陳詩婷', '陳品齊'],
    },

    '5月29日': {
        早: ['洪榮偉', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '顏士容', '陳詩婷', '陳炫甄', '陳品齊'],
        晚: ['顏士容', '陳詩婷'],
    },

    '5月30日': {
        早: ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        午: ['洪榮偉', '顏士容', '吳冠勳', '陳炫甄', '陳品齊'],
        晚: ['休診'],
    },

    '5月31日': {
        早: ['休診'],
        午: ['休診'],
        晚: ['休診'],
    },


}

const getShift = (date, period) => {
    return schedule[date]?.[period] || ['待補']
}
</script>

<style scoped>
.schedule-page {
    padding: 72px 0;
    background: #f5faf5;
}

.schedule-card {
    background: white;
    border: 1px solid rgba(18, 105, 103, 0.25);
    border-radius: 28px;
    padding: 32px;
    box-shadow: 0 18px 45px rgba(0, 80, 80, 0.08);
}

.schedule-header {
    margin-bottom: 32px;
}

.schedule-label {
    color: #7da65f;
    font-weight: 700;
    letter-spacing: 0.08em;
}

.schedule-header h1 {
    color: #0f6d71;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
}

.schedule-header p {
    color: #245f61;
    font-weight: 600;
    line-height: 1.8;
}

.week-block {
    margin-bottom: 18px;
    overflow-x: auto;
}

.schedule-table {
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    table-layout: fixed;
    background: rgba(248, 252, 247, 0.95);
}

.schedule-table th,
.schedule-table td {
    border: 1px solid rgba(25, 104, 96, 0.16);
    padding: 12px 8px;
    text-align: center;
    vertical-align: middle;
}

.schedule-table thead th {
    background: #dfeedd;
    color: #295e5c;
    font-weight: 700;
}

.period {
    width: 56px;
    background: #f4f8f1;
    color: #2d5f5d;
    font-weight: 800;
}

.doctor {
    color: #0f6d71;
    font-weight: 700;
    line-height: 1.65;
    white-space: nowrap;
}

.closed {
    background: #f8fbf6;
}

.schedule-note {
    margin-top: 20px;
    color: #6f827c;
    font-size: 0.95rem;
    text-align: right;
}

@media (max-width: 768px) {
    .schedule-card {
        padding: 20px;
        border-radius: 20px;
    }

    .schedule-note {
        text-align: left;
    }
}
</style>
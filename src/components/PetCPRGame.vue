<template>
    <section class="cpr-page py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="text-center mb-4">
                        <span class="badge rounded-pill text-bg-danger mb-3">Pet CPR Training Game</span>
                        <h1 class="fw-bold mb-3">犬貓 CPR 節奏練習</h1>
                        <p class="lead text-muted mb-0">
                            跟著節奏進行胸外按壓，練習接近每分鐘 100–120 次的 CPR 按壓速度。
                        </p>
                    </div>

                    <div class="game-card shadow-lg rounded-4 overflow-hidden">
                        <div class="game-header p-4">
                            <div class="row g-3 align-items-center">
                                <div class="col-md-2 col-6">
                                    <div class="stat-box">
                                        <span>剩餘時間</span>
                                        <strong>{{ timeLeft }} 秒</strong>
                                    </div>
                                </div>

                                <div class="col-md-2 col-6">
                                    <div class="stat-box">
                                        <span>分數</span>
                                        <strong>{{ score }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-2 col-6">
                                    <div class="stat-box">
                                        <span>連擊</span>
                                        <strong>{{ combo }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="stat-box">
                                        <span>目前速度</span>
                                        <strong :class="judgementClass">{{ currentCpm || '--' }} 次/分</strong>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="stat-box">
                                        <span>節奏提示</span>
                                        <strong :class="judgementClass">{{ judgementText }}</strong>
                                        <small class="d-block text-muted mt-1">{{ rhythmHint }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="canvas-wrap" :class="canvasWrapClass">
                            <canvas ref="canvasRef" width="900" height="520" class="cpr-canvas"
                                @pointerdown="handleCompression"></canvas>

                            <div v-if="gameState === 'ready'" class="overlay-panel">
                                <h2>準備開始</h2>
                                <p>
                                    點擊畫面或按空白鍵進行胸外按壓。重點不是追著指標按，
                                    而是讓自己的節奏穩定維持在 100–120 次/分。
                                </p>
                                <button class="btn btn-danger btn-lg rounded-pill px-4" @click="startGame">
                                    開始練習
                                </button>
                            </div>

                            <div v-if="gameState === 'finished'" class="overlay-panel">
                                <h2>練習結束</h2>
                                <p class="mb-2">總分：{{ score }}</p>
                                <p class="mb-4">{{ finalComment }}</p>
                                <button class="btn btn-danger btn-lg rounded-pill px-4" @click="resetGame">
                                    再練一次
                                </button>
                            </div>
                        </div>

                        <div class="p-4 bg-white">
                            <div class="row g-4">
                                <div class="col-md-4">
                                    <h5 class="fw-bold">操作方式</h5>
                                    <p class="text-muted mb-0">
                                        使用滑鼠點擊畫面，或按鍵盤空白鍵。每一下代表一次胸外按壓。
                                    </p>
                                </div>

                                <div class="col-md-4">
                                    <h5 class="fw-bold">節奏目標</h5>
                                    <p class="text-muted mb-0">
                                        目標節奏約為每分鐘 100–120 下，也就是每 0.5–0.6 秒按壓一次。
                                    </p>
                                </div>

                                <div class="col-md-4">
                                    <h5 class="fw-bold">教學提醒</h5>
                                    <p class="text-muted mb-0">
                                        此遊戲用於節奏概念練習，實際急救仍需依獸醫急救訓練與臨床指引操作。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref(null)
const ctx = ref(null)

const gameState = ref('ready')
const timeLeft = ref(30)
const score = ref(0)
const combo = ref(0)
const judgementText = ref('等待開始')
const judgementType = ref('neutral')
const rhythmHint = ref('開始後會顯示目前節奏')
const currentCpm = ref(0)

const compressionHistory = ref([])
const lastCompressionTime = ref(null)

const heartScale = ref(1)
const heartGlow = ref(0)
const shockWave = ref(0)
const shakePower = ref(0)
const flashAlpha = ref(0)
const flashColor = ref('rgba(255,255,255,0)')
const speedColor = ref('#f8f9fa')
const waveOffset = ref(0)
const particles = ref([])
const floatingTexts = ref([])
const petEnergy = ref(0.45)
const guideBeatPulse = ref(0)
const guideBeatProgress = ref(0)
const nextGuideBeatTime = ref(0)
const guideText = ref('跟著節拍按壓')
const streakMessage = ref('')
const bpmTrend = ref('stable')
const beatFlash = ref(0)
const lanePulse = ref(0)
const accuracyRing = ref(0)

let animationId = null
let timerId = null
let uid = 0

const GAME_SECONDS = 30
const IDEAL_MIN_INTERVAL = 500
const IDEAL_MAX_INTERVAL = 600
const ACCEPTABLE_MIN_INTERVAL = 430
const ACCEPTABLE_MAX_INTERVAL = 700
const IDEAL_MIN_CPM = 100
const IDEAL_MAX_CPM = 120
const GUIDE_CPM = 110
const GUIDE_INTERVAL = 60000 / GUIDE_CPM

const judgementClass = computed(() => ({
    'text-secondary': judgementType.value === 'neutral',
    'text-success': judgementType.value === 'good',
    'text-warning': judgementType.value === 'ok',
    'text-danger': judgementType.value === 'bad'
}))

const canvasWrapClass = computed(() => ({
    'is-good': judgementType.value === 'good',
    'is-ok': judgementType.value === 'ok',
    'is-bad': judgementType.value === 'bad'
}))

const finalComment = computed(() => {
    if (score.value >= 850) return '節奏非常穩定，已經很接近理想 CPR 按壓速度。'
    if (score.value >= 500) return '節奏大致不錯，可以再練習讓按壓間隔更穩定。'
    return '節奏還不夠穩定，建議重新練習，先抓住每 0.5–0.6 秒一次的感覺。'
})

function makeId() {
    uid += 1
    return uid
}

function resetRuntimeState() {
    score.value = 0
    combo.value = 0
    streakMessage.value = '重新抓節奏'
    currentCpm.value = 0
    compressionHistory.value = []
    lastCompressionTime.value = null
    particles.value = []
    floatingTexts.value = []
    petEnergy.value = 0.45
    speedColor.value = '#f8f9fa'
    heartScale.value = 1
    heartGlow.value = 0
    shockWave.value = 0
    shakePower.value = 0
    flashAlpha.value = 0
    guideBeatPulse.value = 0
    guideBeatProgress.value = 0
    nextGuideBeatTime.value = 0
    guideText.value = '跟著節拍按壓'
}

function startGame() {
    if (timerId) window.clearInterval(timerId)

    resetRuntimeState()
    gameState.value = 'playing'
    timeLeft.value = GAME_SECONDS
    judgementText.value = '開始按壓'
    rhythmHint.value = '目標 100–120 次/分，不需要等指標，請維持穩定節奏'
    judgementType.value = 'neutral'

    nextGuideBeatTime.value = performance.now() + GUIDE_INTERVAL
    guideBeatPulse.value = 1
    beatFlash.value = 1
    lanePulse.value = 1
    accuracyRing.value = 1

    timerId = window.setInterval(() => {
        timeLeft.value -= 1
        if (timeLeft.value <= 0) finishGame()
    }, 1000)
}

function finishGame() {
    gameState.value = 'finished'
    if (timerId) window.clearInterval(timerId)
    timerId = null
}

function resetGame() {
    if (timerId) window.clearInterval(timerId)
    timerId = null
    resetRuntimeState()
    gameState.value = 'ready'
    timeLeft.value = GAME_SECONDS
    judgementText.value = '等待開始'
    rhythmHint.value = '開始後會顯示目前節奏'
    judgementType.value = 'neutral'
}

function handleCompression() {
    if (gameState.value === 'ready') {
        startGame()
        return
    }

    if (gameState.value !== 'playing') return

    const now = performance.now()
    heartScale.value = 0.78
    heartGlow.value = 1
    shockWave.value = 1
    shakePower.value = 3
    judgeGuideBeatTiming(now)

    if (lastCompressionTime.value === null) {
        score.value += 10
        combo.value = 1
        currentCpm.value = 0
        judgementText.value = '第一下！'
        rhythmHint.value = '繼續穩定按壓，目標 100–120 次/分'
        judgementType.value = 'neutral'
        addFloatingText('START', 10, 'neutral')
        addParticles('neutral')
    } else {
        evaluateCompression(now - lastCompressionTime.value)
    }

    lastCompressionTime.value = now
    compressionHistory.value.push(now)
    if (compressionHistory.value.length > 30) compressionHistory.value.shift()
}

function judgeGuideBeatTiming(now) {
    if (!nextGuideBeatTime.value) return

    const distanceToBeat = Math.abs(now - nextGuideBeatTime.value)
    const distanceToPreviousBeat = Math.abs(now - (nextGuideBeatTime.value - GUIDE_INTERVAL))
    const closestDistance = Math.min(distanceToBeat, distanceToPreviousBeat)

    if (closestDistance <= 90) guideText.value = '踩到節拍！'
    else if (closestDistance <= 160) guideText.value = '接近節拍'
    else guideText.value = '跟著光圈收合時按'
}

function evaluateCompression(interval) {
    const previousCpm = currentCpm.value
    const cpm = Math.round(60000 / interval)
    currentCpm.value = cpm

    if (previousCpm > 0) {
        if (cpm - previousCpm > 8) bpmTrend.value = 'up'
        else if (previousCpm - cpm > 8) bpmTrend.value = 'down'
        else bpmTrend.value = 'stable'
    }

    if (interval >= IDEAL_MIN_INTERVAL && interval <= IDEAL_MAX_INTERVAL) {
        combo.value += 1
        streakMessage.value = combo.value >= 10
            ? '節奏非常穩定'
            : combo.value >= 5
                ? '維持得很好'
                : '穩定中'
        const gain = 30 + Math.min(combo.value * 2, 30)
        score.value += gain
        judgementText.value = '節奏剛好'
        rhythmHint.value = `目前約 ${cpm} 次/分，維持這個速度`
        judgementType.value = 'good'
        speedColor.value = '#d1e7dd'
        shakePower.value = 7
        flashAlpha.value = 0.16
        flashColor.value = 'rgba(25, 135, 84, 0.16)'
        petEnergy.value = Math.min(petEnergy.value + 0.08, 1)
        addFloatingText('PERFECT', gain, 'good')
        addParticles('good')
        return
    }

    if (interval >= ACCEPTABLE_MIN_INTERVAL && interval < IDEAL_MIN_INTERVAL) {
        combo.value = Math.max(combo.value, 1)
        score.value += 15
        judgementText.value = '稍微太快'
        rhythmHint.value = `目前約 ${cpm} 次/分，請放慢一點點`
        judgementType.value = 'ok'
        speedColor.value = '#fff3cd'
        shakePower.value = 4
        flashAlpha.value = 0.12
        flashColor.value = 'rgba(255, 193, 7, 0.14)'
        petEnergy.value = Math.max(petEnergy.value - 0.02, 0.25)
        addFloatingText('TOO FAST', 15, 'ok')
        addParticles('ok')
        return
    }

    if (interval > IDEAL_MAX_INTERVAL && interval <= ACCEPTABLE_MAX_INTERVAL) {
        combo.value = Math.max(combo.value, 1)
        score.value += 15
        judgementText.value = '稍微太慢'
        rhythmHint.value = `目前約 ${cpm} 次/分，請加快一點點`
        judgementType.value = 'ok'
        speedColor.value = '#fff3cd'
        shakePower.value = 4
        flashAlpha.value = 0.12
        flashColor.value = 'rgba(255, 193, 7, 0.14)'
        petEnergy.value = Math.max(petEnergy.value - 0.02, 0.25)
        addFloatingText('TOO SLOW', 15, 'ok')
        addParticles('ok')
        return
    }

    combo.value = 0
    score.value = Math.max(score.value - 5, 0)
    judgementType.value = 'bad'
    shakePower.value = 2
    flashAlpha.value = 0.14
    petEnergy.value = Math.max(petEnergy.value - 0.08, 0.12)

    if (cpm > IDEAL_MAX_CPM) {
        judgementText.value = '太快了'
        rhythmHint.value = `目前約 ${cpm} 次/分，建議明顯放慢`
        speedColor.value = '#f8d7da'
        flashColor.value = 'rgba(220, 53, 69, 0.16)'
        addFloatingText('TOO FAST', -5, 'bad')
    } else {
        judgementText.value = '太慢了'
        rhythmHint.value = `目前約 ${cpm} 次/分，建議明顯加快`
        speedColor.value = '#cfe2ff'
        flashColor.value = 'rgba(13, 110, 253, 0.16)'
        addFloatingText('TOO SLOW', -5, 'bad')
    }

    addParticles('bad')
}

function addFloatingText(label, point, type) {
    floatingTexts.value.push({
        id: makeId(),
        label,
        point,
        type,
        x: 450 + (Math.random() - 0.5) * 80,
        y: 245 + (Math.random() - 0.5) * 30,
        vy: -1.8,
        alpha: 1,
        scale: 1
    })
}

function addParticles(type) {
    // 降低粒子數量，保留回饋但不干擾閱讀
    const count = type === 'good' ? 8 : type === 'ok' ? 5 : 4
    const color = type === 'good' ? '#198754' : type === 'ok' ? '#ffc107' : '#dc3545'

    for (let i = 0; i < count; i += 1) {
        particles.value.push({
            id: makeId(),
            x: 450,
            y: 285,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            size: 3 + Math.random() * 4,
            alpha: 0.75,
            color
        })
    }
}

function handleKeydown(event) {
    if (event.code === 'Space') {
        event.preventDefault()
        handleCompression()
    }
}

function draw() {
    const canvas = canvasRef.value
    if (!canvas || !ctx.value) return

    const c = ctx.value
    const width = canvas.width
    const height = canvas.height

    const shakeX = shakePower.value > 0 ? (Math.random() - 0.5) * shakePower.value : 0
    const shakeY = shakePower.value > 0 ? (Math.random() - 0.5) * shakePower.value : 0

    c.clearRect(0, 0, width, height)
    c.save()
    c.translate(shakeX, shakeY)

    drawBackground(c, width, height)
    drawSpeedMeter(c, width)
    drawPet(c, width, height)
    drawBeatGuide(c, width, height)
    drawShockWave(c, width, height)
    drawHeart(c, width, height)
    drawFloatingTexts(c)
    drawInstruction(c, width)

    c.restore()
    drawFlash(c, width, height)

    updateAnimationState()
    animationId = requestAnimationFrame(draw)
}

function updateAnimationState() {
    updateGuideBeat()
    heartScale.value += (1 - heartScale.value) * 0.16
    heartGlow.value *= 0.9
    shockWave.value *= 0.9
    shakePower.value *= 0.82
    flashAlpha.value *= 0.86
    waveOffset.value += judgementType.value === 'bad' ? 5 : judgementType.value === 'good' ? 3.5 : 2.5

    particles.value = particles.value
        .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.08,
            alpha: p.alpha - 0.025
        }))
        .filter((p) => p.alpha > 0)

    floatingTexts.value = floatingTexts.value
        .map((t) => ({
            ...t,
            y: t.y + t.vy,
            alpha: t.alpha - 0.018,
            scale: t.scale + 0.006
        }))
        .filter((t) => t.alpha > 0)
}

function updateGuideBeat() {
    if (gameState.value !== 'playing') return

    const now = performance.now()

    while (nextGuideBeatTime.value && now >= nextGuideBeatTime.value) {
        nextGuideBeatTime.value += GUIDE_INTERVAL
        guideBeatPulse.value = 1
        beatFlash.value = 1
        lanePulse.value = 1
        accuracyRing.value = 1
    }

    if (nextGuideBeatTime.value) {
        const timeToBeat = nextGuideBeatTime.value - now
        guideBeatProgress.value = Math.max(0, Math.min(1, 1 - timeToBeat / GUIDE_INTERVAL))
    }

    guideBeatPulse.value *= 0.88
    beatFlash.value *= 0.9
    lanePulse.value *= 0.92
    accuracyRing.value *= 0.9
}

function drawBeatGuide(c, width, height) {
    if (gameState.value !== 'playing') return

    // 只保留一個視覺焦點：胸口上的按壓節奏圈
    const x = width / 2 - 5
    const y = height / 2 + 58
    const progress = Math.max(0, Math.min(guideBeatProgress.value, 1))

    const targetRadius = 46
    const approachRadius = 105 - progress * 58
    const isNearBeat = progress > 0.78

    c.save()

    // 淡淡的胸口高亮，避免整個畫面太花
    c.fillStyle = isNearBeat
        ? 'rgba(220, 53, 69, 0.10)'
        : 'rgba(220, 53, 69, 0.045)'
    c.beginPath()
    c.arc(x, y, 92, 0, Math.PI * 2)
    c.fill()

    // 固定目標圈：按壓位置
    c.strokeStyle = 'rgba(220, 53, 69, 0.32)'
    c.lineWidth = 3
    c.beginPath()
    c.arc(x, y, targetRadius, 0, Math.PI * 2)
    c.stroke()

    // 收合節奏圈：唯一節拍提示
    c.strokeStyle = isNearBeat
        ? 'rgba(220, 53, 69, 0.88)'
        : 'rgba(220, 53, 69, 0.42)'
    c.lineWidth = isNearBeat ? 6 : 4
    c.beginPath()
    c.arc(x, y, approachRadius, 0, Math.PI * 2)
    c.stroke()

    // 節拍瞬間輕微閃一下
    if (guideBeatPulse.value > 0.05) {
        c.fillStyle = `rgba(220, 53, 69, ${guideBeatPulse.value * 0.12})`
        c.beginPath()
        c.arc(x, y, 62 + guideBeatPulse.value * 30, 0, Math.PI * 2)
        c.fill()
    }

    // 簡短文字，避免和中央判定文字重疊
    c.textAlign = 'center'
    c.font = 'bold 15px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillStyle = isNearBeat ? '#dc3545' : '#6c757d'
    c.fillText(isNearBeat ? '按壓' : '等待節拍', x, y - 72)

    c.restore()
}

function drawBackground(c, width, height) {
    const gradient = c.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, speedColor.value)
    gradient.addColorStop(1, '#ffffff')
    c.fillStyle = gradient
    c.fillRect(0, 0, width, height)

    c.fillStyle = judgementType.value === 'good'
        ? 'rgba(25, 135, 84, 0.16)'
        : judgementType.value === 'bad'
            ? 'rgba(220, 53, 69, 0.14)'
            : 'rgba(220, 53, 69, 0.08)'
    c.beginPath()
    c.arc(width * 0.15, height * 0.18, 125 + heartGlow.value * 30, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = judgementType.value === 'bad'
        ? 'rgba(13, 110, 253, 0.12)'
        : 'rgba(13, 110, 253, 0.06)'
    c.beginPath()
    c.arc(width * 0.86, height * 0.25, 155 + shockWave.value * 35, 0, Math.PI * 2)
    c.fill()
}

function drawSpeedMeter(c, width) {
    const x = 110
    const y = 58
    const barWidth = width - 220
    const centerY = y + 28
    const cpm = currentCpm.value

    c.save()

    c.fillStyle = '#495057'
    c.font = 'bold 16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillText('CPR 節奏速度', x, y - 18)

    c.font = '14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillStyle = '#6c757d'
    c.fillText('目標 100–120 次/分', x + 120, y - 18)

    // 乾淨速度條：移除上方 ECG 波與過多文字
    c.fillStyle = 'rgba(255,255,255,0.86)'
    roundRect(c, x, y, barWidth, 58, 18)
    c.fill()

    const gradient = c.createLinearGradient(x, 0, x + barWidth, 0)
    gradient.addColorStop(0, '#9ec5fe')
    gradient.addColorStop(0.45, '#9ec5fe')
    gradient.addColorStop(0.5, '#75b798')
    gradient.addColorStop(0.6, '#75b798')
    gradient.addColorStop(0.68, '#ea868f')
    gradient.addColorStop(1, '#ea868f')

    c.strokeStyle = gradient
    c.lineWidth = 10
    c.lineCap = 'round'
    c.beginPath()
    c.moveTo(x + 18, centerY)
    c.lineTo(x + barWidth - 18, centerY)
    c.stroke()

    // 只標出理想區間
    const idealStartX = cpmToX(IDEAL_MIN_CPM, x, barWidth)
    const idealEndX = cpmToX(IDEAL_MAX_CPM, x, barWidth)

    c.strokeStyle = 'rgba(25, 135, 84, 0.65)'
    c.lineWidth = 3
    roundRect(c, idealStartX - 6, y + 9, idealEndX - idealStartX + 12, 38, 12)
    c.stroke()

    c.font = '12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.textAlign = 'center'
    c.fillStyle = '#198754'
    c.fillText('理想', (idealStartX + idealEndX) / 2, y + 75)

    if (cpm > 0) {
        const markerX = cpmToX(cpm, x, barWidth)
        const markerColor = judgementType.value === 'good'
            ? '#198754'
            : judgementType.value === 'bad'
                ? cpm > IDEAL_MAX_CPM ? '#dc3545' : '#0d6efd'
                : '#b8860b'

        c.fillStyle = markerColor
        c.beginPath()
        c.arc(markerX, centerY, 12, 0, Math.PI * 2)
        c.fill()

        c.strokeStyle = '#fff'
        c.lineWidth = 4
        c.beginPath()
        c.arc(markerX, centerY, 12, 0, Math.PI * 2)
        c.stroke()

        c.fillStyle = '#212529'
        c.font = 'bold 17px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
        c.fillText(`${cpm}`, markerX, y - 34)
        c.font = '12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
        c.fillStyle = '#6c757d'
        c.fillText('次/分', markerX, y - 16)
    }

    c.restore()
}

function cpmToX(cpm, x, barWidth) {
    const minCpm = 60
    const maxCpm = 180
    const clampedCpm = Math.max(minCpm, Math.min(cpm, maxCpm))
    return x + ((clampedCpm - minCpm) / (maxCpm - minCpm)) * barWidth
}

function drawSpeedTick(c, cpm, label, x, y, barWidth, centerY) {
    const tickX = cpmToX(cpm, x, barWidth)

    c.strokeStyle = 'rgba(33, 37, 41, 0.22)'
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(tickX, centerY - 24)
    c.lineTo(tickX, centerY + 24)
    c.stroke()

    c.fillStyle = '#6c757d'
    c.font = '12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.textAlign = 'center'
    c.fillText(label, tickX, centerY + 38)
}

function drawPet(c, width, height) {
    const bodyX = width / 2
    const bodyY = height / 2 + 40
    const brightness = 0.85 + petEnergy.value * 0.15

    c.save()
    c.translate(bodyX, bodyY)
    c.globalAlpha = brightness

    c.fillStyle = petEnergy.value > 0.45 ? '#f1c27d' : '#d9c2a2'
    c.beginPath()
    c.ellipse(0, 40, 180, 90, 0, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = petEnergy.value > 0.45 ? '#8d6e63' : '#7f746d'
    c.beginPath()
    c.ellipse(-140, -25, 65, 55, 0, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = '#6d4c41'
    c.beginPath()
    c.ellipse(-170, -18, 24, 38, -0.4, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = '#212529'
    c.beginPath()
    c.arc(-155, -35, 5, 0, Math.PI * 2)
    c.fill()

    c.fillStyle = '#3e2723'
    c.beginPath()
    c.arc(-190, -18, 8, 0, Math.PI * 2)
    c.fill()

    c.strokeStyle = '#5d4037'
    c.lineWidth = 4
    c.beginPath()
    c.moveTo(135, 45)
    c.quadraticCurveTo(205, 10, 165, -40)
    c.stroke()

    c.fillStyle = '#795548'
    for (const legX of [-85, -35, 45, 95]) {
        roundRect(c, legX, 105, 25, 55, 12)
        c.fill()
    }

    c.globalAlpha = 1
    c.restore()
}

function drawShockWave(c, width, height) {
    if (shockWave.value < 0.05) return

    const x = width / 2 - 5
    const y = height / 2 + 58
    const radius = 55 + (1 - shockWave.value) * 90

    c.save()
    c.strokeStyle = judgementType.value === 'good'
        ? `rgba(25, 135, 84, ${shockWave.value * 0.5})`
        : `rgba(220, 53, 69, ${shockWave.value * 0.35})`
    c.lineWidth = 5
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2)
    c.stroke()
    c.restore()
}

function drawHeart(c, width, height) {
    accuracyRing.value = judgementType.value === 'good'
        ? Math.max(accuracyRing.value, 0.6)
        : accuracyRing.value
    const x = width / 2 - 5
    const y = height / 2 + 58
    const beatScale = heartScale.value + heartGlow.value * 0.12

    c.save()
    c.translate(x, y)
    c.scale(beatScale, beatScale)
    c.shadowColor = judgementType.value === 'good'
        ? 'rgba(25, 135, 84, 0.7)'
        : 'rgba(220, 53, 69, 0.65)'
    c.shadowBlur = 16 + heartGlow.value * 28
    c.fillStyle = judgementType.value === 'good' ? '#dc3545' : '#c93d4a'
    drawHeartShape(c)
    c.fill()

    c.shadowBlur = 0
    c.fillStyle = 'white'
    c.font = 'bold 20px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.textAlign = 'center'
    c.fillText('按壓', 0, -18)
    c.restore()
    c.textAlign = 'left'
}

function drawHeartShape(c) {
    c.beginPath()
    c.moveTo(0, 30)
    c.bezierCurveTo(-55, -15, -70, -60, -30, -70)
    c.bezierCurveTo(-10, -75, 0, -58, 0, -48)
    c.bezierCurveTo(0, -58, 10, -75, 30, -70)
    c.bezierCurveTo(70, -60, 55, -15, 0, 30)
    c.closePath()
}

function drawRhythmWave(c, width, height) {
    const baseY = height - 88
    const amp = judgementType.value === 'good' ? 18 : judgementType.value === 'bad' ? 28 : 14
    const frequency = judgementType.value === 'bad' && currentCpm.value > IDEAL_MAX_CPM ? 0.065 : 0.038

    c.strokeStyle = judgementType.value === 'good'
        ? '#198754'
        : judgementType.value === 'bad'
            ? '#dc3545'
            : '#ffc107'
    c.lineWidth = 4
    c.beginPath()

    for (let x = 0; x < width; x += 8) {
        const irregular = judgementType.value === 'bad' ? Math.sin((x + waveOffset.value) * 0.13) * 8 : 0
        const y = baseY + Math.sin((x + waveOffset.value) * frequency) * amp + irregular
        if (x === 0) c.moveTo(x, y)
        else c.lineTo(x, y)
    }

    c.stroke()

    c.fillStyle = '#6c757d'
    c.font = '15px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillText('提示：不要等指標，請用自己的節奏穩定按壓', 70, height - 45)
}

function drawInstruction(c, width) {
    if (gameState.value !== 'playing') return

    // 將文字移到上方，避免蓋住狗與節奏圈
    c.save()
    c.textAlign = 'center'

    c.fillStyle = '#212529'
    c.font = 'bold 26px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillText(judgementText.value, width / 2, 145)

    c.font = '18px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    c.fillStyle = '#6c757d'
    c.fillText(`${currentCpm.value || '--'} 次/分｜${rhythmHint.value}`, width / 2, 176)

    c.restore()
}

function drawFloatingTexts(c) {
    // 只顯示最多 3 個浮動文字，避免畫面爆炸
    const visibleTexts = floatingTexts.value.slice(-3)

    for (const t of visibleTexts) {
        c.save()
        c.globalAlpha = t.alpha
        c.translate(t.x, t.y)
        c.scale(t.scale, t.scale)
        c.textAlign = 'center'
        c.font = 'bold 22px system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
        c.fillStyle = t.type === 'good' ? '#198754' : t.type === 'ok' ? '#b8860b' : t.type === 'bad' ? '#dc3545' : '#6c757d'
        c.fillText(`${t.label} ${t.point > 0 ? '+' : ''}${t.point}`, 0, 0)
        c.restore()
    }
}

function drawParticles(c) {
    for (const p of particles.value) {
        c.save()
        c.globalAlpha = p.alpha
        c.fillStyle = p.color
        c.beginPath()
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        c.fill()
        c.restore()
    }
}

function drawFlash(c, width, height) {
    if (flashAlpha.value < 0.01) return
    c.save()
    c.globalAlpha = flashAlpha.value
    c.fillStyle = flashColor.value
    c.fillRect(0, 0, width, height)
    c.restore()
}

function roundRect(c, x, y, width, height, radius) {
    c.beginPath()
    c.moveTo(x + radius, y)
    c.lineTo(x + width - radius, y)
    c.quadraticCurveTo(x + width, y, x + width, y + radius)
    c.lineTo(x + width, y + height - radius)
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    c.lineTo(x + radius, y + height)
    c.quadraticCurveTo(x, y + height, x, y + height - radius)
    c.lineTo(x, y + radius)
    c.quadraticCurveTo(x, y, x + radius, y)
    c.closePath()
}

onMounted(async () => {
    await nextTick()
    const canvas = canvasRef.value
    ctx.value = canvas.getContext('2d')
    draw()
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    if (animationId) cancelAnimationFrame(animationId)
    if (timerId) window.clearInterval(timerId)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.cpr-page {
    background:
        radial-gradient(circle at top left, rgba(220, 53, 69, 0.1), transparent 32%),
        linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
    min-height: 100vh;
}

.game-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
}

.game-header {
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.stat-box {
    border-radius: 1.25rem;
    background: #f8f9fa;
    padding: 1rem;
    height: 100%;
}

.stat-box span {
    display: block;
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.stat-box strong {
    font-size: 1.35rem;
    line-height: 1.2;
}

.canvas-wrap {
    position: relative;
    background: #fff7f7;
    overflow: hidden;
    transition: box-shadow 0.25s ease, background 0.25s ease;
}

.canvas-wrap.is-good {
    box-shadow: inset 0 0 0 999px rgba(25, 135, 84, 0.05);
    background: linear-gradient(180deg, #f5fff8 0%, #ffffff 100%);
}

.canvas-wrap.is-ok {
    box-shadow: inset 0 0 0 999px rgba(255, 193, 7, 0.04);
    background: linear-gradient(180deg, #fffdf4 0%, #ffffff 100%);
}

.canvas-wrap.is-bad {
    box-shadow: inset 0 0 0 999px rgba(220, 53, 69, 0.05);
    background: linear-gradient(180deg, #fff5f5 0%, #ffffff 100%);
}

.cpr-canvas {
    width: 100%;
    display: block;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
}

.overlay-panel {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(8px);
}

.overlay-panel h2 {
    font-weight: 800;
    margin-bottom: 1rem;
}

.overlay-panel p {
    max-width: 560px;
    color: #6c757d;
    font-size: 1.1rem;
}

@media (max-width: 576px) {
    .stat-box strong {
        font-size: 1.1rem;
    }

    .overlay-panel h2 {
        font-size: 1.6rem;
    }

    .overlay-panel p {
        font-size: 1rem;
    }
}
</style>

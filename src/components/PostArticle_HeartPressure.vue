<template>
    <main class="article-page">
        <section class="article-hero">
            <div class="container">
                <p class="eyebrow">犬貓心臟健康</p>
                <h1>毛孩的心臟，正在默默承受你看不見的壓力</h1>
                <p class="lead">
                    犬貓心臟病常常不是突然發生，而是在日常生活中安靜累積。
                    早期檢查與定期追蹤，是看見風險、守護生命的重要開始。
                </p>
            </div>
        </section>

        <section class="article-body">
            <div class="container">
                <article class="article-card">
                    <h2>犬貓心臟病，常常沒有明顯症狀</h2>

                    <p>
                        很多飼主以為，毛孩如果還會吃、會玩、會跑，就代表身體沒有問題。
                        但心臟病並不一定會在早期表現出明顯異常。
                    </p>

                    <p>
                        有些狗狗只是偶爾咳嗽、比較容易喘、運動耐受度下降；
                        有些貓咪甚至在外觀看起來完全正常，直到病情突然惡化，才被發現心臟早已承受很大的壓力。
                    </p>

                    <div class="notice-box">
                        <strong>心臟病最可怕的地方，不是它一定會立刻造成症狀，</strong>
                        而是它可能在你看不見的地方，默默進展。
                    </div>

                    <h2>哪些毛孩需要特別注意？</h2>

                    <div class="info-grid">
                        <div class="info-card">
                            <h3>小型犬</h3>
                            <p>
                                小型犬常見退化性二尖瓣疾病，可能從心雜音開始，逐漸進展到心臟擴大與心衰竭。
                            </p>
                        </div>

                        <div class="info-card">
                            <h3>貓咪</h3>
                            <p>
                                貓咪心肌病變常常很隱密，有些貓沒有明顯心雜音，也可能已經有心臟結構或功能異常。
                            </p>
                        </div>

                        <div class="info-card">
                            <h3>高齡毛孩</h3>
                            <p>
                                年紀增加後，心臟、腎臟與代謝功能都可能改變，定期健康檢查更重要。
                            </p>
                        </div>
                    </div>

                    <h2>什麼時候應該安排心臟檢查？</h2>

                    <ul class="check-list">
                        <li>聽診發現心雜音</li>
                        <li>容易喘、呼吸變快</li>
                        <li>咳嗽、運動耐受度下降</li>
                        <li>曾經昏倒、虛弱或突然倒下</li>
                        <li>品種或年齡屬於心臟病高風險族群</li>
                        <li>麻醉、手術或洗牙前需要評估風險</li>
                    </ul>

                    <h2>心臟檢查不只是看有沒有病</h2>

                    <p>
                        心臟檢查的目的，不只是找出「有沒有心臟病」。
                        更重要的是判斷目前處於哪一個階段、是否需要用藥、多久需要追蹤一次，
                        以及日常生活中需要注意哪些變化。
                    </p>

                    <p>
                        對心臟病毛孩來說，越早建立基準資料，未來就越能判斷病情是否進展。
                        這也是為什麼定期追蹤，比等到症狀明顯才檢查更有價值。
                    </p>

                    <div class="quote-box">
                        「看見心臟的壓力，才能在真正惡化前，為牠多爭取一點時間。」
                    </div>

                    <h2>我們想提醒飼主</h2>

                    <p>
                        心臟病不一定等於絕望。真正重要的是，不要忽略早期訊號，
                        也不要等到呼吸困難、肺水腫或突然倒下時，才第一次面對心臟問題。
                    </p>

                    <p>
                        透過聽診、胸腔影像、心臟超音波與必要的血液檢查，
                        醫師可以更完整地了解毛孩的心臟狀態，並依照每一位孩子的狀況安排最適合的照護計畫。
                    </p>

                    <div class="cta-box">
                        <h2>讓我們一起，提早看見牠的心臟壓力</h2>
                        <p>
                            如果您的毛孩曾被告知有心雜音、咳嗽、喘、昏倒，或您只是想更安心地了解牠的心臟狀況，
                            建議安排心臟專科評估。
                        </p>

                        <RouterLink to="/appointment" class="cta-button">
                            預約心臟檢查
                        </RouterLink>
                    </div>
                </article>
            </div>
        </section>
    </main>
</template>

<script setup>
</script>

<style scoped>
.article-page {
    background: #f7f4ef;
    color: #2f2a25;
}

.article-hero {
    padding: 96px 0 72px;
    background:
        linear-gradient(rgba(45, 35, 28, 0.58), rgba(45, 35, 28, 0.58)),
        url('/imgs/毛孩的心臟.png') center / cover no-repeat;
    color: #fff;
}

.article-hero .container,
.article-body .container {
    max-width: 960px;
}

.eyebrow {
    display: inline-block;
    margin-bottom: 16px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    font-size: 0.9rem;
    letter-spacing: 0.08em;
}

.article-hero h1 {
    max-width: 760px;
    margin-bottom: 20px;
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.2;
}

.lead {
    max-width: 720px;
    font-size: 1.2rem;
    line-height: 1.9;
    opacity: 0.95;
}

.article-body {
    padding: 64px 0;
}

.article-card {
    padding: 56px;
    border-radius: 28px;
    background: #fff;
    box-shadow: 0 20px 60px rgba(65, 48, 35, 0.08);
}

.article-card h2 {
    margin: 40px 0 18px;
    font-size: 1.7rem;
    font-weight: 800;
    color: #4b3528;
}

.article-card h2:first-child {
    margin-top: 0;
}

.article-card p {
    margin-bottom: 20px;
    font-size: 1.05rem;
    line-height: 2;
    color: #4a4038;
}

.notice-box,
.quote-box {
    margin: 32px 0;
    padding: 28px;
    border-radius: 22px;
    background: #fff3e6;
    border-left: 6px solid #d89b63;
    font-size: 1.1rem;
    line-height: 1.9;
    color: #4b3528;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin: 28px 0 36px;
}

.info-card {
    padding: 24px;
    border-radius: 22px;
    background: #faf7f2;
    border: 1px solid #eee2d6;
}

.info-card h3 {
    margin-bottom: 12px;
    font-size: 1.15rem;
    font-weight: 800;
    color: #7a4f35;
}

.info-card p {
    margin-bottom: 0;
    font-size: 0.98rem;
    line-height: 1.8;
}

.check-list {
    margin: 24px 0 36px;
    padding: 0;
    list-style: none;
}

.check-list li {
    position: relative;
    margin-bottom: 14px;
    padding-left: 34px;
    font-size: 1.05rem;
    line-height: 1.7;
}

.check-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #7a4f35;
    color: #fff;
    font-size: 0.85rem;
    text-align: center;
    line-height: 24px;
}

.quote-box {
    background: #f1f6f4;
    border-left-color: #7aa58e;
    font-size: 1.25rem;
    font-weight: 700;
}

.cta-box {
    margin-top: 48px;
    padding: 36px;
    border-radius: 28px;
    background: linear-gradient(135deg, #6f4b36, #a87855);
    color: #fff;
}

.cta-box h2 {
    margin-top: 0;
    color: #fff;
}

.cta-box p {
    color: rgba(255, 255, 255, 0.92);
}

.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    padding: 12px 24px;
    border-radius: 999px;
    background: #fff;
    color: #6f4b36;
    font-weight: 800;
    text-decoration: none;
    transition: 0.25s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

@media (max-width: 768px) {
    .article-hero {
        padding: 72px 0 56px;
    }

    .article-card {
        padding: 32px 22px;
        border-radius: 22px;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .article-card h2 {
        font-size: 1.45rem;
    }

    .lead,
    .article-card p {
        font-size: 1rem;
    }
}
</style>
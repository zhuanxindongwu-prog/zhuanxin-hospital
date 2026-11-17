<template>
  <main id="main-content" class="ohtrust-page">
    <a class="skip-product-link" href="#daily-use">跳至產品使用說明</a>

    <section id="product-overview" class="lifestyle-hero" aria-labelledby="product-title">
      <picture class="hero-photograph">
        <source media="(max-width: 767px)" srcset="/imgs/likewater/hero-home-960.webp" />
        <img src="/imgs/likewater/hero-home-1920.webp"
          srcset="/imgs/likewater/hero-home-960.webp 960w, /imgs/likewater/hero-home-1920.webp 1920w"
          sizes="100vw" width="2880" height="1620" fetchpriority="high" decoding="async"
          alt="LikeWater 居家清潔情境示意：清潔空的外出籠，瓶身放在桌面，毛孩在遠處休息" />
      </picture>
      <div class="hero-content page-width">
        <div class="hero-copy">
          <h1 id="product-title" class="product-name">賴瓦特 LikeWater<span class="visually-hidden"> 寵物專用全效清潔防護液</span></h1>
          <p class="hero-heading">把用心，<br />留在牠的日常。</p>
          <p class="hero-description">寵物專用的環境清潔防護液，<br class="desktop-break" />
            用在生活空間、寵物用品與日常接觸表面，<br class="desktop-break" />
            幫助維持清潔與清新。</p>
          <RouterLink to="/#contact" class="product-button">詢問產品使用 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></RouterLink>
          <a href="#daily-use" class="explore-link">往下，走進牠的日常 <i class="bi bi-arrow-down" aria-hidden="true"></i></a>
        </div>
      </div>
      <span class="scene-caption">產品使用情境示意</span>
    </section>

    <section id="daily-use" class="daily-chapter page-width" aria-labelledby="daily-title">
      <div class="daily-copy">
        <h2 id="daily-title">清潔生活，<br />也照顧每一份親近。</h2>
        <p>LikeWater 可用於犬貓生活環境的常接觸表面、外出與日常用品清潔，並作為異味管理的輔助選擇。</p>
        <p class="use-caption">生活空間・外出用品・日常接觸表面</p>
      </div>
      <div class="daily-photographs">
        <figure>
          <img src="/imgs/likewater/bottle-still-life-1080.webp"
            srcset="/imgs/likewater/bottle-still-life-600.webp 600w, /imgs/likewater/bottle-still-life-1080.webp 1080w"
            sizes="(max-width: 767px) 48vw, 29vw" width="1080" height="1440"
            loading="lazy" decoding="async" alt="LikeWater 瓶身與亞麻清潔布的產品情境示意" />
          <figcaption>把清潔，放進日常。</figcaption>
        </figure>
        <figure>
          <img src="/imgs/likewater/pet-space-1080.webp"
            srcset="/imgs/likewater/pet-space-600.webp 600w, /imgs/likewater/pet-space-1080.webp 1080w"
            sizes="(max-width: 767px) 48vw, 29vw" width="1080" height="1440"
            loading="lazy" decoding="async" alt="日常用品清潔情境示意：空的寵物睡墊與外出籠" />
          <figcaption>從牠熟悉的生活空間開始。</figcaption>
        </figure>
      </div>
    </section>

    <section id="everyday-scenes" ref="storyElement" class="everyday-story" :class="{ 'is-scroll-enhanced': scrollEnhanced }"
      :style="{ '--story-progress': storyProgress }" aria-labelledby="story-title">
      <div class="story-intro page-width">
        <p class="section-kicker">日常，從不同的角落展開</p>
        <h2 id="story-title">牠的每一天，<br />值得多一點用心。</h2>
        <p>從常接觸的桌面，到一起出門的外出籠。<br class="desktop-break" />讓清潔，成為生活裡自然的小事。</p>
        <a href="#product-detail" class="text-link story-skip">直接看產品細節 <i class="bi bi-arrow-down" aria-hidden="true"></i></a>
      </div>
      <div class="story-layout page-width">
        <div class="story-track">
          <article v-for="(scene, index) in everydayScenes" :id="scene.id" :key="scene.id"
            class="story-step" :class="{ 'is-active': activeScene === index }">
            <div class="story-step-copy">
              <p class="scene-eyebrow"><span>{{ scene.number }}</span> {{ scene.label }}</p>
              <h3>{{ scene.title[0] }}<br />{{ scene.title[1] }}</h3>
              <p class="scene-description">{{ scene.description }}</p>
              <p class="scene-note">{{ scene.note }}</p>
            </div>
            <figure class="story-inline-photo">
              <img :src="scene.imageLarge" :srcset="`${scene.imageSmall} 600w, ${scene.imageLarge} 1200w`"
                sizes="(max-width: 899px) 100vw, 1px" width="1200" height="1500" loading="lazy" decoding="async" :alt="scene.alt" />
              <figcaption>產品使用情境示意</figcaption>
            </figure>
          </article>
        </div>
        <div class="story-stage">
          <figure v-for="(scene, index) in everydayScenes" :key="scene.id" class="story-frame"
            :class="{ 'is-active': activeScene === index }" :aria-hidden="activeScene !== index">
            <img :src="scene.imageLarge" :srcset="`${scene.imageSmall} 600w, ${scene.imageLarge} 1200w`"
              sizes="(min-width: 900px) 54vw, 1px" width="1200" height="1500" loading="lazy" decoding="async" :alt="scene.alt" />
          </figure>
          <div class="story-stage-caption" aria-hidden="true"><span>{{ everydayScenes[activeScene].number }} / 03</span><span>{{ everydayScenes[activeScene].label }}</span><span>產品使用情境示意</span></div>
          <div class="story-progress" aria-hidden="true"><span></span></div>
        </div>
      </div>
    </section>

    <section class="evidence-interlude page-width" aria-labelledby="evidence-intro-title">
      <h2 id="evidence-intro-title">日常照護，也有依據可查。</h2>
      <div>
        <p>五份生物相容性評估與一份 SGS 抗菌測試報告。</p>
        <a href="#evidence-dossier" class="text-link">查看六份原始 PDF <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
        <p class="evidence-footnote">結果限於各報告載明的樣品與試驗條件。</p>
      </div>
    </section>

    <section id="product-detail" class="detail-chapter" aria-labelledby="detail-title">
      <picture class="detail-photograph">
        <img src="/imgs/likewater/label-detail-1920.webp"
          srcset="/imgs/likewater/label-detail-960.webp 960w, /imgs/likewater/label-detail-1920.webp 1920w"
          sizes="100vw" width="2880" height="1080" loading="lazy" decoding="async"
          alt="LikeWater 黃藍犬貓圖案瓶身的包裝細節示意" />
      </picture>
      <div class="detail-content page-width">
        <div class="detail-copy">
          <h2 id="detail-title">使用時請保持環境通風，<br />並避免接觸眼睛、鼻子或口部。</h2>
          <p>依產品說明使用，並避免直接噴入動物的眼睛、鼻子或口腔。</p>
          <a href="#use-and-limits" class="text-link">了解使用與限制 <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </section>

    <section id="evidence-dossier" class="report-section page-width" aria-labelledby="report-title">
      <span id="reports" class="legacy-anchor" aria-hidden="true"></span>
      <div class="evidence-dossier-layout">
        <aside class="evidence-summary">
          <p class="section-kicker">檢測與資料</p>
          <h2 id="report-title">每一份依據，<br />都看得見。</h2>
          <p>共六份原始報告，包含五份生物相容性評估與一份 SGS 抗菌測試。結果限於各自載明的試驗條件、樣品、模型與觀察時間。</p>
          <a href="#use-and-limits" class="text-link">閱讀報告的適用範圍 <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
        </aside>
        <div class="report-records">
          <p class="report-guide">展開查看方法與結果，或直接開啟完整 PDF。</p>
          <article v-for="report in reports" :key="report.reportNumber" class="report-record">
            <details class="report-details">
              <summary>
                <span class="report-sequence">{{ report.sequence }}</span>
                <span class="report-heading"><h3>{{ report.name }}</h3><span>{{ report.englishName }}</span></span>
                <i class="bi bi-plus-lg" aria-hidden="true"></i>
              </summary>
              <div class="report-content">
                <dl class="report-meta-grid">
                  <div><dt>報告編號</dt><dd>{{ report.reportNumber }}</dd></div>
                  <div><dt>標準</dt><dd>{{ report.standard }}</dd></div>
                  <div><dt>模型與方法</dt><dd>{{ report.model }}</dd></div>
                </dl>
                <div class="report-result"><strong>報告結果</strong><p>{{ report.finding }}</p></div>
              </div>
            </details>
            <a :href="report.link" class="report-link" target="_blank" rel="noopener noreferrer"
              :aria-label="`開啟 ${report.name}（${report.englishName}）PDF 報告`">開啟 PDF <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
          </article>
        </div>
      </div>
    </section>

    <section id="use-and-limits" class="use-section" aria-labelledby="use-title">
      <div class="page-width">
        <div class="use-heading"><p class="section-kicker">了解資料，也了解使用方式</p><h2 id="use-title">照護，需要看見全貌。</h2></div>
        <div class="evidence-boundary-grid">
          <div><h3>報告可以支持</h3><ul><li v-for="claim in supportedClaims" :key="claim">{{ claim }}</li></ul></div>
          <div><h3>報告不能代表</h3><ul><li v-for="claim in unsupportedClaims" :key="claim">{{ claim }}</li></ul></div>
        </div>
        <p class="source-note">頁面摘要如與原始 PDF 報告不同，以原始 PDF 報告為準。</p>
        <div class="professional-notes">
          <div>
            <h3>產品定位</h3>
            <p>LikeWater 較適合定位為<strong>環境清潔、抗菌除臭與日常照護輔助產品</strong>。這六份報告僅反映各自記錄的試驗條件；實際使用仍須依產品說明進行。</p>
          </div>
          <div>
            <h3>專業使用提醒</h3>
            <ul>
              <li>可作為環境與氣味管理輔助，不可取代醫療級消毒。</li>
              <li>抗菌或抗病毒實驗多屬實驗室條件，不等於臨床治療效果。</li>
              <li>貓、幼齡動物、呼吸道疾病或心肺功能不佳個體，使用氣霧產品仍建議保持通風。</li>
              <li>若動物已有皮膚病、咳嗽、喘鳴或感染問題，仍應由獸醫師診斷治療。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="breathing-chapter" aria-labelledby="breathing-title">
      <picture class="breathing-photograph">
        <img src="/imgs/likewater/home-breathing-room-1920.webp"
          srcset="/imgs/likewater/home-breathing-room-960.webp 960w, /imgs/likewater/home-breathing-room-1920.webp 1920w"
          sizes="100vw" width="1920" height="1080" loading="lazy" decoding="async"
          alt="通風居家情境示意：自然光穿過窗簾，狗狗在遠離產品的地毯上休息，沒有噴灑動作" />
      </picture>
      <div class="breathing-content page-width">
        <div><p class="section-kicker">清潔之外，也別忘了通風</p>
          <h2 id="breathing-title">把空間留給生活。<br />把陪伴留給牠。</h2>
          <p>日常清潔、環境通風，<br />和依產品說明使用，一樣重要。</p>
          <a href="#product-faq" class="text-link">還有想了解的事？ <i class="bi bi-arrow-down" aria-hidden="true"></i></a>
        </div>
      </div>
      <span class="scene-caption">居家情境示意</span>
    </section>

    <section id="product-faq" class="faq-section page-width" aria-labelledby="faq-title">
      <div class="faq-heading"><p class="section-kicker">關於 LikeWater</p><h2 id="faq-title">你可能也想知道。</h2></div>
      <div class="faq-list">
        <details v-for="item in faqs" :key="item.question" class="faq-item">
          <summary>{{ item.question }}<i class="bi bi-plus-lg" aria-hidden="true"></i></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>

    <section class="contact-chapter" aria-labelledby="contact-title">
      <div class="page-width contact-layout">
        <div><p class="section-kicker">專心，陪你一起照護</p><h2 id="contact-title">讓日常照護，<br />多一份理解。</h2></div>
        <div>
          <p>LikeWater 可作為日常環境清潔與氣味管理的輔助工具，搭配正確通風、環境清潔與獸醫師專業評估，讓照護更完整。</p>
          <RouterLink to="/#contact" class="product-button">詢問產品使用方式 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></RouterLink>
          <RouterLink to="/products" class="all-products-link">查看所有照護產品 <i class="bi bi-arrow-right" aria-hidden="true"></i></RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { productSeo } from '../data/productSeo'

const faqs = productSeo['/ohtrust'].faqs

const everydayScenes = [
  {
    id: 'scene-surfaces', number: '01', label: '日常接觸面',
    title: ['從常碰到的地方，', '開始照顧。'],
    description: '桌面與生活空間的常接觸表面，是日常清潔可以留意的地方。依產品說明，安排適合自己生活的清潔節奏。',
    note: '先確認表面材質與產品說明，再進行清潔。',
    imageSmall: '/imgs/likewater/touch-surfaces-600.webp', imageLarge: '/imgs/likewater/touch-surfaces-1200.webp',
    alt: '日常接觸面清潔情境示意：以布擦拭空的木桌，LikeWater 瓶身放在一旁',
  },
  {
    id: 'scene-carrier', number: '02', label: '一起出門的用品',
    title: ['每一次出門，', '也有用心的準備。'],
    description: '熟悉的外出籠，陪牠一起看世界。清潔時先讓毛孩離開，再依產品說明整理日常用品。',
    note: '情境示意為空籠清潔，請勿朝動物噴灑。',
    imageSmall: '/imgs/likewater/carrier-care-600.webp', imageLarge: '/imgs/likewater/carrier-care-1200.webp',
    alt: '外出用品清潔情境示意：以布擦拭空外出籠內部，瓶身直立在旁，沒有動物或噴霧',
  },
  {
    id: 'scene-pet-space', number: '03', label: '熟悉的生活角落',
    title: ['回到熟悉的角落，', '繼續每一天。'],
    description: '從用品整理到環境與氣味管理，把清潔放進生活。LikeWater 是日常照護的輔助，搭配環境通風與規律清潔使用。',
    note: '用品材質與清潔方式，仍以各自的使用說明為準。',
    imageSmall: '/imgs/likewater/pet-space-600.webp', imageLarge: '/imgs/likewater/pet-space-1080.webp',
    alt: '生活角落情境示意：窗邊的空寵物睡墊與外出籠，搭配自然光與綠色植栽',
  },
]

const storyElement = ref(null)
const activeScene = ref(0)
const storyProgress = ref(0)
const scrollEnhanced = ref(false)
let animationFrame = 0
let motionQuery

function updateStory() {
  animationFrame = 0
  const story = storyElement.value
  if (!story || !scrollEnhanced.value) return
  const steps = Array.from(story.querySelectorAll('.story-step'))
  const viewportCenter = (window.innerHeight + 88) / 2
  let nearest = 0
  let nearestDistance = Infinity
  for (const [index, step] of steps.entries()) {
    const bounds = step.getBoundingClientRect()
    const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter)
    if (distance < nearestDistance) { nearest = index; nearestDistance = distance }
  }
  activeScene.value = nearest
  const track = story.querySelector('.story-track').getBoundingClientRect()
  const travel = Math.max(1, track.height - (window.innerHeight - 88))
  storyProgress.value = Math.min(1, Math.max(0, (88 - track.top) / travel))
}

function scheduleStoryUpdate() {
  if (scrollEnhanced.value && !animationFrame) animationFrame = window.requestAnimationFrame(updateStory)
}

function syncMotionMode() {
  scrollEnhanced.value = motionQuery.matches
  if (scrollEnhanced.value) scheduleStoryUpdate()
}

onMounted(() => {
  motionQuery = window.matchMedia('(min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)')
  syncMotionMode()
  motionQuery.addEventListener('change', syncMotionMode)
  window.addEventListener('scroll', scheduleStoryUpdate, { passive: true })
  window.addEventListener('resize', scheduleStoryUpdate, { passive: true })
})

onUnmounted(() => {
  window.cancelAnimationFrame(animationFrame)
  motionQuery?.removeEventListener('change', syncMotionMode)
  window.removeEventListener('scroll', scheduleStoryUpdate)
  window.removeEventListener('resize', scheduleStoryUpdate)
})


const reports = [
    {
        sequence: '01',
        name: '體外細胞毒性試驗',
        englishName: 'In Vitro Cytotoxicity Test',
        reportNumber: '23S186CE-01-R01',
        standard: 'ISO 10993-5:2009 and EN ISO 10993-5:2009',
        model: 'mouse fibroblast L929 cells; qualitative morphology assessment and quantitative MTT assay after 24-hour treatment with the test article extract.',
        finding: '定性與定量結果均為零反應，未觀察到體外細胞毒性；在研究條件下，測試品萃取液未觀察到體外細胞毒性。',
        link: '/reports/relano-in-vitro-cytotoxicity.pdf',
    },
    {
        sequence: '02',
        name: '兔子皮內刺激研究',
        englishName: 'Intracutaneous Irritation Study in Rabbits',
        reportNumber: 'TW025-23020L01',
        standard: 'ISO 10993-23:2021',
        model: 'three rabbits; polar and non-polar extracts injected intracutaneously, with erythema and edema assessed at 24, 48, and 72 hours.',
        finding: '未觀察到紅斑或水腫，反應評定為可忽略；試驗組與對照組平均分數差異為 0.0。',
        link: '/reports/relano-intracutaneous-irritation-rabbits.pdf',
    },
    {
        sequence: '03',
        name: '急性全身毒性研究',
        englishName: 'Acute Systemic Toxicity Study',
        reportNumber: '23S186T04-01-R01',
        standard: 'ISO 10993-11:2017',
        model: 'mice receiving polar and non-polar test article extracts, with systemic responses assessed through 72 hours.',
        finding: '在研究條件下，測試品萃取液未造成毒性反應或死亡；處置動物未顯示高於對照組的生物反應。',
        link: '/reports/relano-acute-systemic-toxicity.pdf',
    },
    {
        sequence: '04',
        name: '皮膚致敏測試',
        englishName: 'Skin Sensitisation Test (Guinea Pig Maximisation Test)',
        reportNumber: 'TW025-23021L01',
        standard: 'ISO 10993-10:2021',
        model: 'guinea pig maximisation test using polar and non-polar extracts, with dermal reactions scored 24 and 48 hours after challenge-patch removal.',
        finding: '在研究條件下，兩種萃取液均未產生皮膚致敏反應；本試驗中測試品未被視為致敏劑。',
        link: '/reports/relano-skin-sensitisation.pdf',
    },
    {
        sequence: '05',
        name: '兔子熱原研究',
        englishName: 'Pyrogen Study in Rabbits',
        reportNumber: '23S186T09-01-R01',
        standard: 'USP 45/NF40:2022 <151> and ISO/TR 21582:2021',
        model: 'three New Zealand White rabbits receiving a single intravenous dose of the test article extract; body temperature measured five times after dosing.',
        finding: '體溫上升分別為 0.12°C、0.04°C 與 0.09°C；熱原反應為陰性，且萃取液符合報告所列無熱原要求。',
        link: '/reports/relano-pyrogen-study-rabbits.pdf',
    },
    {
        sequence: '06',
        name: 'SGS 抗菌測試',
        englishName: 'Antimicrobial Effectiveness Testing',
        reportNumber: 'PUG26900885',
        standard: '參考 USP-NF Official as of 1-May-2018 <51> Antimicrobial Effectiveness Testing',
        model: '報告日期：2026-10-14。送測樣品：LIKE WATER 賴瓦特清潔護理液（批號 LW260801）；四種試驗菌株，作用時間均為 30 分鐘。',
        finding: '在本次送測樣品與 30 分鐘試驗條件下，大腸桿菌、克雷白氏肺炎菌、綠膿桿菌的減菌率均 >99.9%；金黃色葡萄球菌的減菌率為 98.0%。',
        link: '/reports/likewater-sgs-antibacterial.pdf',
    },
]

const supportedClaims = [
    '五份生物相容性報告分別評估特定生物反應；SGS 抗菌測試記錄送測樣品對四種試驗菌株作用 30 分鐘後的減菌率。',
    '六份報告的結果均限於各自報告所載的樣品與試驗條件。',
    '原始 PDF 可用於查核試驗方法、模型、觀察時間與報告結論。',
]

const unsupportedClaims = [
    '不代表疾病治療效果或可取代獸醫診療。',
    '不代表醫療級消毒、所有接觸部位或所有暴露途徑皆適用。',
    '不代表每一隻動物在任何情境下皆為零風險。',
]
</script>

<style scoped>
.ohtrust-page {
  --lw-green: #69964a;
  --lw-teal: #006b70;
  --lw-ink: #252725;
  --lw-muted: #5d625c;
  --lw-forest: #233f35;
  --lw-line: #d8d9d3;
  --lw-paper: #f5f3ee;
  --lw-white: #fff;
  padding-top: 88px;
  background: var(--lw-white);
  color: var(--lw-ink);
  font-family: "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
  text-align: left;
}
.ohtrust-page, .ohtrust-page * { box-sizing: border-box; }
.ohtrust-page :is(h1,h2,h3,p,dl,dd,figure,ul) { margin: 0; }
.ohtrust-page :is(a,summary) { -webkit-tap-highlight-color: transparent; }
.ohtrust-page :is(section, .legacy-anchor) { scroll-margin-top: 108px; }
.page-width { width: calc(100% - 112px); max-width: 1328px; margin-inline: auto; }
.ohtrust-page h2 { font-size: clamp(30px,3.3vw,48px); line-height: 1.4; font-weight: 750; letter-spacing: -.04em; text-wrap: balance; }
.ohtrust-page h3 { font-size: 21px; line-height: 1.5; font-weight: 700; }
.ohtrust-page p, .ohtrust-page li { font-size: 17px; line-height: 1.95; }
.ohtrust-page a { color: var(--lw-forest); text-underline-offset: 5px; }
.ohtrust-page a, .ohtrust-page summary { touch-action: manipulation; }
.skip-product-link { position: absolute; top: 96px; left: 20px; z-index: 10; padding: 12px 20px; background: var(--lw-white); transform: translateY(-180px); }
.skip-product-link:focus { transform: translateY(0); }
.lifestyle-hero { position: relative; min-height: 620px; height: min(56.25vw,900px); background: #eee8df; }
.hero-photograph { position: absolute; inset: 0; }
.hero-photograph img { display: block; width: 100%; height: 100%; object-fit: cover; }
.hero-content { position: relative; height: 100%; display: flex; align-items: center; }
.hero-copy { width: 46%; padding-bottom: 20px; }
.ohtrust-page .product-name { margin-bottom: 25px; font-size: 28px; line-height: 1.4; font-weight: 650; letter-spacing: -.025em; }
.ohtrust-page .hero-heading { font-size: clamp(44px,5.6vw,86px); line-height: 1.3; font-weight: 800; letter-spacing: -.065em; }
.ohtrust-page .hero-description { margin-top: 24px; line-height: 1.85; font-size: clamp(16px,1.45vw,21px); }
.product-button { display: inline-flex; gap: 20px; align-items: center; justify-content: center; min-height: 52px; margin-top: 34px; padding: 14px 24px; border-radius: 5px; background: var(--lw-forest); color: var(--lw-white) !important; font-size: 16px; font-weight: 650; text-decoration: none; transition: background-color .2s, transform .2s; }
.product-button:hover { background: #355446; transform: translateY(-2px); }
.explore-link { display: flex; align-items: center; gap: 14px; width: max-content; min-height: 44px; margin-top: 24px; font-size: 13px; text-decoration: none; }
.scene-caption { position: absolute; right: 20px; bottom: 12px; padding: 3px 8px; background: rgba(255,255,255,.9); color: #4c514b; font-size: 11px; letter-spacing: .05em; }
.daily-chapter { display: grid; grid-template-columns: .8fr 1.5fr; gap: 56px; align-items: center; padding-top: 48px; padding-bottom: 56px; }
.daily-copy > p { margin-top: 26px; max-width: 28em; font-size: 20px; }
.ohtrust-page .use-caption { position: relative; margin-top: 50px; padding-top: 26px; font-size: 18px; }
.use-caption::before { content: ""; position: absolute; left: 0; top: 0; width: 40px; border-top: 2px solid var(--lw-forest); }
.daily-photographs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.daily-photographs figure { min-width: 0; }
.daily-photographs img { display: block; width: 100%; height: auto; aspect-ratio: 3/4; object-fit: cover; }
.daily-photographs figcaption { padding-top: 10px; font-size: 12px; line-height: 1.6; color: var(--lw-muted); }
.everyday-story { background: var(--lw-paper); padding-block: 110px 0; }
.story-intro { position: relative; padding-bottom: 70px; }
.ohtrust-page .story-intro h2 { font-size: clamp(38px,5vw,72px); line-height: 1.25; letter-spacing: -.055em; }
.story-intro > p:not(.section-kicker) { margin-top: 28px; color: var(--lw-muted); font-size: 19px; }
.story-skip { margin-top: 24px; font-size: 14px; }
.story-step { padding-block: 40px 60px; scroll-margin-top: 112px; }
.story-step-copy { max-width: 38em; }
.ohtrust-page .scene-eyebrow { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; font-size: 13px; font-weight: 600; letter-spacing: .05em; color: var(--lw-forest); }
.scene-eyebrow > span { font-size: 14px; font-variant-numeric: tabular-nums; }
.ohtrust-page .story-step h3 { font-size: clamp(30px,3.1vw,45px); font-weight: 750; line-height: 1.45; letter-spacing: -.05em; text-wrap: balance; }
.ohtrust-page .scene-description { margin-top: 28px; max-width: 23em; font-size: 18px; line-height: 1.95; text-wrap: pretty; }
.ohtrust-page .scene-note { margin-top: 30px; max-width: 27em; padding-top: 20px; border-top: 1px solid var(--lw-line); font-size: 13px; color: var(--lw-muted); }
.story-stage { display: none; }
.story-inline-photo { position: relative; margin-top: 28px !important; }
.story-inline-photo img { display: block; width: 100%; height: auto; aspect-ratio: 4/5; object-fit: cover; }
.story-inline-photo figcaption { position: absolute; right: 12px; bottom: 12px; padding: 3px 8px; background: rgba(255,255,255,.9); color: #4c514b; font-size: 10px; }
@media (min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference) {
  .is-scroll-enhanced .story-layout { display: grid; grid-template-columns: .85fr 1.15fr; align-items: start; column-gap: 72px; }
  .is-scroll-enhanced .story-track { grid-column: 1; grid-row: 1; }
  .is-scroll-enhanced .story-step { min-height: calc(100svh - 88px); display: flex; align-items: center; padding-block: 70px; }
  .is-scroll-enhanced .story-step-copy { transform: translateY(16px); transition: transform .7s cubic-bezier(.2,.65,.3,1), color .7s; color: #676b64; }
  .is-scroll-enhanced .story-step.is-active .story-step-copy { transform: translateY(0); color: var(--lw-ink); }
  .is-scroll-enhanced .story-inline-photo { display: none; }
  .is-scroll-enhanced .story-stage { display: block; grid-column: 2; grid-row: 1; position: sticky; top: 88px; height: calc(100svh - 88px); overflow: hidden; background: #e4dfd4; }
  .story-frame { position: absolute; inset: 0; opacity: 0; transition: opacity .8s cubic-bezier(.2,.65,.3,1); }
  .story-frame.is-active { opacity: 1; }
  .story-frame img { display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.04); transition: transform 1.25s cubic-bezier(.2,.65,.3,1); }
  .story-frame.is-active img { transform: scale(1); }
  .story-stage-caption { position: absolute; right: 20px; bottom: 26px; left: 20px; display: flex; gap: 18px; align-items: center; padding: 12px 16px; background: rgba(255,255,255,.94); color: var(--lw-ink); font-size: 12px; }
  .story-stage-caption > span:first-child { font-variant-numeric: tabular-nums; white-space: nowrap; }
  .story-stage-caption > span:last-child { margin-left: auto; font-size: 10px; color: var(--lw-muted); }
  .story-progress { position: absolute; right: 20px; bottom: 20px; left: 20px; height: 2px; background: rgba(255,255,255,.6); }
  .story-progress > span { display: block; width: 100%; height: 100%; background: var(--lw-forest); transform-origin: left; transform: scaleX(var(--story-progress,0)); }
}
.evidence-interlude { display: grid; grid-template-columns: 1fr 1.1fr; gap: 40px; align-items: center; border-top: 1px solid var(--lw-line); padding-block: 38px 44px; }
.ohtrust-page .evidence-interlude h2 { font-size: clamp(27px,3.05vw,44px); }
.evidence-interlude p { font-size: 20px; }
.evidence-interlude > div { border-left: 1px solid var(--lw-line); padding-left: 40px; }
.text-link { display: inline-flex; align-items: center; gap: 12px; min-height: 44px; font-size: 17px; font-weight: 600; text-decoration-thickness: 1px; }
.ohtrust-page .evidence-footnote { color: var(--lw-muted); font-size: 16px; }
.detail-chapter { position: relative; height: min(66vw,850px); min-height: 540px; background: #eee9df; }
.detail-photograph { position: absolute; inset: 0; }
.detail-photograph img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
.detail-content { height: 100%; position: relative; display: flex; justify-content: flex-end; align-items: center; }
.detail-copy { width: 44%; }
.ohtrust-page .detail-copy h2 { font-size: clamp(22px,2vw,29px); font-weight: 550; line-height: 1.75; letter-spacing: -.025em; }
.detail-copy > p { margin-top: 18px; font-size: 15px; color: var(--lw-muted); }
.detail-copy .text-link { margin-top: 12px; }
.report-section { position: relative; padding-block: 116px 100px; }
.legacy-anchor { position: absolute; top: 0; }
.evidence-dossier-layout { display: grid; grid-template-columns: .85fr 1.4fr; align-items: start; gap: 80px; }
.evidence-summary { position: sticky; top: 124px; }
.section-kicker { margin-bottom: 18px !important; color: var(--lw-forest); font-size: 13px !important; font-weight: 650; letter-spacing: .08em; }
.evidence-summary > p:not(.section-kicker) { margin-top: 24px; color: var(--lw-muted); }
.evidence-summary > a { margin-top: 20px; font-size: 15px; }
.report-guide { margin-bottom: 20px !important; font-size: 14px !important; color: var(--lw-muted); }
.report-record { position: relative; border-top: 1px solid var(--lw-line); }
.report-record:last-child { border-bottom: 1px solid var(--lw-line); }
.report-details > summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: 28px 1fr 22px; align-items: start; gap: 14px; padding: 24px 0 8px; }
.report-details > summary::-webkit-details-marker { display: none; }
.report-sequence { padding-top: 4px; color: var(--lw-muted); font-size: 13px; font-variant-numeric: tabular-nums; }
.report-heading > span { display: block; margin-top: 4px; font-size: 12px; line-height: 1.6; color: var(--lw-muted); }
.report-details > summary > i { padding-top: 4px; transition: transform .2s; }
.report-details[open] > summary > i { transform: rotate(45deg); }
.report-content { padding: 0 0 30px 42px; }
.report-meta-grid { display: grid; gap: 16px; margin-bottom: 22px !important; }
.report-meta-grid dt { margin-bottom: 4px; font-size: 12px; color: var(--lw-muted); font-weight: 500; }
.report-meta-grid dd { font-size: 14px; line-height: 1.85; overflow-wrap: anywhere; }
.report-result { padding-left: 18px; border-left: 2px solid var(--lw-teal); }
.report-result strong { font-size: 13px; font-weight: 650; }
.ohtrust-page .report-result p { margin-top: 6px; font-size: 15px; line-height: 1.85; }
.report-link { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; margin: 0 0 18px 42px; font-size: 13px; font-weight: 600; }
.report-details[open] { padding-top: 0; }
.use-section { padding-block: 90px; background: var(--lw-paper); }
.use-heading { margin-bottom: 44px; }
.evidence-boundary-grid, .professional-notes { display: grid; grid-template-columns: 1fr 1fr; gap: 76px; }
.evidence-boundary-grid ul, .professional-notes ul { margin-top: 16px; padding-left: 1.15em; }
.evidence-boundary-grid li, .professional-notes li { margin-bottom: 12px; color: #555d54; font-size: 15px; }
.ohtrust-page .source-note { margin-top: 24px; color: var(--lw-muted); font-size: 13px; }
.professional-notes { margin-top: 42px; padding-top: 36px; border-top: 1px solid var(--lw-line); }
.professional-notes p { margin-top: 16px; font-size: 15px; color: #555d54; }
.professional-notes strong { color: var(--lw-ink); font-weight: 600; }
.breathing-chapter { position: relative; min-height: 620px; height: min(100svh,900px); background: #f0ece3; }
.breathing-photograph { position: absolute; inset: 0; }
.breathing-photograph img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.breathing-content { position: relative; display: flex; align-items: center; height: 100%; }
.breathing-content > div { width: 48%; }
.ohtrust-page .breathing-content h2 { font-size: clamp(34px,4.2vw,60px); line-height: 1.4; letter-spacing: -.05em; }
.breathing-content p:not(.section-kicker) { margin-top: 26px; font-size: 18px; }
.breathing-content .text-link { margin-top: 24px; font-size: 15px; }
.faq-section { display: grid; grid-template-columns: .85fr 1.4fr; gap: 80px; padding-block: 104px; }
.faq-item { border-top: 1px solid var(--lw-line); }
.faq-item:last-child { border-bottom: 1px solid var(--lw-line); }
.faq-item summary { display: flex; justify-content: space-between; gap: 20px; align-items: center; min-height: 88px; padding-block: 22px; list-style: none; font-size: 17px; font-weight: 550; cursor: pointer; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary i { flex-shrink: 0; transition: transform .2s; }
.faq-item[open] summary i { transform: rotate(45deg); }
.ohtrust-page .faq-item > p { padding: 0 34px 26px 0; font-size: 16px; color: var(--lw-muted); }
.contact-chapter { padding-block: 80px; background: #eaece4; }
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.contact-layout > div > p:not(.section-kicker) { max-width: 32em; font-size: 16px; }
.contact-layout .product-button { margin-top: 24px; }
.all-products-link { display: flex; align-items: center; gap: 10px; width: max-content; min-height: 44px; margin-top: 16px; font-size: 14px; }
.ohtrust-page :is(a,summary):focus-visible, .report-link:focus-visible { outline: 3px solid var(--lw-teal); outline-offset: 5px; border-radius: 2px; }
@media (max-width: 1279px) {
  .ohtrust-page { padding-top: 80px; }
  .page-width { width: calc(100% - 80px); }
  .daily-chapter { gap: 36px; }
  .is-scroll-enhanced .story-layout { column-gap: 42px; }
  .evidence-dossier-layout, .faq-section { gap: 48px; }
}
@media (max-width: 1023px) {
  .lifestyle-hero { min-height: 580px; }
  .hero-copy { width: 46%; }
  .hero-copy .desktop-break { display: none; }
  .ohtrust-page .product-name { font-size: 20px; }
  .ohtrust-page .hero-heading { font-size: clamp(40px,5.4vw,49px); }
  .ohtrust-page .hero-description { font-size: 16px; }
  .daily-chapter { gap: 30px; grid-template-columns: .9fr 1.1fr; }
  .ohtrust-page .daily-copy h2 { font-size: 30px; }
  .daily-copy > p { font-size: 15px; }
  .ohtrust-page .use-caption { margin-top: 30px; font-size: 13px; }
  .evidence-interlude { gap: 26px; }
  .evidence-interlude > div { padding-left: 26px; }
  .evidence-interlude p, .evidence-interlude .text-link { font-size: 15px; }
  .evidence-dossier-layout, .faq-section { grid-template-columns: 1fr 1.5fr; gap: 36px; }
  .professional-notes, .evidence-boundary-grid { gap: 40px; }
}
@media (max-width: 899px), (max-height: 599px), (prefers-reduced-motion: reduce) {
  .everyday-story { padding-block: 72px 12px; }
  .story-intro { padding-bottom: 30px; }
  .story-intro .desktop-break { display: none; }
  .story-step { display: grid; grid-template-columns: .8fr 1fr; gap: 32px; align-items: center; padding-block: 32px 48px; }
  .story-step-copy { max-width: none; }
  .story-inline-photo { margin-top: 0 !important; }
  .ohtrust-page .scene-description { font-size: 16px; }
  .ohtrust-page .scene-note { font-size: 12px; }
  .breathing-content > div { width: 52%; }
}
@media (max-width: 767px) {
  .page-width { width: calc(100% - 40px); }
  .ohtrust-page h2 { font-size: 30px; }
  .lifestyle-hero { height: auto; min-height: 0; display: flex; flex-direction: column; background: #f7f4ed; }
  .hero-content { order: -1; height: auto; padding-block: 44px 30px; }
  .hero-copy { width: 100%; padding: 0; }
  .ohtrust-page .product-name { margin-bottom: 20px; font-size: 18px; }
  .ohtrust-page .hero-heading { font-size: clamp(35px,8.8vw,58px); letter-spacing: -.055em; line-height: 1.32; }
  .ohtrust-page .hero-description { max-width: 30em; margin-top: 20px; font-size: 16px; text-wrap: pretty; }
  .hero-copy .product-button { margin-top: 24px; }
  .explore-link { margin-top: 16px; }
  .hero-photograph { position: static; display: block; width: 100%; height: 370px; }
  .hero-photograph img { object-position: 65% center; }
  .scene-caption { right: 10px; bottom: 10px; font-size: 10px; }
  .daily-chapter { grid-template-columns: 1fr; gap: 30px; padding-block: 56px 36px; }
  .daily-copy > p { max-width: 34em; font-size: 16px; margin-top: 20px; }
  .ohtrust-page .use-caption { margin-top: 26px; padding-top: 20px; font-size: 13px; }
  .daily-photographs { gap: 8px; }
  .daily-photographs figcaption { font-size: 11px; }
  .everyday-story { padding-block: 64px 16px; }
  .story-intro { padding-bottom: 20px; }
  .ohtrust-page .story-intro h2 { font-size: clamp(33px,8.6vw,52px); }
  .story-intro > p:not(.section-kicker) { margin-top: 22px; font-size: 16px; }
  .story-step { display: block; padding-block: 28px 40px; }
  .ohtrust-page .scene-eyebrow { margin-bottom: 18px; }
  .ohtrust-page .story-step h3 { font-size: clamp(29px,7.6vw,45px); }
  .ohtrust-page .scene-description { max-width: 32em; margin-top: 20px; }
  .ohtrust-page .scene-note { margin-top: 22px; padding-top: 16px; }
  .story-inline-photo { margin-top: 26px !important; }
  .evidence-interlude { grid-template-columns: 1fr; gap: 16px; padding-block: 28px 36px; }
  .ohtrust-page .evidence-interlude h2 { font-size: 25px; }
  .evidence-interlude > div { padding-left: 0; border: 0; }
  .detail-chapter { height: auto; min-height: 0; display: flex; flex-direction: column; }
  .detail-photograph { position: static; height: 270px; width: 100%; display: block; }
  .detail-photograph img { object-position: left center; }
  .detail-content { padding-block: 30px; }
  .detail-copy { width: 100%; }
  .ohtrust-page .detail-copy h2 { font-size: 21px; }
  .report-section { padding-block: 64px; }
  .evidence-dossier-layout, .faq-section { grid-template-columns: 1fr; gap: 36px; }
  .evidence-summary { position: static; }
  .report-heading h3 { font-size: 18px; }
  .report-guide { font-size: 13px !important; }
  .use-section { padding-block: 56px; }
  .evidence-boundary-grid, .professional-notes { grid-template-columns: 1fr; gap: 30px; }
  .professional-notes { margin-top: 30px; padding-top: 30px; }
  .breathing-chapter { height: auto; min-height: 0; display: flex; flex-direction: column; }
  .breathing-content { order: -1; height: auto; padding-block: 52px 34px; }
  .breathing-content > div { width: 100%; }
  .ohtrust-page .breathing-content h2 { font-size: clamp(30px,7.8vw,48px); }
  .breathing-content p:not(.section-kicker) { margin-top: 20px; font-size: 16px; }
  .breathing-photograph { position: static; display: block; height: 400px; width: 100%; }
  .breathing-photograph img { object-position: 70% center; }
  .faq-section { padding-block: 64px; }
  .faq-item summary { min-height: 80px; font-size: 16px; }
  .contact-chapter { padding-block: 56px; }
  .contact-layout { grid-template-columns: 1fr; gap: 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .ohtrust-page *, .ohtrust-page *::before, .ohtrust-page *::after { transition: none !important; scroll-behavior: auto !important; }
  .product-button:hover { transform: none; }
}
</style>

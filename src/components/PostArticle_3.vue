<template>
  <section class="winner-section">
    <div class="container">

      <div class="section-heading">
        <p class="eyebrow">Quiz Result</p>
        <h2>得獎名單 & 答案解析</h2>
        <p>
          感謝大家參與專心動物醫院飼主大會考，以下公布本次得獎名單與題目解析。
        </p>
      </div>

      <!-- 得獎名單 -->
      <div class="winner-card">
        <div class="card-title">
          <span>🏆</span>
          <h3>得獎名單</h3>
        </div>

        <div class="winner-grid">
          <div class="winner-item">
            <p class="rank">恭喜得獎</p>
            <h4>得獎者姓名 / 楊X安 手機末三碼709</h4>
          </div>

          <div class="winner-item">
            <p class="rank">恭喜得獎</p>
            <h4>得獎者姓名 / 沈X真 手機末三碼588</h4>
          </div>

          <div class="winner-item">
            <p class="rank">恭喜得獎</p>
            <h4>得獎者姓名 / 林X璇 手機末三碼637</h4>
          </div>
        </div>
      </div>

      <!-- 答案解析 -->
      <div class="analysis-card">
        <div class="card-title">
          <span>📘</span>
          <h3>答案解析</h3>
        </div>

        <div class="qa-list">
          <!-- 第一題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q1</span>
              <div class="question-content">
                <h4>犬貓出現下列哪些情況時，建議安排心臟相關檢查（如X光、心臟超音波）？（複選）</h4>
                <ul class="q-options">
                  <li>(A) 呼吸變快或呼吸變得費力</li>
                  <li>(B) 咳嗽持續超過一週</li>
                  <li>(C) 活動力明顯下降、容易累</li>
                  <li>(D) 突然後肢無力或癱瘓（尤其是貓）</li>
                  <li>(E) 健康檢查時聽到心雜音</li>
                  <li>(F) 打噴嚏次數增加</li>
                  <li>(G) 睡覺時呼吸每分鐘超過30次</li>
                </ul>
              </div>
            </div>
            <!-- 第一題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：ABCDEG</p>
              <p>
                第一題有蠻多人選F的唷!<br>
                解析：(F) 打噴嚏跟鼻子受到刺激有關，建議改善空氣品質，或做鼻腔、口腔相關檢查
              </p>
            </div>
          </article>
          <!-- 第二題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q2</span>
              <div class="question-content">
                <h4>關於狗狗心臟病與「咳嗽」的關係，下列哪些說法是正確的？（複選）</h4>
                <ul class="q-options">
                  <li>(A)只有感冒才會咳嗽，心臟病不會咳嗽</li>
                  <li>(B)心臟病造成的咳嗽，常出現在半夜、清晨或興奮後</li>
                  <li>(C)沒有咳嗽，不代表心臟一定健康</li>
                  <li>(D)咳嗽時只要餵食止咳化痰藥即可，不需要檢查心臟</li>
                  <li>(E)咳嗽時伴隨發燒、精神食慾下降，通常跟心臟病發無關</li>
                  <li>(F)心絲蟲感染最常見的症狀是咳嗽</li>
                </ul>
              </div>
            </div>
            <!-- 第二題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：BCEF</p>
              <p>
                有很多人都沒有選到E唷!
                <br>解析(E):大部分狗心臟病原因與發炎感染無關，很少會發燒，通常食慾也不受影響
              </p>
            </div>
          </article>
          <!-- 第三題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q3</span>
              <div class="question-content">
                <h4>如果在家裡發現狗狗出現以下情況，哪些是「可能左心衰竭惡化，需要儘快就醫」的表現？（複選）</h4>
                <ul class="q-options">
                  <li>(A)呼吸變快，嘴巴張大喘氣</li>
                  <li>(B)呼吸變快，嘴巴微張喘氣</li>
                  <li>(C)呼吸看起來用力，但呼吸聲非常大</li>
                  <li>(D)呼吸看起來用力，肚子起伏明顯，但呼吸聲音不大</li>
                  <li>(E)咳嗽用力且大聲，但呼吸不快</li>
                  <li>(F)坐著或趴著度估，脖子伸長呼吸</li>
                  <li>(G)食慾下降，睡得很沉、不容易叫醒</li>
                </ul>
              </div>
            </div>
            <!-- 第三題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：BDF</p>
              <p>
                蠻多人選A.C.G的!
                <br>解析(A):張大嘴巴喘氣，通常是散熱、緊張或感到疼痛時的表現
                解析(C):上呼吸道阻塞會造成呼吸聲音變大，肺積水的呼吸聲反而不大，主人不易察覺
                解析(G):左心衰竭症狀以肺積水為主，狗狗很難熟睡，甚至會坐著像在打瞌睡
              </p>
            </div>
          </article>
          <!-- 第四題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q4</span>
              <div class="question-content">
                <h4>貓咪出現下列哪些情況時，可能與心臟病（如肥厚性心肌病）有關？（複選）</h4>
                <ul class="q-options">
                  <li>(A)原本正常，卻突然開始喘氣或呼吸變快</li>
                  <li>(B)突然後肢無力或癱瘓</li>
                  <li>(C)躲起來、不太走動</li>
                  <li>(D)咳嗽時身體壓低、脖子伸長，像要吐毛球</li>
                  <li>(E)呼吸時肚子起伏明顯、但沒有張嘴喘氣</li>
                  <li>(F)幼貓運動或興奮後短暫出現明顯張口喘氣</li>
                </ul>
              </div>
            </div>
            <!-- 第四題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：ABCE或ABCDEF</p>
              <p>
                有人選D.F，但其實這題設計成有爭議，可以有兩種答案的!!
                <br>解析(D):貓咪心臟病發幾乎不會咳嗽，通常是呼吸道受了刺激，臨床上有遇過胸水貓也出現咳嗽症狀，但很罕見
                <br>解析(F):幼貓運動後短暫喘屬於生理反應，但若頻率增加、或無法在幾分鐘內恢復，也需排除心臟病
              </p>
            </div>
          </article>
          <!-- 第五題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q5</span>
              <div class="question-content">
                <h4>當貓狗被判定為心衰竭 Stage C 時，下列哪些居家照護措施是正確且必要的？（複選）</h4>
                <ul class="q-options">
                  <li>(A)減少環境壓力與情緒波動，避免環境大幅更動或過度驚嚇</li>
                  <li>(B)為了訓練心肺功能，應每天強迫寵物進行高強度的跑步或玩耍</li>
                  <li>(C)嚴格遵守醫囑給予利尿劑等藥物，不可自行因寵物尿多或症狀好轉而停藥。</li>
                  <li>(D)每日定時在寵物休息或熟睡時測呼吸速率，若每分鐘超過 30-40 次需警戒。</li>
                  <li>(E)在行事曆註記定期回診追蹤腎功能及心臟變化的日期</li>
                </ul>
              </div>
            </div>
            <!-- 第五題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：ACDE</p>
              <p>
                大部分人都答對，很棒！
              </p>
            </div>
          </article>
          <!-- 第六題 -->
          <article class="qa-item">
            <div class="question-row">
              <span class="q-number">Q6</span>
              <div class="question-content">
                <h4>有關犬貓心臟病的觀念，哪些是錯誤的？（複選）</h4>
                <ul class="q-options">
                  <li>(A)二尖瓣退化性疾病常發生在8歲以上小型犬，台灣常見品種為瑪爾濟斯、迷你貴賓、博美等</li>
                  <li>(B)肥厚性心肌病常發生在8歲以上純種貓，短毛家貓較少見</li>
                  <li>(C)長期服用心臟病藥就不會心臟病發了</li>
                  <li>(D)開始服用心臟病藥後，搭配定期追蹤，有可能降低藥量或停藥</li>
                  <li>(E)醫師診斷家中毛小孩為心臟病Stage B1，要趕快去買保健品給牠吃，延緩心臟病惡化</li>
                </ul>
              </div>
            </div>
            <!-- 第六題ANS -->
            <div class="answer-box">
              <p class="answer">正確答案：BCE</p>
              <p>
                解析(D):心臟大小與身體水合狀態有關，若用藥控制得宜，或其他慢性病導致脫水，就可能讓心臟變小，少數犬貓甚至可以停藥；不過建議主人還是需密切觀察心跳及呼吸狀況，畢竟心臟病發多半是「急性」發作，用藥只能延緩發作時間。
              </p>
            </div>
          </article>
        </div>
      </div>
      <!-- 領獎提醒 -->
      <div class="notice-card">
        <h3>領獎注意事項</h3>
        <p>
          請得獎者依照院方公告方式私訊或聯繫專心動物醫院，確認身分與領獎方式。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// import { useId, useImperativeHandle } from 'react';

</script>

<style scoped>
.winner-section {
  padding: 90px 16px;
  background: linear-gradient(180deg, #f7fbff 0%, #eef5fb 100%);
}

.section-heading {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 48px;
}

.eyebrow {
  color: #d7a84f;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-heading h2 {
  color: #0b2c4d;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 900;
  margin-bottom: 18px;
}

.section-heading p {
  color: #52677b;
  line-height: 1.9;
}

.winner-card,
.analysis-card,
.notice-card {
  max-width: 980px;
  margin: 0 auto 36px;
  background: white;
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(11, 44, 77, 0.08);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.card-title span {
  font-size: 2rem;
}

.card-title h3 {
  color: #0b2c4d;
  font-weight: 900;
  margin: 0;
}

.winner-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.winner-item {
  border-radius: 24px;
  padding: 28px;
  background: linear-gradient(135deg, #0b2c4d, #123e68);
  color: #E0E0E0;
  border: 1px solid #dbe7f1;
}


.rank {
  color: #d7a84f;
  font-weight: 900;
  margin-bottom: 12px;
}

.winner-item h4 {
  font-weight: 850;
  margin-bottom: 10px;
}

.winner-item p {
  line-height: 1.7;
  margin-bottom: 0;
}

.qa-list {
  display: grid;
  gap: 28px;
}

.qa-item {
  border-bottom: 1px solid #dbe7f1;
  padding-bottom: 28px;
}

.qa-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.question-row {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.q-number {
  flex: 0 0 auto;
  background: #0b2c4d;
  color: white;
  font-weight: 900;
  border-radius: 999px;
  padding: 8px 14px;
}

.q-options {
  margin-top: 20px;
  padding-left: 20px;

  display: block;
  /* ❗確保不是 flex */
}

.q-options li {
  display: list-item;
  /* ❗關鍵：還原 li 預設 */
  margin-bottom: 10px;
  line-height: 1.6;
}

.question-row h4 {
  color: #0b2c4d;
  font-weight: 850;
  margin: 0;
  line-height: 1.6;
}

.answer-box {
  background: #f7fbff;
  border-radius: 22px;
  padding: 24px;
  border-left: 5px solid #d7a84f;
}

.answer {
  color: #c99700;
  font-weight: 900;
  margin-bottom: 10px;
}

.answer-box p,
.notice-card p {
  color: #52677b;
  line-height: 1.9;
}

.notice-card {
  background: #0b2c4d;
  color: white;
}

.notice-card h3 {
  font-weight: 900;
  margin-bottom: 16px;
}

.notice-card p {
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 992px) {
  .winner-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {

  .winner-card,
  .analysis-card,
  .notice-card {
    padding: 28px 22px;
  }

  .question-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
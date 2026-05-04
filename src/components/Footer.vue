<template>
  <footer class="footer">
    <div class="container">

      <div class="row">

        <!-- 品牌 -->
        <div class="col-md-4 mb-4">
          <h5 class="footer-title">CardioSpecial</h5>
          <p class="footer-text">
            專注犬貓心臟專科診療，提供從早期篩檢到長期治療的完整照護。
          </p>
        </div>

        <!-- 聯絡資訊 -->
        <div class="col-md-4 mb-4">
          <h6 class="footer-subtitle">聯絡資訊</h6>
          <p>📞 02-2363-3016 / 02-2358-3056</p>
          <p>📍 台北市中正區仁愛路一段47號1樓</p>
          <h6 class="footer-subtitle">營業時間</h6>
          <p>週一上午10:00 – 下午09:30
            <br>週二下午01:00 – 下午09:00
            <br>週三上午10:00 – 下午06:00
            <br>週四上午10:00 – 下午09:30
            <br>週五上午10:00 – 下午09:30
            <br>週六上午10:00 – 下午06:00
            <br>週日休診＆國定假日休診
          </p>
        </div>

        <!-- 快速連結 -->
        <div class="col-md-4 mb-4">
          <h6 class="footer-subtitle">快速連結</h6>

          <ul class="footer-links">
            <li><a href="#about">關於我們</a></li>
            <li><a href="#services">專科服務</a></li>
            <li><a href="#doctors">醫師團隊</a></li>
            <li><a href="#contact">聯絡我們</a></li>
          </ul>
        </div>

      </div>

      <hr class="footer-divider">

      <!-- 版權 -->
      <div class="text-center small">
        © 2026 CardioSpecial 動物心臟專科
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #111;
  color: #ddd;
  padding: 50px 0 20px;
}

.footer-title {
  font-weight: 700;
  color: white;
}

.footer-subtitle {
  font-weight: 600;
  margin-bottom: 10px;
  color: white;
}

.footer-text {
  color: #aaa;
  font-size: 14px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 6px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: 0.2s;
}

.footer-links a:hover {
  color: white;
}

.footer-divider {
  border-color: #333;
  margin: 20px 0;
}
</style>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">

      <router-link class="navbar-brand" to="/">
        CardioSpecial / 專心動物醫院
      </router-link>

      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#about">醫院介紹</a></li>
          <li class="nav-item"><a class="nav-link" href="#services">專科服務</a></li>
          <li class="nav-item"><a class="nav-link" href="#doctors">醫師團隊</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">聯絡我們</a></li>
          <li class="nav-item"><a class="nav-link" href="#news">專心快訊</a></li>
          <li class="nav-item"><a class="nav-link" href="#tumor">腫瘤門診</a></li>
          <router-link to="/products">
            <li class="nav-item"><a class="nav-link"">產品</a></li>
          </router-link>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script>

</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;

  background: rgba(13, 47, 79, 0.85);
  /* 深藍半透明 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  transition: all 0.3s ease;
}

.navbar-brand {
  font-weight: 600;
  color: white !important;
}
</style>

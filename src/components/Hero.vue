<template>
  <section class="hero">
    <div class="hero-overlay">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">

            <h1>犬貓心臟專科診療</h1>

            <p class="lead">
              從早期篩檢到心衰竭管理，提供完整心臟照護
            </p>

            <a href="https://docs.google.com/forms/d/e/YOUR_FORM/viewform" target="_blank"
              class="btn btn-primary btn-lg mt-3">
              立即線上預約！
            </a>

            <!-- <RouterLink to="/appointment" class="btn btn-primary">
              立即線上預約！
            </RouterLink> -->

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 70vh;

  background-image: url('/imgs/rs=w_1160,h_955.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  color: white;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
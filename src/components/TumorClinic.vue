<template>
    <section id="tumor" class="py-5 bg-light">
        <div class="container">

            <!-- 標題 -->
            <div class="text-center mb-5">
                <h2 class="fw-bold">腫瘤門診</h2>
                <p class="text-muted">
                    從早期篩檢到腫瘤治療與安寧照護，提供完整腫瘤醫療規劃
                </p>
            </div>

            <!-- 症狀提示 -->
            <div class="row text-center mb-5">
                <div class="col-md-4">
                    <div class="p-3">
                        <h5>🐶 不明腫塊</h5>
                        <p class="text-muted">身體出現腫塊或持續變大</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="p-3">
                        <h5>🐱 食慾下降</h5>
                        <p class="text-muted">體重減輕或食慾不振</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="p-3">
                        <h5>⚠️ 慢性不適</h5>
                        <p class="text-muted">持續虛弱或精神變差</p>
                    </div>
                </div>
            </div>

            <!-- 服務內容 -->
            <div class="row g-4">

                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body text-center">
                            <h5 class="card-title">腫瘤影像診斷</h5>
                            <p class="card-text text-muted">
                                超音波、X光等影像評估腫瘤位置與擴散情形
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body text-center">
                            <h5 class="card-title">化療與標靶治療</h5>
                            <p class="card-text text-muted">
                                依腫瘤類型提供個別化治療方案
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body text-center">
                            <h5 class="card-title">安寧與生活品質照護</h5>
                            <p class="card-text text-muted">
                                以提升生活品質為核心的長期照護
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- CTA -->
            <div class="text-center mt-5">
                <a href="/files/專心腫瘤轉診單(新版1).docx" download class="btn btn-danger btn-lg">
                    填寫腫瘤轉診單
                </a>
            </div>

        </div>
    </section>
</template>

<script setup>
// 暫時不需要邏輯
</script>

<style scoped>
section {
    scroll-margin-top: 80px;
}
</style>
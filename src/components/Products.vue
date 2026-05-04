<template>
    <section class="products-page py-5">
        <div class="container">

            <h1 class="mb-4">產品</h1>
            <p class="text-muted mb-5">
                提供犬貓日常環境清潔、氣味管理與照護輔助產品，
                以安全性檢測為基礎，作為醫療之外的輔助選擇。
            </p>

            <div class="row g-4">

                <!-- OH Trust 卡片 -->
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0 rounded-4">

                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">歐舒特 OH Trust</h5>

                            <p class="card-text text-muted">
                                抗菌、除臭與環境清潔輔助產品，
                                通過多項安全性測試，適用於犬貓日常環境管理。
                            </p>

                            <router-link to="/ohtrust" class="btn btn-outline-primary mt-auto">
                                查看產品
                            </router-link>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </section>
</template>
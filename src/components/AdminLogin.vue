<template>
    <section class="login-section">

        <div class="login-card">

            <h2>管理員登入</h2>

            <p class="subtitle">
                請使用院內管理帳號登入
            </p>

            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="login">

                <div class="mb-3">
                    <label class="form-label">
                        Email
                    </label>

                    <input v-model="email" type="email" class="form-control" required />
                </div>

                <div class="mb-4">
                    <label class="form-label">
                        密碼
                    </label>

                    <input v-model="password" type="password" class="form-control" required />
                </div>

                <button class="btn login-btn w-100" :disabled="loading">
                    {{ loading ? '登入中...' : '登入' }}
                </button>

            </form>

        </div>

    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
    signInWithEmailAndPassword
} from 'firebase/auth'

import {
    auth
} from '../firebase/firebaseConfig'

const router = useRouter()

const email = ref('')
const password = ref('')

const errorMessage = ref('')
const loading = ref(false)

const login = async () => {

    errorMessage.value = ''

    try {

        loading.value = true

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )

        router.push('/adminAppointments')

    } catch (error) {

        console.error(error)

        errorMessage.value =
            '登入失敗，請確認帳號密碼'

    } finally {

        loading.value = false

    }

}
</script>

<style scoped>
.login-section {
    min-height: 100vh;
    background: #f8fafc;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 24px;
}

.login-card {
    width: 100%;
    max-width: 420px;

    background: white;

    padding: 40px;

    border-radius: 24px;

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.login-card h2 {
    font-weight: 800;
    color: #0f172a;
}

.subtitle {
    color: #64748b;
    margin-bottom: 28px;
}

.form-control {
    border-radius: 14px;
    padding: 14px;
}

.login-btn {
    background: #0f172a;
    color: white;

    padding: 14px;

    border-radius: 14px;

    font-weight: 700;
}

.login-btn:hover {
    background: #1e293b;
    color: white;
}
</style>
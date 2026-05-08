<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase/firebaseConfig'

const router = useRouter()

const appointments = ref([])
const keyword = ref('')
const filterStatus = ref('')
const loading = ref(false)
const expandedId = ref(null)

const statusOptions = [
    { key: 'new', label: '新預約' },
    { key: 'contacted', label: '已聯絡' },
    { key: 'scheduled', label: '已安排' },
    { key: 'completed', label: '已完成' },
    { key: 'cancelled', label: '已取消' }
]

const statusText = (status) => {
    const found = statusOptions.find(item => item.key === status)
    return found ? found.label : status
}

const statusClass = (status) => {
    return {
        new: 'bg-secondary',
        contacted: 'bg-primary',
        scheduled: 'bg-warning text-dark',
        completed: 'bg-success',
        cancelled: 'bg-danger'
    }[status] || 'bg-secondary'
}

const normalizeStatuses = (item) => {
    if (Array.isArray(item.statuses) && item.statuses.length > 0) {
        return item.statuses
    }

    if (item.status) {
        return [item.status]
    }

    return ['new']
}

const fetchAppointments = async () => {
    loading.value = true

    try {
        const q = query(
            collection(db, 'appointments'),
            orderBy('createdAt', 'desc')
        )

        const snapshot = await getDocs(q)

        appointments.value = snapshot.docs.map(docSnap => {
            const data = docSnap.data()

            return {
                id: docSnap.id,
                ...data,
                statuses: normalizeStatuses(data)
            }
        })
    } catch (error) {
        console.error(error)
        alert('讀取預約資料失敗')
    } finally {
        loading.value = false
    }
}

const filteredAppointments = computed(() => {
    return appointments.value.filter(item => {
        const text = `
      ${item.ownerName || ''}
      ${item.petName || ''}
      ${item.phone || ''}
      ${item.email || ''}
      ${item.note || ''}
      ${item.species || ''}
      ${item.breed || ''}
    `.toLowerCase()

        const matchKeyword = text.includes(keyword.value.toLowerCase())

        const matchStatus = filterStatus.value
            ? item.statuses.includes(filterStatus.value)
            : true

        return matchKeyword && matchStatus
    })
})

const toggleExpand = (id) => {
    expandedId.value = expandedId.value === id ? null : id
}

const toggleStatus = async (appointment, status) => {
    let newStatuses = [...appointment.statuses]

    if (newStatuses.includes(status)) {
        newStatuses = newStatuses.filter(s => s !== status)
    } else {
        newStatuses.push(status)
    }

    if (newStatuses.length === 0) {
        newStatuses = ['new']
    }

    if (status !== 'new') {
        newStatuses = newStatuses.filter(s => s !== 'new')
    }

    if (status === 'cancelled' && newStatuses.includes('cancelled')) {
        newStatuses = ['cancelled']
    }

    if (status !== 'cancelled') {
        newStatuses = newStatuses.filter(s => s !== 'cancelled')
    }

    try {
        await updateDoc(doc(db, 'appointments', appointment.id), {
            statuses: newStatuses,
            status: newStatuses[0]
        })

        appointment.statuses = newStatuses
        appointment.status = newStatuses[0]
    } catch (error) {
        console.error(error)
        alert('更新狀態失敗')
    }
}

const removeAppointment = async (appointment) => {
    const confirmed = confirm(`確定要刪除 ${appointment.petName || '這筆預約'} 嗎？`)

    if (!confirmed) return

    try {
        await deleteDoc(doc(db, 'appointments', appointment.id))
        appointments.value = appointments.value.filter(item => item.id !== appointment.id)
    } catch (error) {
        console.error(error)
        alert('刪除失敗')
    }
}

const formatDate = (value) => {
    if (!value) return '-'

    if (value.toDate) {
        return value.toDate().toLocaleString('zh-TW')
    }

    return new Date(value).toLocaleString('zh-TW')
}

const logout = async () => {
    await signOut(auth)
    router.push('/adminLogin')
}

onMounted(fetchAppointments)
</script>

<template>
    <section class="admin-page">
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <p class="text-muted mb-1">Admin Dashboard</p>
                    <h2 class="fw-bold mb-0">預約管理後台</h2>
                </div>

                <button class="btn btn-outline-dark" @click="logout">
                    登出
                </button>
            </div>

            <div class="card border-0 shadow-sm mb-4 filter-card">
                <div class="card-body">
                    <div class="row g-3 align-items-center">
                        <div class="col-md-6">
                            <input v-model="keyword" type="text" class="form-control"
                                placeholder="搜尋飼主、寵物、電話、Email 或備註">
                        </div>

                        <div class="col-md-4">
                            <select v-model="filterStatus" class="form-select">
                                <option value="">全部狀態</option>
                                <option v-for="status in statusOptions" :key="status.key" :value="status.key">
                                    {{ status.label }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-2 text-md-end">
                            <span class="text-muted">
                                共 {{ filteredAppointments.length }} 筆
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="text-center py-5 text-muted">
                讀取中...
            </div>

            <div v-else-if="filteredAppointments.length === 0" class="text-center py-5 text-muted">
                目前沒有符合條件的預約
            </div>

            <div v-else class="row g-4">
                <div v-for="appointment in filteredAppointments" :key="appointment.id" class="col-12">
                    <div class="card border-0 shadow-sm appointment-card">
                        <div class="appointment-summary" @click="toggleExpand(appointment.id)">
                            <div>
                                <h4 class="fw-bold mb-2">
                                    {{ appointment.petName || '未填寵物名' }}
                                </h4>

                                <p class="mb-0 text-muted fs-5">
                                    {{ appointment.ownerName || '未填飼主' }}
                                    ｜
                                    {{ appointment.phone || '未填電話' }}
                                </p>
                            </div>

                            <div class="d-flex align-items-center gap-3 flex-wrap">
                                <span v-for="status in appointment.statuses" :key="status"
                                    class="badge rounded-pill px-3 py-2" :class="statusClass(status)">
                                    {{ statusText(status) }}
                                </span>

                                <span class="expand-icon">
                                    {{ expandedId === appointment.id ? '⌃' : '⌄' }}
                                </span>
                            </div>
                        </div>

                        <div v-if="expandedId === appointment.id" class="appointment-detail border-top">
                            <div class="row g-3 mb-3">
                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>種類</small>
                                        <strong>{{ appointment.species || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>品種</small>
                                        <strong>{{ appointment.breed || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>年紀</small>
                                        <strong>{{ appointment.age || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>性別</small>
                                        <strong>{{ appointment.sex || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>結紮</small>
                                        <strong>{{ appointment.neutered || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>晶片</small>
                                        <strong>{{ appointment.microchip || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>Email</small>
                                        <strong>{{ appointment.email || '-' }}</strong>
                                    </div>
                                </div>

                                <div class="col-md-3 col-6">
                                    <div class="info-box">
                                        <small>方便聯絡時段</small>
                                        <strong>{{ appointment.contactTime || '-' }}</strong>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <h6 class="fw-bold">地址</h6>
                                <p class="mb-0 text-muted">
                                    {{ appointment.address || '未填寫' }}
                                </p>
                            </div>

                            <div class="mb-3">
                                <h6 class="fw-bold">主訴 / 備註</h6>
                                <p class="mb-0 text-muted">
                                    {{ appointment.note || '未填寫' }}
                                </p>
                            </div>

                            <div class="mb-3 text-muted small">
                                送出時間：{{ formatDate(appointment.createdAt) }}
                            </div>

                            <div class="d-flex flex-wrap gap-2">
                                <button v-for="status in statusOptions" :key="status.key" class="btn btn-sm" :class="appointment.statuses.includes(status.key)
                                    ? 'btn-dark'
                                    : 'btn-outline-secondary'" @click.stop="toggleStatus(appointment, status.key)">
                                    {{ appointment.statuses.includes(status.key) ? '✓ ' : '' }}
                                    {{ status.label }}
                                </button>

                                <button class="btn btn-sm btn-outline-danger ms-auto"
                                    @click.stop="removeAppointment(appointment)">
                                    刪除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.admin-page {
    background: #f8f9fa;
    min-height: 100vh;
}

.filter-card,
.appointment-card {
    border-radius: 1.25rem;
}

.appointment-card {
    overflow: hidden;
}

.appointment-summary {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    cursor: pointer;
    padding: 1.75rem;
    background: #fff;
    transition: background 0.2s ease;
}

.appointment-summary:hover {
    background: #fafafa;
}

.appointment-detail {
    padding: 1.75rem;
    background: #fff;
}

.expand-icon {
    font-size: 1.75rem;
    line-height: 1;
    color: #6c757d;
    user-select: none;
}

.info-box {
    background: #f8f9fa;
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    height: 100%;
}

.info-box small {
    display: block;
    color: #6c757d;
    margin-bottom: 0.25rem;
}

.info-box strong {
    font-size: 0.95rem;
    color: #212529;
    word-break: break-word;
}

@media (max-width: 768px) {
    .appointment-summary {
        flex-direction: column;
    }
}
</style>
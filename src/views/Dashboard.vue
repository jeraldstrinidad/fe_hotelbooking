<template>
  <div>
    <NavBar />

    <div class="container">
      <div class="dashboard glass">
        <h2 class="dash-title">My Bookings</h2>
        <p class="dash-subtitle">View and manage your booked rooms below.</p>

        <div v-if="bookings.length === 0" class="empty-booking glass">
          <h3>No bookings yet</h3>
          <p>Start exploring rooms and make your first booking today!</p>
          <router-link to="/">
            <button class="btn-accent">Browse Rooms</button>
          </router-link>
        </div>

        <div v-else class="booking-list">
          <div v-for="b in bookings" :key="b.id" class="booking-card glass">
            <div class="booking-card-left">
              <div class="booking-thumb" :style="{ backgroundImage: `url(${imageUrl(b.room.id)})` }"></div>
            </div>

            <div class="booking-card-right">
              <div class="booking-header">
                <h3>{{ b.room.name }}</h3>
                <span :class="['status-badge', b.status]">
                  {{ b.status }}
                </span>
              </div>

              <div class="booking-dates">
                <span>{{ b.checkin }}</span>
                <span>→</span>
                <span>{{ b.checkout }}</span>
              </div>

              <div class="booking-info">
                <div class="price">₱{{ b.total_price }}</div>

                <div v-if="b.status === 'confirmed'">
                  <button class="btn-outline" @click="cancel(b.id)">
                    Cancel
                  </button>
                </div>

                <div v-else class="cancelled-label">Cancelled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import api from '../services/api'

export default {
  components: { NavBar },
  data() {
    return { bookings: [] }
  },
  async mounted() {
    try {
      const res = await api.get('/bookings')
      this.bookings = res.data
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    imageUrl(id) {
      return `https://picsum.photos/seed/booking${id}/800/600`
    },
    async cancel(id) {
      try {
        const res = await api.post(`/bookings/${id}/cancel`)
        const updated = res.data.booking || {}
        this.bookings = this.bookings.map(b =>
          b.id === id ? { ...b, status: updated.status || 'cancelled' } : b
        )
      } catch (e) {
        console.error(e)
        alert(e.response?.data?.message || 'Cancel failed')
      }
    }

  }
}
</script>

<style scoped></style>

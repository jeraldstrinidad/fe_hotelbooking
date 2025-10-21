<template>
  <div>
    <NavBar/>
    <div class="container">
      <div class="panel glass">
        <div class="detail-layout">
          <div>
            <div :style="{ height: '360px', borderRadius:'12px', overflow:'hidden', backgroundImage:`url(${imageUrl})`, backgroundSize:'cover', backgroundPosition:'center' }"></div>
            <div style="margin-top:1rem">
              <h2>{{ room.name }}</h2>
              <p style="color:rgba(255,255,255,0.85)">{{ room.description }}</p>
              <div style="margin-top:1rem;display:flex;gap:0.6rem;align-items:center">
                <div class="badge">{{ room.capacity }} persons</div>
                <div class="badge">Free cancellation</div>
              </div>
            </div>
          </div>

          <aside>
            <div class="book-box glass">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
                <div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.75)">Price / night</div>
                  <div style="font-weight:800;font-size:1.2rem">₱{{ room.price_per_night }}</div>
                </div>
                <div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.75)">Status</div>
                  <div class="badge" style="background:rgba(255,255,255,0.03)">Available</div>
                </div>
              </div>

              <label>Check-in</label>
              <input type="date" v-model="checkin" />
              <label>Check-out</label>
              <input type="date" v-model="checkout" />
              <div style="margin-top:0.6rem" class="bookClass">
                <button @click="book" >Confirm Booking</button>
              </div>
              <div v-if="message" :class="['message']" style="margin-top:0.6rem;background:#dcfce7;color:#064e3b">{{ message }}</div>
            </div>
          </aside>
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
  data(){ return { room: {}, checkin:'', checkout:'', message:'' } },
  computed:{ imageUrl(){ return `https://picsum.photos/seed/room${this.$route.params.id}/1200/800` } },
  async mounted(){
    try{
      const res = await api.get(`/rooms/${this.$route.params.id}`)
      this.room = res.data
    }catch(e){ console.error(e) }
  },
  methods:{
    async book(){
      try{
        if(!this.checkin || !this.checkout) { this.message = 'Select dates'; return }
        const payload = { room_id: this.room.id, checkin: this.checkin, checkout: this.checkout }
        const res = await api.post('/bookings', payload)
        this.message = 'Booking confirmed!'
      }catch(e){
        this.message = e.response?.data?.message || 'Booking failed'
      }
    }
  }
}
</script>

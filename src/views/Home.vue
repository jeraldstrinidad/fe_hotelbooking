<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="panel">
        <div class="hero" style="align-items:center;">
          <div class="hero-left">
            <h2 style="margin:0 0 .25rem 0">Find your perfect stay</h2>
            <div style="color:rgba(255,255,255,0.8);margin-bottom:0.6rem">Search available rooms and book in seconds.</div>
            <div class="search">
              <input type="text" v-model="q" placeholder="Search by name or description" @input="search" />
              <button @click="search">Search</button>
            </div>
          </div>
        </div>

        <div v-if="rooms.length === 0" style="margin-top:1.6rem">
          <div class="panel auth-center glass">
            <h3>No rooms found</h3>
            <p style="color:rgba(255,255,255,0.75)">Try clearing filters or add rooms in backend seed.</p>
          </div>
        </div>

        <div class="room-grid" style="margin-top:1.6rem">
          <RoomCard v-for="r in rooms" :key="r.id" :room="r" />
        </div>
      </div>
    </div>

    <div class="footer">© {{ new Date().getFullYear() }} Hotel Booking — by Jerald S. Trinidad</div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RoomCard from '../components/RoomCard.vue'
import api from '../services/api'

export default {
  components: { NavBar, RoomCard },
  data(){ return { q:'', rooms: [] } },
  mounted(){ this.search() },
  methods:{
    async search(){
      try{
        const res = await api.get('/rooms', { params:{ q: this.q } })
        // api pagination returns data.data or plain array
        this.rooms = res.data.data || res.data
      }catch(e){
        console.error(e)
        this.rooms = []
      }
    }
  }
}
</script>

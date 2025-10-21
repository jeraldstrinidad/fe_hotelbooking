<template>
  <div class="app-header container">
    <div class="brand">
      <div class="logo">HB</div>
      <div>
        <h1>Hotel Booking</h1>
        <div style="font-size:12px;color:rgba(255,255,255,0.75)">Your comfort, our priority.</div>
      </div>
    </div>

    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>

      <template v-if="!user">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>

      <template v-else>
        <div class="row">
          <div style="font-weight:700;color:var(--muted)">{{ user.name }}</div>
          <button @click="logout">Logout</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { setToken } from '../services/api'
export default {
  data(){ return { user: JSON.parse(localStorage.getItem('user') || 'null') } },
  methods:{
    logout(){
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.user = null
      this.$router.push('/')
    }
  },
  watch: {
    // update when route changes if user logs in/out
    '$route'(){ this.user = JSON.parse(localStorage.getItem('user') || 'null') }
  }
}
</script>

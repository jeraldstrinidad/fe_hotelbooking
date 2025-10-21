<template>
  <div>
    <NavBar />

    <div class="container" style="display:flex;justify-content:center;align-items:center;min-height:75vh;">
      <div class="auth-card glass">
        <h2 class="auth-title">Welcome Back 👋</h2>
        <p class="auth-subtitle">Log in to access your bookings and profile.</p>

        <div class="auth-form">
          <input v-model="email" type="email" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />

          <button class="btn-accent" @click="doLogin">Sign In</button>

          <p class="auth-alt">
            Don't have an account?
            <router-link to="/register">Create one</router-link>
          </p>
        </div>

        <p v-if="err" class="auth-error">{{ err }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import api, { setToken } from '../services/api'

export default {
  components: { NavBar },
  data() {
    return { email: '', password: '', err: '' }
  },
  methods: {
    async doLogin() {
      try {
        const res = await api.post('/login', {
          email: this.email,
          password: this.password
        })
        const token = res.data.token
        setToken(token)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        this.$router.push('/')
      } catch (e) {
        this.err =
          e.response?.data?.message ||
          (e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join(', ')
            : 'Invalid credentials')
      }
    }
  }
}
</script>

<style scoped>

</style>

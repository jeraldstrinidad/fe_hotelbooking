<template>
  <div>
    <NavBar />

    <div class="container" style="display:flex;justify-content:center;align-items:center;min-height:75vh;">
      <div class="auth-card glass">
        <h2 class="auth-title">Create Account ✨</h2>
        <p class="auth-subtitle">Join us and book your next stay easily.</p>

        <div class="auth-form">
          <input v-model="name" placeholder="Full name" />
          <input v-model="email" type="email" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm password"
          />

          <button class="btn-accent" @click="register">Register</button>

          <p class="auth-alt">
            Already have an account?
            <router-link to="/login">Login</router-link>
          </p>
        </div>

        <p v-if="msg" class="auth-success">{{ msg }}</p>
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
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      msg: ''
    }
  },
  methods: {
    async register() {
      try {
        const res = await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        this.msg = 'Account created successfully!'
        setTimeout(() => this.$router.push('/'), 1000)
      } catch (e) {
        this.msg =
          e.response?.data?.message ||
          (e.response?.data?.errors
            ? Object.values(e.response.data.errors).flat().join(', ')
            : 'Registration failed')
      }
    }
  }
}
</script>

<style scoped>

</style>

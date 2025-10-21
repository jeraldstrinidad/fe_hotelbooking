<template>
  <div class="my-custom-container">

    <router-view/>
  </div>
</template>

<script>
import { setToken } from './services/api'
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
  }
}
</script>

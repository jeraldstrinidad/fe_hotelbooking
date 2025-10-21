import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RoomDetail from '../views/RoomDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path:'/', name:'Home', component:Home },
  { path:'/rooms/:id', name:'RoomDetail', component:RoomDetail, props:true },
  { path:'/login', name:'Login', component:Login },
  { path:'/register', name:'Register', component:Register },
  { path:'/dashboard', name:'Dashboard', component:Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router

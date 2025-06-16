import {createRouter, createWebHistory} from 'vue-router'
import Home from '../home/home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
  },
  {
    path: '/rutinas/:dia',
    name: 'rutinas',
    component: () => import('../rutinas/rutinas.vue'),
}]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
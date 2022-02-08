import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import Read from '../views/Read.vue'
import Update from '../views/Update.vue'
import Delete from '../views/Delete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/',
    name: 'read',
    component: Read
  },
  {
    path: '/update',
    name: 'update',
    component: Update
  },
  {
    path: '/delete',
    name: 'delete',
    component: Delete
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

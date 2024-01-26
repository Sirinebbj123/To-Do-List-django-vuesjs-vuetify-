import { createApp } from 'vue'
import App from './App.vue'
import AddTasks from './components/AddTasks.vue'
import Tasks from './components/Tasks.vue'
import UpdateTask from './components/UpdateTask.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Pagination from './components/Pagination.vue'

const routes = [
  { path: '/', component: Home }, 
  { path: '/tasks', component: Tasks },
  { path: '/create', component: AddTasks },
  { path: '/update/:taskId', name: 'UpdateTask', component: UpdateTask },
  { path: '/Pagination', component: Pagination }, 



]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.mount('#app')
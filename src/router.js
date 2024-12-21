import { createRouter, createWebHistory } from 'vue-router';
import KidsHome from './views/KidsHome.vue'; // Исправлено

const routes = [
  { path: '/', component: KidsHome }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
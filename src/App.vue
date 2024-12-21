<template>
  <div id="app">
    <KidsHeader />      <!-- Здесь добавляем KidsHeader один раз -->
    <router-view />     <!-- Вставка для отображения страниц -->
  </div>
</template>

<script>
import KidsHeader from './components/KidsHeader.vue';

export default {
  components: {
    KidsHeader
  }
};
</script>

<style>
/* Добавьте здесь глобальные стили, если это необходимо */
</style>
<template>
  <div class="schedule">
    <span v-for="(day, index) in schedule" :key="index" class="day">
    {{ day }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    schedule: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

.schedule .day {
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 10px;
gap: 10px;
width: 137px;
height: 28px;
margin-right:50px;
background: #F7DAAB;
border-radius: 5px;
}
.schedule {
  margin-left: 40px;
  margin-right: auto; /* Чтобы другие элементы располагались справа от этого блока */
}
</style>
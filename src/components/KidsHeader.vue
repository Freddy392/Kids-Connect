<template>
  <header class="header">
    <div class="logo">
      <img :src="require('@/assets/icons/logo.svg')" alt="KidsConnect Logo" />
      <span>KidsConnect</span>
    </div>

  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  height: 100px;
  justify-content: space-between;
  background-color: #70232f;
  color: white;
  padding: 10px;
  font-family: 'Montserrat Alternates';
  font-size: 32px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.logo {
  display: flex;
  align-items: center;
}
.logo img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.search-box {
  width: 200px;
  padding: 8px;
  border: none;
  border-radius: 4px;
}
.map-button img {
  width: 20px;
  height: 20px;
}
</style>
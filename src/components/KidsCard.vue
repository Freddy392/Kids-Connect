<template>
  <div class="card">
    <div class="card-content">
      <div class="image-container">
        <img :src="placeholderImage" alt="Placeholder" class="card-image" />
      </div>

      <div class="card-info">
        <h3>{{ title }}</h3>
        <h3>{{ titleAdr }}</h3>
        <p class="xeshTag"><strong>#</strong>{{ xesh }}</p>
        <p>
          <img :src="require('@/assets/icons/age-icon.svg')" alt="Возраст" />
          {{ age }}
        </p>
        <p>
          <img :src="require('@/assets/icons/adress-icon.svg')" alt="Адрес" />
          {{ address }}
        </p>
        <p>
          <img :src="require('@/assets/icons/local-icon.svg')" alt="Место" />
          {{ location }}
        </p>
        <div class="schedule-container" style="margin-top:-15px">
          <p>
            <img :src="require('@/assets/icons/clock-icon.svg')" alt="День" />
            {{ days }}
          </p>
          <KidsSchedule :schedule="schedule" />
          <div class="button-container">
            <button class="details-button" @click="showDetails">Подробнее</button> <!-- Обработчик на кнопку -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="firstFree === '1'" class="first-free-icon">
      Первое бесплатно
    </div>
    <span class="tag">{{ tag }}</span>
  </div>
</template>

<script>
import KidsSchedule from "./KidsSchedule.vue";

export default {
  props: [
    "firstFree",
    "title",
    "titleAdr",
    "xesh",
    "age",
    "address",
    "location",
    "days",
    "schedule",
    "tag",
    "placeholderImage",
  ],
  components: {
    KidsSchedule,
  },
  methods: {
    showDetails() {
      this.$emit('show-modal', { title: this.title, titleAdr: this.titleAdr }); // Эмитируем событие
    }
  }
};
</script>

<style scoped>
.first-free-icon {
  position: absolute; /* Абсолютное позиционирование для тега "Бесплатно" */
  top: 15px; /* Отступ сверху */
  right: 130px; /* Отступ справа */
  font-size: 12px;
  font-family: 'Montserrat';
  line-height: 15px;
  border: 1px solid #D86B79;
  border-radius: 5px; /* Закругленные углы для тега */
  padding: 5px 10px; /* Внутренние отступы */
}

.card {
  box-sizing: border-box; /* Учитываем границы и отступы при расчете ширины и высоты */
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Выравнивание элементов по правому краю */
  padding: 20px; /* Внутренние отступы */
  gap: 10px; /* Промежуток между элементами */
  width: 1030px; /* Ширина блока */
  height: 240px; /* Высота блока */
  background: #ffffff; /* Фоновый цвет */
  border-top: 2px solid #70232F; /* Верхняя граница */
  border-radius: 5px; /* Закругленные углы */
  position: relative; /* Позволяет позиционировать элементы внутри карточки */
}

.card-content {
  display: flex; /* Для размещения изображения и текста в ряд */
  align-items: flex-start; /* Вертикальное выравнивание по началу */
  width: 100%; /* Ширина контента равна ширине карточки */
}

.image-container {
  width: 200px; /* Ширина для изображения */
  height: 200px; /* Высота для изображения (делаем квадратным) */
  overflow: hidden; /* Чтобы скрыть часть изображения, выходящую за пределы контейнера */
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 100%; /* Изображение растягивается по ширине контейнера */
  height: auto; /* Автоматическая высота для пропорций */
}

.card-info {
  flex-grow: 1; /* Позволяет карточке занимать всё доступное пространство */
  margin-left: 15px; /* Отступ между изображением и текстом */
}

.xeshTag {
  font-family: 'Montserrat';
  font-size: 14px;
  line-height: 17px;
  padding: 2px 0; /* Установите верхний и нижний отступ на 2px, чтобы сделать их меньше */
  color: #D86B79;
  height: 5px;
  margin-top: 1px;
}

.schedule-container {
  display: flex; /* Для выравнивания записи и кнопки на одной высоте */
  justify-content: space-between; /* Равномерное распределение между расписанием и кнопкой */
  align-items: center; /* Вертикальное выравнивание по центру */
  margin-top: 10px; /* Отступ сверху для расположения */
}

.tag {
  position: absolute; /* Абсолютное позиционирование для тега "Бесплатно" */
  top: 15px; /* Отступ сверху */
  right: 15px; /* Отступ справа */
  background-color: #D86B79; /* Фоновый цвет для тега */
  border-radius: 5px; /* Закругленные углы для тега */
  padding: 5px 10px; /* Внутренние отступы */
  color: white; /* Цвет текста для тега */
}

.button-container {
  display: flex; /* Используем флекс для выравнивания кнопки */
  justify-content: flex-end; /* Выравнивание кнопки по правому краю */
}

.details-button {
  padding: 10px 20px; /* Отступы */
  background: #70232F; /* Фоновый цвет кнопки */
  border-radius: 5px; /* Закругленные углы для кнопки */
  color: white; /* Цвет текста для кнопки */
  border: none; /* Убираем границу */
  cursor: pointer; /* Курсор при наведении */
  transition: background-color 0.2s; /* Плавный эффект изменения цвета */
}

.details-button:hover {
  background-color: #5b1e2b; /* Изменение цвета при наведении */
}
</style>
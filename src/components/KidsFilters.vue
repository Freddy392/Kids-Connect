<template>
  <aside class="filters">
    <form>
      <label class="catalog-title">Каталог</label>
      <div class="custom-select">
        <div class="selected" @click="toggleDropdown">
          <div class="selected-text">{{ selectedAge || 'Любой' }}</div>
          <span class="chevron"></span>
        </div>
        <ul v-show="dropdownOpen" class="options">
          <li
            v-for="age in ageOptions"
            :key="age"
            class="option"
            @click="selectAge(age)"
          >
            {{ age }}
          </li>
        </ul>
      </div>
      <br />
      <label>Пол</label>
      <div class="gender-selection">
        <div class="gender-option">
          <input type="checkbox" id="male" v-model="selectedGender.male" class="checkbox" />
          <label for="male" class="checkbox-label">Мужской</label>
        </div>
        <div class="gender-option">
          <input type="checkbox" id="female" v-model="selectedGender.female" class="checkbox" />
          <label for="female" class="checkbox-label">Женский</label>
        </div>
      </div>
      <label>Категории</label>

      <div class="form-group" v-for="(category, index) in categories" :key="index">
        <div class="category-block" @click="toggleCategory(index)">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-count">{{ calculateCount(category.items) }}</div>
          <span class="arrow" :class="{ 'arrow-up': category.open, 'arrow-down': !category.open }"></span>
        </div>

        <div v-show="category.open" class="dropdown-content">
          <div
            class="dropdown-item"
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            @click="selectSport(item.name)"
          >
            {{ item.name }} ({{ item.count }})
          </div>
        </div>
      </div>
    </form>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      selectedAge: '', // По умолчанию пустая строка
      dropdownOpen: false,
      selectedGender: {
        male: false,
        female: false,
      },
      ageOptions: ['Любой', ...Array.from({ length: 25 }, (_, i) => i + 1)],
      categories: [
        {
          name: 'Силовой спорт',
          open: false,
          items: [
            { name: 'Тяжелая атлетика', count: 2 },
          ]
        },
        {
          name: 'Единоборства',
          open: false,
          items: [
            { name: 'Бокс', count: 1 },
            { name: 'Тайский бокс', count: 1 }
          ]
        }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleCategory(index) {
      this.categories[index].open = !this.categories[index].open; // Переключаем состояние категории
    },
    selectAge(age) {
      this.selectedAge = age === 'Любой' ? '' : age;
      this.dropdownOpen = false; // Закрываем дропдаун после выбора
    },
    selectSport(sport) {
      console.log(`Выбран спорт: ${sport}`);
    },
    calculateCount(items) {
      return items.reduce((total, item) => total + item.count, 0);
    }
  }
};
</script>

<style scoped>
.custom-select {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 10px;
  gap: 10px;
  width: 290px;
  border-bottom: 1px solid #70232F; /* Только нижняя граница */
  border-radius: 5px;
}

.filters {
  margin-left: 10px;
  margin-top: 10px;
}

.catalog-title {
  width: 59px;
  height: 17px;
  
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 17px; /* Равен высоте элемента */
  letter-spacing: -0.01em;

  color: #333333;

  flex: none;
  order: 0;
  flex-grow: 0; /* Не растянуть элемент */
  margin-bottom: 10px; /* Отступ снизу, для оформления */
}

.form-group {
  margin: 10px 0; /* Отступ между группами */
}

.category-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px; /* Добавляем небольшие отступы */
  gap: 10px;
  margin: 0 auto;
  width: 270px; /* Ширина на всю доступную область */
  border: 1px solid #ccc; /* Рамка вокруг блока */
  border-radius: 4px; /* Закругленные углы */
  cursor: pointer; /* Указать, что это кликабельный элемент */
}

.category-name {
  width: 109px;
  height: 17px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600; /* Увеличиваем вес шрифта для выделения */
  font-size: 16px; /* Увеличиваем размер шрифта */
  line-height: 17px;
  color: #333333;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.category-count {
  margin-left: 5px; /* Отступ между названием и количеством */
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 14px;
  color: #70232F;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.arrow {
  width: 15px;
  height: 15px;
  margin-left: auto; /* Положение стрелки справа */
  transition: transform 0.2s ease; /* Плавное изменение направления */
}

.arrow-up {
  transform: rotate(180deg); /* Стрелка вверх */
}

.arrow-down {
  transform: rotate(0deg); /* Стрелка вниз */
}

.dropdown-content {
  margin-top: 5px; /* Отступ сверху для выпадающего меню */
  padding: 10px; /* Отступы внутри */
  background-color: #f9f9f9; /* Цвет фона для выпадающего контента */
  border: 1px solid #ccc; /* Рамка вокруг выпадающего контента */
  border-radius: 4px; /* Закругленные углы */
}

.dropdown-item {
  padding: 8px; /* Отступы для пунктов подкатегорий */
  color: #333; /* Цвет текста */
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e0e0e0; /* Подсветка при наведении */
}

/* Остальные стили остаются прежними */
.selected {
  display: flex;
  justify-content: space-between; /* Оставляем это для стрелки */
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  position: relative;
}

.selected-text {
  flex-grow: 1; /* Заполняет все доступное пространство для центровки текста */
  text-align: center; /* Центрируем текст */
}

.chevron {
  width: 15px;
  height: 15px;
  border: 1.5px solid #333333;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
  margin-left: 5px;
}

.options {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  z-index: 1;
  position: absolute; /* Для перекрытия других элементов */
}

.option {
  padding: 10px;
  cursor: pointer;
  text-align: center; /* Центрируем текст в пунктах меню */
}

.option:hover {
  background-color: #f0f0f0; /* Подсветка при наведении */
}

/* Стили для выбора пола */
.gender-selection {
  display: flex;
  flex-direction: row; /* Расположение в строку */
  align-items: center; /* По центру по вертикали */
  padding: 0;
  gap: 20px; /* Расстояние между чекбоксами */
  width: 290px;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 5px; /* Отступ между чекбоксом и меткой */
}

/* Стили для чекбоксов */
.checkbox {
  display: none; /* Скрываем стандартный чекбокс */
}

.checkbox + .checkbox-label {
  position: relative;
  cursor: pointer;
  margin-left: 25px;
  margin-bottom: 10px;
  margin-top: 10px;
  
  display: flex; /* Для правильного выравнивания */
}

/* Кастомные стили для чекбоксов */
.checkbox + .checkbox-label::before {
  content: '';
  position: absolute;
  top: 0;
  margin-left: -25px;
  left: 0;
  
  width: 16px; /* Ширина кастомного чекбокса */
  height: 16px; /* Высота кастомного чекбокса */
  border: 2px solid #70232F; /* Красная граница */
  border-radius: 4px; /* Закругленные углы */
  background: white; /* Белый фон */
}

/* Стили для выделенного чекбокса */
.checkbox:checked + .checkbox-label::before {
  background: #70232F; /* Красный фон при выделении */
}

/* Стили для галочки */
.checkbox:checked + .checkbox-label::after {
  content: '';
  margin-left: -23px;

  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 10px;
  
  border: solid white; /* Белая галочка */
  border-width: 0 2px 2px 0; /* Формирование галочки */
  transform: rotate(45deg); /* Поворот галочки */
}

.checkbox-label {
  font-family: 'Montserrat';
  font-weight: 400;
  
  font-size: 14px;
  line-height: 17px;
  color: #333333; /* Цвет текста */
}

</style>
<template>
  <div class="main">
    <KidsHeader />
 <h2 class="filters-header">Фильтры</h2>
    <div class="search-filters-container">
      <div class="search-box-container">
        <img :src="require('@/assets/icons/search-icon.svg')" alt="Поиск" class="search-icon" />
        <input type="text" class="search-box" placeholder="Поиск" v-model="searchQuery" />
      </div>
      <div class="filter-buttons">
        <button :class="{ active: selectedFilter === 'all' }" @click="selectedFilter = 'all'">Все</button>
        <button :class="{ active: selectedFilter === 'paid' }" @click="selectedFilter = 'paid'">Платные</button>
        <button :class="{ active: selectedFilter === 'free' }" @click="selectedFilter = 'free'">Бесплатные</button>
      </div>

      <div class="map-button-container">
        <button class="map-button">
          На карте
          <img :src="require('@/assets/icons/map-icon.svg')" alt="На карте" class="map-icon" />
        </button>
      </div>
    </div>

    <div class="content">
      <div class="filters-container">
        <h2>Силовой спорт</h2>
       
      </div>

      <div class="allFillters">
        <KidsFilters />
      </div>

      <div class="containerColumb">
        <KidsCard
          v-for="(activity, index) in filteredSports"
          :key="index"
          :firstFree="activity.firstFree"
          :title="activity.title"
          :titleAdr="activity.titleAdr"
          :xesh="activity.xesh"
          :age="activity.age"
          :address="activity.address"
          :location="activity.location"
          :days="activity.days"
          :schedule="activity.schedule"
          :price="activity.price"
          :tag="activity.tag"
          :placeholderImage="require('@/assets/placeholder.svg')"
        />

        <h2>Единоборства</h2>
        <KidsCard
          v-for="(activity, index) in filteredMartialArts"
          :key="index"
          :firstFree="activity.firstFree"
          :title="activity.title"
          :titleAdr="activity.titleAdr"
          :xesh="activity.xesh"
          :age="activity.age"
          :address="activity.address"
          :location="activity.location"
          :days="activity.days"
          :schedule="activity.schedule"
          :price="activity.price"
          :tag="activity.tag"
          :placeholderImage="require('@/assets/placeholder.svg')"
        />
      </div>
    </div>

    <ModalWindow 
      :isVisible="isModalVisible" 
      :title="modalTitle" 
      :message="modalMessage" 
      @close="closeModal" 
    />
  </div>
</template>



<script>
import KidsCard from '../components/KidsCard.vue';
import KidsFilters from '../components/KidsFilters.vue';
import ModalWindow from '../components/ModalWindow.vue'; // Импортируем модальное окно как ModalWindow

export default {
  components: {
    KidsCard,
    KidsFilters,
    ModalWindow
  },
  data() {
    return {
      selectedFilter: 'all', // По умолчанию показывать все
      searchQuery: '', // Поле для ввода поискового запроса
      isModalVisible: false, // Состояние видимости модального окна
      modalTitle: '', // Заголовок модального окна
      modalMessage: '', // Сообщение в модальном окне
      sports: [
        {
          firstFree: "1",
          title: "Тяжелая атлетика",
          titleAdr:"(в Юбилейном мкр.)",
          xesh: "Тяжелая атлетика",
          age: "10-18 лет",
          address: "г. Иркутск, Юбилейный мкр., стр. 49/1",
          location: "ФОК 'Юбилейный'",
          days: "Пн,Ср,Чт",
          schedule: ["9:00 - 10:30", "12:00 - 13:30", "18:00 - 19:30"],
          price: "Бесплатно",
          tag: "Бесплатно"
        },
        {
          firstFree: "0",
          title: "Тяжелая атлетика",
          titleAdr:"(в Юбилейном мкр.)",
          xesh: "Тяжелая атлетика",
          age: "10-18 лет",
          address: "г. Иркутск, Юбилейный мкр., стр. 49/1",
          location: "ФОК 'Юбилейный'",
          days: "Пн,Ср,Чт",
          schedule: ["9:00 - 10:30", "12:00 - 13:30"],
          price: "Платное",
          tag: "500 руб."
        },
      ],
      martialArts: [
        {
          firstFree: "0",
          title: "Бокс",
          titleAdr: "(в cпортзал 'Бокс')",
          age: "10-17 лет",
          xesh: "Бокс",
          address: "г. Иркутск, ул. Боксёрская, 1",
          location: "Спортзал 'Бокс",
          days: "Пн,Ср,Чт",
          schedule: ["9:00 - 10:30", "12:00 - 13:30"],
          price: "Бесплатно",
          tag: "Бесплатно"
        },
        {
          firstFree: "0",
          title: "Тайский бокс",
          titleAdr: "(в cпортзал 'Муай Тай')",
          age: "12-20 лет",
          xesh: "Бокс",
          address: "г. Иркутск, ул. Муай Тай, 2",
          location: "Спортзал 'Муай Тай'",
          days: "Пн,Ср,Чт",
          schedule: ["9:00 - 10:30", "12:00 - 13:30"],
          price: "Платное",
          tag: "800 руб."
        },
      ]
    };
  },
  computed: {
    filteredSports() {
      let filtered = this.sports.filter(sport => {
        const searchInTitle = sport.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const searchInAdr = sport.titleAdr.toLowerCase().includes(this.searchQuery.toLowerCase());
        return searchInTitle || searchInAdr; // Фильтруем по заголовку или заголовку адреса
      });

      if (this.selectedFilter === 'all') {
        return filtered; // Возвращаем отфильтрованные виды спорта
      } else if (this.selectedFilter === 'paid') {
        return filtered.filter(item => item.price !== "Бесплатно");
      } else if (this.selectedFilter === 'free') {
        return filtered.filter(item => item.price === "Бесплатно");
      }
      return filtered; // Если ничего не выбрано
    },
    filteredMartialArts() {
      let filtered = this.martialArts.filter(martialArt => {
        const searchInTitle = martialArt.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const searchInAdr = martialArt.titleAdr.toLowerCase().includes(this.searchQuery.toLowerCase());
        return searchInTitle || searchInAdr; // Фильтруем по заголовку или заголовку адреса
      });

      if (this.selectedFilter === 'all') {
        return filtered; // Возвращаем отфильтрованные единоборства
      } else if (this.selectedFilter === 'paid') {
        return filtered.filter(item => item.price !== "Бесплатно");
      } else if (this.selectedFilter === 'free') {
        return filtered.filter(item => item.price === "Бесплатно");
      }
      return filtered; // Если ничего не выбрано
    },
    hasSports() {
      return this.filteredSports.length > 0; // Проверка на наличие видов спорта
    },
    hasMartialArts() {
      return this.filteredMartialArts.length > 0; // Проверка на наличие единоборств
    }
  },
   methods: {
    openModal(activity) {
      this.modalTitle = activity.title; // Устанавливаем заголовок модального окна
      this.modalMessage = activity.titleAdr; // Устанавливаем сообщение (или другую информацию)
      this.isModalVisible = true; // Открываем модальное окно
    },
    closeModal() {
      this.isModalVisible = false; // Закрываем модальное окно
    }
}
}
</script>

<style scoped>
.search-filters-container {
display: flex; /* Использует flexbox для размещения элементов */
  align-items: center; /* Центрируем элементы по вертикали */
  font-family: 'Montserrat';
  font-size: 14px;
  line-height: 17px;
  gap: 20px; /* Отступ между элементами */
  margin-bottom: 20px; /* Отступ снизу */
  margin-top: 20px;
  flex-wrap: wrap; /* Позволяет переносить элементы, если они не помещаются в строку */
}

/* Контейнер для поля поиска с иконкой */
.search-box-container {
  display: flex; /* Используем флекс для размещения иконки и поля ввода в ряд */
  align-items: center; /* Центрируем иконку и текст по вертикали */
  position: relative; /* Для абсолютного позиционирования иконки, если необходимо */
  margin-left: 20px;
}

.search-box {
  padding: 10px 35px; /* Дополнительный отступ слева для учёта иконки */
  border: 0px solid #ddd;
  font-family: 'Montserrat';
  margin-left: 5px; /* Отступ между элементами */
  width: 200px; /* Ширина поля поиска */
  border-radius: 4px;  
}

/* Иконка поиска */
.search-icon {
  position: absolute; /* Позиционирование иконки */
  left: 10px; /* Отступ от левой стороны */
  width: 20px; /* Ширина иконки */
  height: 20px; /* Высота иконки */
}

/* Остальные стили остаются прежними */
.filter-buttons {
display: flex;
  gap: 10px; /* Отступ между кнопками фильтров */
  flex-grow: 1; /* Позволяет кнопкам занимать доступное пространство */
}

.filter-buttons button {
  padding: 8px 12px;
  border: none;
  font-size: 16px;
  font-family: 'Montserrat';
  line-height: 20px;
  border-radius: 4px;
  background-color: #e0e0e0; /* Фоновый цвет кнопок по умолчанию */
  cursor: pointer;
}

.filter-buttons button.active {
  background-color: #a00000; /* Цвет для активной кнопки */
  color: white; /* Цвет текста для активной кнопки */
}

.map-button-container {
  margin-left: auto;
  margin-right: 30px;  /* Чтобы переместить кнопку "На карте" вправо */
}

.map-button {
  font-family: 'Montserrat';
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 5px; /* Отступ между изображением и текстом */
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0; /* Фоновый цвет кнопки */
  cursor: pointer;
}

.map-icon {
  width: 20px;
  height: 20px;
}

/* Новые стили для блока фильтров */
.filters-container {
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat';
  gap: 1000px; /* Отступы между элементами внутри блока */
}
.containerColumb {
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat';
}

.filters-containerBlock {
  display: flex;
  flex-direction: row;
  font-family: 'Montserrat';
  gap: 100px; /* Отступы между элементами внутри блока */
}
.filters-header {
  width: 117px;
  left:1100px;
  top:75px;
  height: 0px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  position: relative;
  line-height: 29px;
  margin: 0; /* Убираем отступы */
  padding: 0; /* Убираем отступы */

}
.allFillters {
  background: #ffffff; /* Фоновый цвет */
  width: 300px; /* Ширина блока */
  height: 0px; /* Высота блока автоматически адаптируется под контент */
  border-top: 2px solid #70232F; /* Верхняя граница */
  border-radius: 5px; /* Закругленные углы */
  position: relative; /* Относительное позиционирование для блока */

  display: flex; /* Позволяет содержимому вести себя как флекс-контейнер */
  padding: 0px; /* Добавляем промежутки для контента */
left:1100px;
top:3px
}

</style>
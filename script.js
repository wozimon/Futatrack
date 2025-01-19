const menuItems = document.querySelectorAll('.sidebar li');
const contentSections = document.querySelectorAll('.content-section');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const eventsGallery = document.getElementById('events-gallery');
const toolsList = document.querySelector(".tools-list")
const guidesList = document.querySelector(".guides-list")
const buildingsList = document.querySelector('.buildings-list');
const playersList = document.querySelector('.players-list');
const playerSearchInput = document.getElementById('player-search');

// Функция для добавления событий
function addEventToGallery(imageUrl, caption) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="Изображение">
        <p>${caption.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
    `;
    eventsGallery.appendChild(galleryItem);
}

// Функция для добавления сооружений
function addBuilding(imageUrl, coordinates, description, author) {
    const buildingItem = document.createElement('div');
    buildingItem.classList.add('building-item');
    buildingItem.innerHTML = `
        <div class="building-item-image">
            <img src="${imageUrl}" alt="Изображение">
            <span class="building-coordinates">${coordinates}</span>
        </div>
        <div class="building-description">
            <h3>${description}</h3>
            <p class="building-author">by ${author}</p>
        </div>
    `;
    buildingsList.appendChild(buildingItem);
}

// Функция для добавления игроков
function addPlayer(imageUrl, name, description) {
  const playerItem = document.createElement('div');
  playerItem.classList.add('player-item');
  playerItem.innerHTML = `
      <img src="${imageUrl}" alt="Скин игрока ${name}">
      <div class="player-info">
          <p><b>${name}</b></p>
          <p>${description.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
  `;
    playerItem.addEventListener('click', () => {
    // Закрываем карточку другого игрока
        const activePlayer = document.querySelector('.player-item.active');
        if (activePlayer && activePlayer !== playerItem) {
        activePlayer.classList.remove('active');
        }
    // Открываем/закрываем карточку текущего игрока
        playerItem.classList.toggle('active');
    });
    playersList.appendChild(playerItem);
}

//Примеры
addEventToGallery('https://i.imgur.com/fhX9FsJ.png', 'Создание Сервера командой Tempura');

addBuilding('https://i.imgur.com/z8Srbdn.png', 'X: -305, Y: ~, Z: -540', 'Дом Данка', '_dankee');
addBuilding('https://i.imgur.com/2qEU0UW.png', 'X: 350, Y: ~, Z: -150', 'Деревня имени Хуя', '~');
addBuilding('https://i.imgur.com/8ilcmTP.png', 'X: -300, Y: ~, Z: -1078', 'Пирс Саси', 'wozimon');


addPlayer('https://api.mineatar.io/body/full/ea488872-935c-4b9c-b7c3-99ca4b1361fa?scale=16', 'wozimon', 'дед, Создатель Futatrack');
addPlayer('https://api.mineatar.io/body/full/4776db4e-6560-4a5c-9aa5-317621ca3a38?scale=16', '_dankee', 'Строитель, Художник, Механик и бойфренд деда');

// Фильтрация игроков по нику
playerSearchInput.addEventListener('input', () => {
  const searchTerm = playerSearchInput.value.toLowerCase();
  const playerItems = playersList.querySelectorAll('.player-item');

  playerItems.forEach(item => {
    const playerName = item.querySelector('.player-info p:first-child').textContent.replace('Ник: ', '').toLowerCase();
    if (playerName.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

// Функция добавления инструмента
function addTool(imageUrl, caption, link) {
    const toolItem = document.createElement('div');
    toolItem.classList.add('tool-item');
    toolItem.innerHTML = `
        <img src="${imageUrl}" alt="${caption}">
        <p>${caption}</p>
        <a href="${link}" target="_blank" class="download-button">Перейти</a>
    `;
    toolsList.appendChild(toolItem);
}
//Пример как добавлять фото и ссылку
/*
addTool('image.jpg', 'Название инструмента', 'https://example.com');
*/

// Функция добавления гайда
function addGuide(imageUrl, caption) {
    const guideItem = document.createElement('div');
    guideItem.classList.add('guides-item');
    guideItem.innerHTML = `
        <img src="${imageUrl}" alt="${caption}">
        <p>${caption}</p>
    `;
    guidesList.appendChild(guideItem);
}

//Пример добавления гайда
/*
addGuide('image.jpg', 'Название гайда');
*/

// Переключение контента при клике на пункты меню
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const contentId = item.dataset.content;

        // Анимация ухода текущего контента
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            activeSection.style.animation = 'slideOutLeft 0.5s ease';
        }

        setTimeout(() => {
            // Скрытие всех секций
            contentSections.forEach(section => {
                section.classList.remove('active');
                section.style.animation = '';
            });

            // Отображение нужной секции
            const targetSection = document.getElementById(contentId);
            targetSection.classList.add('active');
            targetSection.style.animation = 'slideInRight 0.5s ease';
        }, 450); // Немного меньше времени анимации, чтобы не было задержки
    });
});

// Переключение вкладок в архиве
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;

        // Смена активной вкладки
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Скрытие всего содержимого вкладок
        tabContents.forEach(content => content.classList.remove('active'));

        // Отображение нужного содержимого
        document.getElementById(tabId).classList.add('active');
    });
});

// Установка количества модов (пример)
document.getElementById('mod-count').textContent = '71';

// Активация первой секции при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    contentSections[0].classList.add('active');
    tabs[2].click(); // Выбираем вкладку события
});

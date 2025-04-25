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

function addEventToGallery(imageUrl, caption) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="Изображение">
        <p>${caption.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
    `;
    eventsGallery.appendChild(galleryItem);
}

function addBuilding(imageUrl, coordinates, description, author) {
    const buildingItem = document.createElement('div');
    buildingItem.classList.add('building-item');
    buildingItem.innerHTML = `
        <div class="building-item-image">
            <img src="${imageUrl}" alt="Изображение">
            <span class="building-coordinates">${coordinates.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
        </div>
        <div class="building-description">
            <h3>${description.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</h3>
            <p class="building-author">by ${author.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
    `;
    buildingsList.appendChild(buildingItem);
}

function addPlayer(imageUrl, name, description) {
    const playerItem = document.createElement('div');
    playerItem.classList.add('player-item');
    playerItem.innerHTML = `
        <img src="${imageUrl}" alt="Скин игрока ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}">
        <div class="player-info">
            <p><b>${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</b></p>
            <p>${description.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
    `;
      playerItem.addEventListener('click', () => {
          const activePlayer = document.querySelector('.player-item.active');
          if (activePlayer && activePlayer !== playerItem) {
          activePlayer.classList.remove('active');
          }
          playerItem.classList.toggle('active');
      });
      playersList.appendChild(playerItem);
  }

addEventToGallery('https://i.imgur.com/fhX9FsJ.png', 'Создание Сервера командой Tempura');

addBuilding('https://i.imgur.com/z8Srbdn.png', 'X: -305, Y: ~, Z: -540', 'Дом Данка', '_dankee');
addBuilding('https://i.imgur.com/2qEU0UW.png', 'X: 350, Y: ~, Z: -150', 'Деревня имени Хуя', '~');
addBuilding('https://i.imgur.com/8ilcmTP.png', 'X: -300, Y: ~, Z: -1078', 'Пирс Саси', 'wozimon');


addPlayer('https://api.mineatar.io/body/full/ea488872-935c-4b9c-b7c3-99ca4b1361fa?scale=16', 'wozimon', 'дед, Создатель Futatrack');
addPlayer('https://api.mineatar.io/body/full/4776db4e-6560-4a5c-9aa5-317621ca3a38?scale=16', '_dankee', 'Строитель, Художник, Механик и бойфренд деда');

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

function addTool(imageUrl, caption, link) {
    const toolItem = document.createElement('div');
    toolItem.classList.add('tool-item');
    toolItem.innerHTML = `
        <img src="<span class="math-inline">\{imageUrl\}" alt\="</span>{caption}">
        <p><span class="math-inline">\{caption\}</p\>
<a href\="</span>{link}" target="_blank" class="download-button">Перейти</a>
    `;
    toolsList.appendChild(toolItem);
}

function addGuide(name, imageUrl, content) {
    const guideItem = document.createElement('div');
    guideItem.classList.add('guide-item');
    guideItem.innerHTML = `
        <div class="guide-item-image">
            <img src="${imageUrl}" alt="Изображение">
        </div>
        <div class="guide-description">
            <h3>${name}</h3>
            <p></p>
        </div>
        <div class="guide-content">
            ${content.map(el => {
                if (el.type === 'text') {
                    return `<div class="guide-content-element"><p>${el.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p></div>`;
                } else if (el.type === 'image') {
                    return `<div class="guide-content-element"><img src="${el.value}" alt="Изображение"><p>${el.caption ? el.caption.replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''}</p></div>`;
                }
            }).join('')}
        </div>
    `;

    guideItem.addEventListener('click', () => {
        const content = guideItem.querySelector('.guide-description p');
        const guideContent = guideItem.querySelector('.guide-content');

        const activeGuides = document.querySelectorAll('.guide-item.active');
        activeGuides.forEach(activeGuide => {
          if (activeGuide !== guideItem) {
            activeGuide.classList.remove('active');
            activeGuide.querySelector('.guide-description p').style.maxHeight = '0';
            activeGuide.querySelector('.guide-content').style.maxHeight = '0';
            activeGuide.querySelector('.guide-content').style.overflowY = 'hidden';
          }
        });

        guideItem.classList.toggle('active');
        if (guideItem.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          guideContent.style.maxHeight = guideContent.scrollHeight + 'px';
          guideContent.style.overflowY = 'auto';
        } else {
          content.style.maxHeight = '0';
          guideContent.style.maxHeight = '0';
          guideContent.style.overflowY = 'hidden';
        }
      });
    
      guidesList.appendChild(guideItem);
    }

addGuide('Как зайти на сервер?', 'https://i.imgur.com/xxlyvmM.png', [
    { type: 'text', value: 'Зайдите в майнкрафт Официальный/Пиратский' },
    { type: 'image', value: 'https://i.imgur.com/KcuoYKl.jpeg', caption: 'майнкрафт' },
    { type: 'text', value: 'Зайдите в майнкрафт Официальный/Пиратский' },
    { type: 'text', value: 'Зайдите в ыфвфывфывй/Пиратский' },
    { type: 'text', value: 'Зайдите в майнкрафт Официальный/Пиратский' },
    { type: 'image', value: 'https://i.imgur.com/KcuoYKl.jpeg', caption: 'майнкрафт' },
    { type: 'text', value: 'Зайдите в майнкрафт Официальный/Пиратский' },
    { type: 'text', value: 'Зайдите в ыфвфывфывй/Пиратский' },
  ]);

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const contentId = item.dataset.content;

        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            activeSection.style.animation = 'slideOutLeft 0.5s ease';
        }

        setTimeout(() => {
            contentSections.forEach(section => {
                section.classList.remove('active');
                section.style.animation = '';
            });

            const targetSection = document.getElementById(contentId);
            targetSection.classList.add('active');
            targetSection.style.animation = 'slideInRight 0.5s ease';
        }, 450);
    });
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
    });
});

document.getElementById('mod-count').textContent = '71';

document.addEventListener('DOMContentLoaded', () => {
    contentSections[0].classList.add('active');
    tabs[2].click();
});

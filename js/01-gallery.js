import { galleryItems } from './gallery-items.js';
// Change code below this line

// 1.Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2.Реалізація делегування на ul.gallery і отримання url великого зображення.
// 3.Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4.Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5.Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

const galleryList = document.querySelector('.gallery');

const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;

galleryList.innerHTML = galleryItems.map(createGalleryItem).join('');


const instances = [];

galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    basicLightbox
      .create(
        `<img width="1280" height="auto" src="${event.target.dataset.source}">`
      )
      .show();
    document.addEventListener("keydown", closeModalOnEscape);
  } else {
    return;
  }
});

const onEscPress = (event, instance) => {
  const ESC_KEYCODE = "Escape";
  if (event.code === ESC_KEYCODE) {
    instance.close();
    instances.splice(instances.indexOf(instance), 1);
    document.removeEventListener("keydown", (event) =>
      onEscPress(event, instance)
    );
  }
};

console.log(galleryItems);

// import { str, myFunc } from "test.js";
// console.log(str);
// console.log(myFunc());
import Card from "./Card.js";

const body = document.querySelector(".body");
const editForm = body.querySelector(".profile__edit-button");
const profileName = body.querySelector(".profile__title");
const profileSubtitle = body.querySelector(".profile__subtitle");
const elements = body.querySelector(".elements");
const content = body.querySelector(".content");
const elementTemplate = body.querySelector("#element-template").content;

const formCloseProfile = body.querySelector(".form__close-profile");
const formCloseCard = body.querySelector(".form__close-card");
const formCloseImage = body.querySelector(".popup-image__close-image");

const popupProfile = body.querySelector(".popup-profile");
const formProfile = popupProfile.querySelector(".form_profile");
const firstName = popupProfile.querySelector("#form-firstname-profile");
const secondName = popupProfile.querySelector("#form-secondname-prifile");

const addButton = body.querySelector(".profile__add-button");

const popupCard = body.querySelector(".popup-card");
const formCardName = popupCard.querySelector("#form-card-name");
const formCardLink = popupCard.querySelector("#form-card-link");

const formCard = popupCard.querySelector(".form_card");

const popupImage = body.querySelector(".popup-image");
const popupImageScrin = popupImage.querySelector(".popup-image__scrin");
const popupImageSignature = popupImage.querySelector(".popup-image__signature");
const popupImageButtonClose = popupImage.querySelector(
  ".popup-image__button-close"
);

const ESC_CODE = "Escape";

// Открыть попап
function openModal(modal) {
  modal.classList.add("form_active");
  addEventListener("keydown", closeByEsc);
  addEventListener("mousedown", closeByOverlay);
  console.log("ddd");
}
// Закрыть попап
function closeModal(modal) {
  modal.classList.remove("form_active");
  removeEventListener("keydown", closeByEsc);
  removeEventListener("mousedown", closeByOverlay);

  //Убираем ошибку и стираем данные заполненного поля
  const form = modal.querySelector(".form");
  form.querySelectorAll(".form__input").forEach((input) => {
    input.value = "";
    // hideInputError(form, input, validationForm);
  });
}

// Открыть попап для профиля
function openProfileModal() {
  openModal(popupProfile);
  firstName.value = profileName.textContent;
  secondName.value = profileSubtitle.textContent;
  // new FormValidator._toggleButtonState(Array.from(formProfile.querySelectorAll('.form__input')), formProfile.querySelector('.form__submit'));
}

// Открыть попап для новой карточки
function openFormNewCard() {
  openModal(popupCard);
  // new FormValidator._toggleButtonState(Array.from(formCard.querySelectorAll('.form__input')), formCard.querySelector('.form__submit'));
}

//Сохранить профиль
function saveNewProfile(evt) {
  evt.preventDefault();
  profileName.textContent = firstName.value;
  profileSubtitle.textContent = secondName.value;
  closeModal(popupProfile);
}

//Сохранить карточку по клику из формы
function saveNewCard(evt) {
  evt.preventDefault();
  const name = formCardName.value;
  const link = formCardLink.value;
  elements.prepend(new Card(name, link, elementTemplate).createCard());
  closeModal(popupCard);
  formCardName.value = "";
  formCardLink.value = "";
}

// Вствляем карточки из массива
auto.forEach((item) => {
  elements.append(new Card(item.name, item.link, elementTemplate).createCard());
});

// Форма - Добавить новую карточку
addButton.addEventListener("click", openFormNewCard);

export function fullSkreenImage(evt) {
  openModal(popupImage);
  popupImageScrin.setAttribute("src", evt.target.currentSrc);
  popupImageSignature.textContent = evt.target.alt;
  popupImageButtonClose.addEventListener("click", deleteFullImage);
}

function deleteFullImage() {
  popupImage.classList.toggle("popup-image-active");
}

// Форма - Редактировать профиль
editForm.addEventListener("click", openProfileModal);
formProfile.addEventListener("submit", saveNewProfile);

// Форма - закрыть окно
formCloseProfile.addEventListener("click", () => closeModal(popupProfile));
formCloseCard.addEventListener("click", () => closeModal(popupCard));
formCloseImage.addEventListener("click", () => closeModal(popupImage));

// Закрыть окно по кнопке "Esc"
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".form_active");
    closeModal(openedPopup);
  }
}

// Закрыть окно при кнопке вне формы
function closeByOverlay(evt) {
  if (evt.target.classList.contains("form_active")) {
    closeModal(evt.target.closest(".popup"));
  }
}

formCard.addEventListener("submit", saveNewCard);

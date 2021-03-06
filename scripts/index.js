import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const validationForm = {
  formList: ".form",
  formInput: ".form__input",
  formSubmit: ".form__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  // errorActive: "form__input-error_active",
};

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
  ".popup-image__close-image"
);

const ESC_CODE = "Escape";

// Открыть попап
function openModal(modal) {
  modal.classList.add("form_active");
  addEventListener("keydown", closeByEsc);
  addEventListener("mousedown", closeByOverlay);
  // enableValidationForms(validationForm);
}

// Закрыть попап
function closeModal(modal) {
  modal.classList.remove("form_active");
  removeEventListener("keydown", closeByEsc);
  removeEventListener("mousedown", closeByOverlay);
}

// Открыть попап для профиля
function openProfileModal() {
  openModal(popupProfile);
  firstName.value = profileName.textContent;
  secondName.value = profileSubtitle.textContent;
  popupProfile.querySelectorAll(".form__input-error").forEach((input) => {
    input.textContent = "";
  });
  popupProfile.querySelectorAll(".form__input_type_error").forEach((inp) => {
    inp.classList.remove("form__input_type_error");
  });
}

// Открыть попап для новой карточки
function openFormNewCard() {
  openModal(popupCard);
  popupCard.querySelector(".form").reset();

  popupCard.querySelectorAll(".form__input-error").forEach((input) => {
    input.textContent = "";
  });
  popupCard.querySelectorAll(".form__input_type_error").forEach((inp) => {
    inp.classList.remove("form__input_type_error");
  });
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
}

// Форма - Редактировать профиль
editForm.addEventListener("click", openProfileModal);
formProfile.addEventListener("submit", saveNewProfile);

// Закрыть окно по кнопке "Esc"
function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".form_active");
    closeModal(openedPopup);
  }
}

// Закрыть окно при кнопке вне формы
function closeByOverlay(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(evt.target.closest(".popup"));
  }
}

formCard.addEventListener("submit", saveNewCard);

// // Устанавливаем слушать события для каждой формы
function enableValidationForms(formObject) {
  const formList = Array.from(document.querySelectorAll(formObject.formList));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    new FormValidator(formElement, formObject).enableValidation();
  });
}

enableValidationForms(validationForm);

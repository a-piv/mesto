const body = document.querySelector('.body');
const editForm = body.querySelector('.profile__edit-button');
const profileName = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');
const elements = body.querySelector('.elements');
const content = body.querySelector('.content');

const formCloseProfile = body.querySelector('.form__close-profile');
const formCloseCard = body.querySelector('.form__close-card');
const formCloseImage = body.querySelector('.popup-image__close-image');


const popupProfile = body.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.form_profile');
const firstName = popupProfile.querySelector('#form-firstname-profile');
const secondName = popupProfile.querySelector('#form-secondname-prifile')

const addButton = body.querySelector('.profile__add-button');

const popupCard = body.querySelector('.popup-card');
const formCardName = popupCard.querySelector('#form-card-name');
const formCardLink = popupCard.querySelector('#form-card-link');

const formCard = popupCard.querySelector('.form_card');

const popupImage = body.querySelector('.popup-image');
const popupImageScrin = popupImage.querySelector('.popup-image__scrin') ;
const popupImageSignature = popupImage.querySelector('.popup-image__signature');
const popupImageButtonClose = popupImage.querySelector('.popup-image__button-close');

const ESC_CODE = 'Escape';


// Открыть попап
function openModal(modal) {
    modal.classList.add('form_active');
    addEventListener('keydown', closeByEsc);
}
// Закрыть попап
function closeModal(modal) {
    modal.classList.remove('form_active');
    removeEventListener('keydown', closeByEsc)
}


// Открыть попап для профиля
function openProfileModal() {
    openModal(popupProfile);
    firstName.value = profileName.textContent;
    secondName.value = profileSubtitle.textContent;
    toggleButtonState(Array.from(formProfile.querySelectorAll('.form__input')), formProfile.querySelector('.form__submit'));
}


// Открыть попап для новой карточки
function openFormNewCard() {
    toggleButtonState(Array.from(formCard.querySelectorAll('.form__input')), formCard.querySelector('.form__submit'));
    openModal(popupCard);
}

//Создать карточку.
function createCard(cardName, cardLink) {
    const elementTemplate = body.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementImages = element.querySelector('.element__images');
    elementImages.setAttribute('src', cardLink);
    elementImages.setAttribute('alt', cardName);
    element.querySelector('.element__name').textContent = cardName;
    element.querySelector('.element__like').addEventListener('click', funcLike);
    element.querySelector('.element__delete').addEventListener('click', delCard)
    elementImages.addEventListener('click', fullSkreenImage)
    return element;
}


//Сохранить профиль
function saveNewProfile(evt) {
    evt.preventDefault();
    profileName.textContent = firstName.value;
    profileSubtitle.textContent = secondName.value;
    closeModal(popupProfile)
}

//Сохранить карточку
function saveNewCard(evt) {
    evt.preventDefault();
    const name = formCardName.value;
    const link = formCardLink.value;
    elements.prepend(createCard(name, link));
    closeModal(popupCard);
    formCardName.value = '';
    formCardLink.value = '';
}

// Удалить карточку
function delCard (evt){
    evt.target.closest('.element').remove();
}

// Лайк карточки
function funcLike(evt) {
    evt.target.classList.toggle('element__like_active');
}


// Вствляем карточки из массива
auto.forEach(item => {
    elements.append(createCard(item.name, item.link));
})


// Форма - Добавить новую карточку
addButton.addEventListener('click', openFormNewCard)



function fullSkreenImage(evt) {
    openModal(popupImage);
    popupImageScrin.setAttribute("src", evt.target.currentSrc)
    popupImageSignature.textContent = evt.target.alt;
    popupImageButtonClose.addEventListener('click', deleteFullImage)
}


function deleteFullImage() {
    popupImage.classList.toggle('popup-image-active');
}

// Форма - Редактировать профиль
editForm.addEventListener('click', openProfileModal);
formProfile.addEventListener('submit', saveNewProfile);



// Форма - закрыть окно
formCloseProfile.addEventListener('click', () => closeModal(popupProfile));
formCloseCard.addEventListener('click', () => closeModal(popupCard));
formCloseImage.addEventListener('click', () => closeModal(popupImage));


// Закрыть окно по кнопке "Esc"
// body.addEventListener("keydown", (evt) => {
//     if (evt.key === "Escape") {
//         body.querySelectorAll(".popup").forEach(function (popup) {
//             closeModal(popup);
//         });
//     }
// });

// Закрыть окно по кнопке "Esc"
function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.form_active');
        closeModal(openedPopup);
    }
}

// Закрыть окно при кнопке вне формы
body.addEventListener('click',(evt)=>{
    if (evt.target.classList.contains('form_active')) {
        closeModal((evt.target).closest('.popup'))
    }
})


formCard.addEventListener('submit', saveNewCard);
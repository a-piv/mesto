const body = document.querySelector('.body');
const editForm = body.querySelector('.profile__edit-button');
const profileName = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');
const elements = body.querySelector('.elements');
const content = body.querySelector('.content');

const formCloseProfile = body.querySelector('.form__close-profile');
const formCloseCard = body.querySelector('.form__close-card');
const formCloseImage = body.querySelector('.form__close-image');


const popupProfile = body.querySelector('.popup__profile');
const popupCard = body.querySelector('.popup__card');
const popupImage = body.querySelector('.popup__image');


// Открыть попап
function openModal(form) {
    form.classList.add('form_active');
}
// Закрыть попап
function closeModal(form) {
    form.classList.remove('form_active');
    // form.
}


// Открыть попап для профиля
function openProfileModal() {
    openModal(popupProfile);
    popupProfile.querySelector('#form-firstname-profile').value = profileName.textContent;
    popupProfile.querySelector('#form-secondname-prifile').value = profileSubtitle.textContent;
}


// Открыть попап для новой карточки
function openFormNewCard() {
    openModal(popupCard);
    popupCard.querySelector('.form_card').addEventListener('submit', saveNewCard);
}

//Создать карточку.
function createCard(cardName, cardLink) {
    const elementTemplate = body.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__images').setAttribute('src', cardLink);
    element.querySelector('.element__images').setAttribute('alt', cardName);
    element.querySelector('.element__name').textContent = cardName;
    element.querySelector('.element__like').addEventListener('click', funcLike);
    element.querySelector('.element__delete').addEventListener('click', delCard)
    return element;
}


//Сохранить профиль
function saveNewProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupProfile.querySelector('#form-firstname-profile').value;
    profileSubtitle.textContent = popupProfile.querySelector('#form-secondname-prifile').value;
    closeModal(popupProfile)
}

//Сохранить карточку
function saveNewCard(evt) {
    evt.preventDefault();
    const name = popupCard.querySelector('#form-card-name').value;
    const link = popupCard.querySelector('#form-card-link').value;
    elements.prepend(createCard(name, link));
    closeModal(popupCard);
    popupCard.querySelector('#form-card-name').value = '';
    popupCard.querySelector('#form-card-link').value = '';
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
const addButton = body.querySelector('.profile__add-button');
addButton.addEventListener('click', openFormNewCard)



function fullSkreenImage(evt) {
    openModal(popupImage);
    popupImage.querySelector('.popup-image__scrin').setAttribute("src", evt.target.currentSrc)
    popupImage.querySelector('.popup-image__signature').textContent = evt.target.alt;
    popupImage.querySelector('.popup-image__button-close').addEventListener('click', deleteFullImage)
}


function deleteFullImage() {
    popupImage.classList.toggle('popup-image-active');
}

// Форма - Редактировать профиль
editForm.addEventListener('click', openProfileModal);
popupProfile.querySelector('.form_profile').addEventListener('submit', saveNewProfile);



// Форма - закрыть окно
formCloseProfile.addEventListener('click', () => closeModal(popupProfile));
formCloseCard.addEventListener('click', () => closeModal(popupCard));
formCloseImage.addEventListener('click', () => closeModal(popupImage));

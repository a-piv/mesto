let body = document.querySelector('.body');
let editForm = body.querySelector('.profile__edit-button');
let profileName = body.querySelector('.profile__title');
let profileSubtitle = body.querySelector('.profile__subtitle');
let elements = body.querySelector('.elements')

// Открыть попап для профиля
function openFormEditProfile(){
    console.log('Редактировать профиль');
    const templatePopupForm = document.querySelector('#popup__new-card').content;
    templatePopupForm.querySelector('.popup-form').classList.add('form_active')
    templatePopupForm.querySelector('.form__title').textContent = 'Редактировать профиль';
    templatePopupForm.querySelector('#form-firstname').classList.add('form__input-editProfile-name');
    templatePopupForm.querySelector('.form__input-editProfile-name').value = profileName.textContent;
    templatePopupForm.querySelector('#form-secondname').classList.add('form__input-editProfile-link');
    templatePopupForm.querySelector('.form__input-editProfile-link').value = profileSubtitle.textContent;
    templatePopupForm.querySelector('.form__button-save').classList.add('form__button-save_profile');
    const templatePopupFormNode = templatePopupForm.cloneNode(true);
    document.querySelector('.content').append(templatePopupFormNode);
    document.querySelector('.form').addEventListener('submit', saveNewProfile);
    document.querySelector('.form__button-close').addEventListener('click', closeForm);
    templatePopupForm.querySelector('.form__input-editProfile-name').value = '';
    templatePopupForm.querySelector('.form__input-editProfile-link').value ='';
}

// Открыть попап для новой карточки
function openFormNewCard(){
    console.log('Добавить новую карточку')
    const templatePopupForm = document.querySelector('#popup__new-card').content;
    templatePopupForm.querySelector('.popup-form').classList.add('form_active')
    templatePopupForm.querySelector('.form__title').textContent = 'Новая тачка';
    templatePopupForm.querySelector('#form-firstname').classList.add('form__input-newCard-name');
    templatePopupForm.querySelector('#form-firstname').placeholder = 'Название';
    templatePopupForm.querySelector('#form-secondname').classList.add('form__input-newCard-link');
    templatePopupForm.querySelector('#form-secondname').placeholder = 'Ссылка на картинку';
    const templatePopupFormNode = templatePopupForm.cloneNode(true);
    document.querySelector('.content').append(templatePopupFormNode);
    document.querySelector('.form').addEventListener('submit', saveNewCard);
    document.querySelector('.form__button-close').addEventListener('click', closeForm);
}

//Создать карточку.
function createCard(cardName, cardLink){
    const articleElement = document.createElement('article');
    articleElement.classList.add('element');
    const imageElement = document.createElement('img');
    imageElement.classList.add('element__images');
    imageElement.setAttribute("src", cardLink);
    imageElement.setAttribute("alt", cardName);
    articleElement.append(imageElement);
    const buttonElementDelCard = document.createElement('button');
    buttonElementDelCard.classList.add('element__delete');
    buttonElementDelCard.setAttribute('type',"button");
    // buttonElementDelCard.setAttribute('aria - label',"Удалить карточку")
    articleElement.append(buttonElementDelCard);
    const divElement = document.createElement('div');
    divElement.classList.add('element__description');
    articleElement.append(divElement);
    const h2Element = document.createElement('h2');
    h2Element.classList.add('element__name');
    h2Element.textContent = cardName;
    divElement.append(h2Element);
    const buttonElementLike = document.createElement('button');
    buttonElementLike.classList.add('element__like');
    buttonElementLike.setAttribute('type',"button");
    // buttonElementLike.setAttribute('aria - label',"Лайк")
    divElement.append(buttonElementLike)
    // elements.append(articleElement);
    buttonElementLike.addEventListener('click',like)
    return articleElement;
}

//Закрыть попап
function closeForm (){
    console.log('Закрыть попап');
    body.querySelector('.popup-form').classList.remove('form_active');
    document.querySelector('.popup-form').remove();
}

//Сохранить профиль
function saveNewProfile(evt){
    evt.preventDefault();
    profileName.textContent = document.querySelector('.form__input-editProfile-name').value;
    profileSubtitle.textContent = document.querySelector('.form__input-editProfile-link').value;
    closeForm ();
}

//Сохранить карточку
function saveNewCard(evt){
    evt.preventDefault();
    let name = document.querySelector('#form-firstname').value;
    let link = document.querySelector('#form-secondname').value;
    let newCard = createCard(name, link)
    elements.prepend(newCard);
    closeForm ();
}

// Лайк
function like (evt){
        evt.target.classList.toggle('element__like_active');
    }


// Вствляем карточки из массива
auto.forEach(item=> {
    elements.append(createCard(item.name, item.link ));
    }
)


// formEditProfile.addEventListener('submit', saveNewProfile);
// document.querySelector('.form__button-close').addEventListener('click', closeForm);

// Форма - Редактировать профиль
editForm.addEventListener('click', openFormEditProfile);


// Форма - Добавить новую карточку
let addButton = body.querySelector('.profile__add-button');
addButton.addEventListener('click', openFormNewCard)


// Удалить карточку
elements.addEventListener('click', (evt)=>{
    if (evt.target.className === 'element__delete') {
        evt.target.parentElement.remove();
    }
})

// Открыть карточку во весь экран
elements.addEventListener('click', (evt)=>{
    if (evt.target.className === 'element__images') {
        console.log('Открыть во весь экран')
        console.log(evt.preventDefault());
        // evt.target.parentElement.remove();
        const templateFullImage = body.querySelector('#popup__full-scrin-image').content;
        const formFullImage = templateFullImage.cloneNode(true);
        document.querySelector('.content').append(formFullImage);
        document.querySelector('.popup-image__scrin').setAttribute("src", evt.target.currentSrc)
        document.querySelector('.popup-image__signature').textContent=evt.target.alt;
        document.querySelector('.popup-image__button-close').addEventListener('click', deleteFullImage)
    }
})


function deleteFullImage (evt){
    document.querySelector('.popup-image').remove();
}
// function like (evt){
//     evt.target.classList.toggle('element__like_active');
// }
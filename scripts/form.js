const body = document.querySelector('.body');
const editForm = body.querySelector('.profile__edit-button');
const profileName = body.querySelector('.profile__title');
const profileSubtitle = body.querySelector('.profile__subtitle');
const elements = body.querySelector('.elements');
const content = body.querySelector('.content');

const formCloseProfile = body.querySelector('.form__close-profile');
const formCloseCard = body.querySelector('.form__close-card');
const formCloseImage = body.querySelector('.form__close-image');

// Открыть попап для профиля
function openModal(form) {
    form.classList.add('form_active');
}

function closeModal(form){
    form.classList.remove('form_active');
    // form.
}


// Открыть попап для профиля
function openProfileModal() {
    openModal(document.querySelector('.popup__profile'));
    document.querySelector('#form-firstname-profile').value = profileName.textContent;
    document.querySelector('#form-secondname-prifile').value = profileSubtitle.textContent;
}


// Открыть попап для новой карточки
function openFormNewCard(){
    openModal(document.querySelector('.popup__card'));
    document.querySelector('.form_card').addEventListener('submit', saveNewCard);
}

//Создать карточку.
function createCard(cardName, cardLink){
    const elementTemplate = document.querySelector('#element-template').content;
    let element =  elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__images').setAttribute('src', cardLink);
    element.querySelector('.element__name').textContent = cardName;
    elements.append(element);
console.log(element)
//
//     //
//     const articleElement = document.createElement('article');
//     articleElement.classList.add('element');
//     const imageElement = document.createElement('img');
//     imageElement.classList.add('element__images');
//     imageElement.setAttribute("src", cardLink);
//     imageElement.setAttribute("alt", cardName);
//     articleElement.append(imageElement);
//     const buttonElementDelCard = document.createElement('button');
//     buttonElementDelCard.classList.add('element__delete');
//     buttonElementDelCard.setAttribute('type',"button");
//     // buttonElementDelCard.setAttribute('aria - label',"Удалить карточку")
//     articleElement.append(buttonElementDelCard);
//     const divElement = document.createElement('div');
//     divElement.classList.add('element__description');
//     articleElement.append(divElement);
//     const h2Element = document.createElement('h2');
//     h2Element.classList.add('element__name');
//     h2Element.textContent = cardName;
//     divElement.append(h2Element);
//     const buttonElementLike = document.createElement('button');
//     buttonElementLike.classList.add('element__like');
//     buttonElementLike.setAttribute('type',"button");
//     // buttonElementLike.setAttribute('aria - label',"Лайк")
//     divElement.append(buttonElementLike)
//     // elements.append(articleElement);
//     buttonElementLike.addEventListener('click',like)
//     return articleElement;
}


//Сохранить профиль
function saveNewProfile(evt){
    evt.preventDefault();
    profileName.textContent = document.querySelector('#form-firstname-profile').value;
    profileSubtitle.textContent = document.querySelector('#form-secondname-prifile').value;
    // closeForm ();
    closeModal(document.querySelector('.popup__profile'))
}

//Сохранить карточку
function saveNewCard(evt){
    evt.preventDefault();
    let name = document.querySelector('#form-card-name').value;
    let link = document.querySelector('#form-card-link').value;
    let newCard = createCard(name, link)
    elements.prepend(newCard);
    closeModal(document.querySelector('.popup__card'));
    document.querySelector('#form-card-name').value ='';
    document.querySelector('#form-card-link').value ='';
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
let allCard = document.querySelectorAll('.element__images');
allCard.forEach(elem=>elem.addEventListener('click',fullSkreenImage))

function fullSkreenImage(evt) {
    openModal(document.querySelector('.popup__image'));
    document.querySelector('.popup-image__scrin').setAttribute("src", evt.target.currentSrc)
    document.querySelector('.popup-image__signature').textContent = evt.target.alt;
    document.querySelector('.popup-image__button-close').addEventListener('click', deleteFullImage)
}


function deleteFullImage (evt){
    document.querySelector('.popup-image').classList.toggle('popup-image-active');
    // document.querySelector('.popup-image__scrin').setAttribute("src", '')
    setTimeout(()=>{document.querySelector('.popup-image').classList.add('popup-image_z')},500)


}

// Форма - Редактировать профиль
editForm.addEventListener('click', openProfileModal);
document.querySelector('.form_profile').addEventListener('submit', saveNewProfile);
// document.querySelector('.form__button-close').addEventListener('click', closeForm);



// Форма - закрыть окно
formCloseProfile.addEventListener('click',()=>closeModal(document.querySelector('.popup__profile')));
formCloseCard.addEventListener('click',()=>closeModal(document.querySelector('.popup__card')));
formCloseImage.addEventListener('click',()=>closeModal(document.querySelector('.popup__image')));
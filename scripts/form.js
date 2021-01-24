let body = document.querySelector('.body');
let popup = body.querySelector('.popup');
let editForm = body.querySelector('.profile__edit-button');
let profileName = body.querySelector('.profile__title');
let profileSubtitle = body.querySelector('.profile__subtitle');
let formEditProfile = body.querySelector('.form');


let closeFormButton = formEditProfile.querySelector('.form__button-close');
let firstNameInput = formEditProfile.elements[1];
let secondNameInput = formEditProfile.elements[2];

function openForm (){
    firstNameInput.value = profileName.textContent;
    secondNameInput.value = profileSubtitle.textContent;
    popup.classList.add('form_active');
}

function closeForm (){
    popup.classList.remove('form_active');
}

function safeForm(evt){
    evt.preventDefault();
    profileName.textContent = firstNameInput.value;
    profileSubtitle.textContent = secondNameInput.value;
    closeForm ();
}

editForm.addEventListener('click', openForm);
formEditProfile.addEventListener('submit', safeForm);
closeFormButton.addEventListener('click', closeForm);

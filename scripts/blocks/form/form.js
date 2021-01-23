let profile = document.querySelector('.body');
let popup = profile.querySelector('.popup');
let editForm = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let formEditProfile = document.querySelector('.form');
let formSaveButton = formEditProfile.querySelector('.form__button-save');
let closeFormButton = formEditProfile.querySelector('.form__button-close');
let firstNameInput = formEditProfile.querySelector('#form-firstname');
let secondNameInput = formEditProfile.querySelector('#form-secondname');




function openForm (evt){
    evt.preventDefault();
    firstNameInput.value = profileName.textContent;
    secondNameInput.value = profileSubtitle.textContent;
    popup.classList.add('form_active');
}

function closeForm (evt){
    evt.preventDefault();
    popup.classList.remove('form_active');
}

// function valid (evt) {
//     my_form.addEventListener('invalid', (e) => {
//         console.log('Значения формы не валидны');
//     }, true)
// }

function safeForm(evt){
    evt.preventDefault();
    console.log('stq')
    profileName.textContent = firstNameInput.value;
    profileSubtitle.textContent = secondNameInput.value;
    // valid (evt);
    closeForm (evt);
}


editForm.addEventListener('click', openForm);
formSaveButton.addEventListener('click', safeForm);
closeFormButton.addEventListener('click', closeForm);
